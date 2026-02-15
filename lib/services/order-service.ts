// lib/services/order-service.ts
import { db } from '@/lib/yugabyte';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
  isMerchPack?: boolean;
  tshirtSize?: string;
  wristbandColor?: string;
  merchPackId?: string;
}

interface CustomerData {
  name: string;
  email: string;
  contactNumber: string;
  homeAddress: string;
  entity: string;
  attendingEvent: boolean;
  cartItems: CartItem[];
  totalItems: number;
  totalAmount: number;
  orderDate: string;
  orderId: string;
}

export class OrderService {
  static async saveOrder(customerData: CustomerData): Promise<string> {
    try {
      const orderItemsSummary = this.generateOrderItemsSummary(customerData.cartItems);
      const hasMerchPack = customerData.cartItems.some(item => item.isMerchPack);

      // Insert order
      const orderResult = await db
        .insertInto('orders')
        .values({
          order_id: customerData.orderId,
          customer_name: customerData.name,
          customer_email: customerData.email,
          contact_number: customerData.contactNumber,
          home_address: customerData.homeAddress,
          entity: customerData.entity,
          attending_event: customerData.attendingEvent,
          total_items: customerData.totalItems,
          total_amount: customerData.totalAmount,
          order_date: customerData.orderDate,
          order_items_summary: orderItemsSummary,
          has_merch_pack: hasMerchPack,
          email_sent: false,
          created_at: new Date(),
          updated_at: new Date()
        })
        .returning('id')
        .executeTakeFirstOrThrow();

      // Insert order items
      await this.saveOrderItems(customerData);

      // Save merch packs
      await this.saveMerchPacks(customerData);

      if (!orderResult.id) {
        throw new Error('Failed to get order ID from database');
      }
      return orderResult.id;
    } catch (error) {
      console.error('Error saving order:', error);
      throw error;
    }
  }

  static async saveOrderItems(customerData: CustomerData): Promise<void> {
    const orderItems = customerData.cartItems.map(item => ({
      order_id: customerData.orderId,
      item_id: item.id,
      item_name: item.name,
      item_size: item.size || null,
      item_color: item.color || null,
      price: item.price,
      quantity: item.quantity,
      total_price: item.price * item.quantity,
      is_merch_pack: item.isMerchPack || false,
      tshirt_size: item.tshirtSize || null,
      wristband_color: item.wristbandColor || null,
      merch_pack_id: item.merchPackId || null,
      created_at: new Date()
    }));

    await db
      .insertInto('order_items')
      .values(orderItems)
      .execute();
  }

  static async saveMerchPacks(customerData: CustomerData): Promise<void> {
    const merchPackItems = customerData.cartItems.filter(item => item.isMerchPack);
    
    if (merchPackItems.length === 0) return;

    const merchPacks = merchPackItems.map(item => ({
      order_id: customerData.orderId,
      customer: customerData.name,
      customer_entity: customerData.entity,
      order_date: customerData.orderDate,
      tshirt_size: item.tshirtSize || null,
      wristband_color: item.wristbandColor || null
    }));

    await db
      .insertInto('merch_packs')
      .values(merchPacks)
      .execute();
  }

  static async updateEmailSentStatus(orderId: string, emailSent: boolean): Promise<void> {
    try {
      await db
        .updateTable('orders')
        .set({ email_sent: emailSent })
        .where('order_id', '=', orderId)
        .execute();
    } catch (error) {
      console.error('Error updating email status:', error);
      throw error;
    }
  }

  static async getOrderById(orderId: string) {
    return await db
      .selectFrom('orders')
      .selectAll()
      .where('order_id', '=', orderId)
      .executeTakeFirst();
  }

  static async getOrderItems(orderId: string) {
    return await db
      .selectFrom('order_items')
      .selectAll()
      .where('order_id', '=', orderId)
      .execute();
  }

  private static generateOrderItemsSummary(cartItems: CartItem[]): string {
    return cartItems.map(item => {
      let itemText = item.name;
      
      if (item.isMerchPack) {
        const packSpecs = [];
        if (item.tshirtSize) packSpecs.push(`Tee:${item.tshirtSize}`);
        if (item.wristbandColor) packSpecs.push(`Band:${item.wristbandColor}`);
        if (packSpecs.length > 0) itemText += `(${packSpecs.join(',')})`;
        itemText += '[PACK]';
      } else {
        const specs = [];
        if (item.size) specs.push(item.size);
        if (item.color) specs.push(item.color);
        if (specs.length > 0) itemText += `(${specs.join(',')})`;
      }
      
      return `${itemText} x${item.quantity}`;
    }).join(', ');
  }
}
