// app/api/send-customer-confirmation/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { Client } from 'node-mailjet';
import { db } from '@/lib/yugabyte';

// Lazily initialize Mailjet client inside the request handler to avoid build-time
// errors when MAILJET credentials are not present.

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

function generateOrderId(customerName: string, entity: string): string {
  // Clean customer name - remove spaces and special chars, take first 6 chars
  const cleanName = customerName.replace(/[^a-zA-Z0-9]/g, '').substring(0, 6).toUpperCase();

  // Clean entity - remove spaces and special chars, take first 4 chars
  const cleanEntity = entity.replace(/[^a-zA-Z0-9]/g, '').substring(0, 4).toUpperCase();

  // Generate timestamp in format YYYYMMDD-HHMMSS
  const now = new Date();
  const date = now.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
  const time = now.toTimeString().slice(0, 8).replace(/:/g, ''); // HHMMSS

  return `NatCon-${cleanName}-${cleanEntity}-${date}-${time}`;
}

function generateOrderItemsSummary(cartItems: CartItem[]): string {
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

async function saveOrderToDatabase(customerData: CustomerData) {
  try {
    // Generate order items summary string
    const orderItemsSummary = generateOrderItemsSummary(customerData.cartItems);
    const hasMerchPack = customerData.cartItems.some(item => item.isMerchPack);
    const now = new Date();

    console.log('Saving order to database...');

    // Insert order into orders table with explicit timestamps
    const orderData = {
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
      created_at: now,
      updated_at: now,
    };

    const orderResult = await db
      .insertInto('orders')
      .values(orderData)
      .returning('id')
      .executeTakeFirstOrThrow();

    console.log('Order saved with ID:', orderResult.id);

    // Insert order items into order_items table with explicit timestamps
    const orderItems = customerData.cartItems.map(item => {
      console.log('Processing item for order_items:', {
        item_name: item.name,
        is_merch_pack: item.isMerchPack,
        tshirt_size: item.tshirtSize,
        wristband_color: item.wristbandColor
      });

      return {
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
        created_at: now,
      };
    });

    console.log('Inserting order items:', orderItems);

    await db
      .insertInto('order_items')
      .values(orderItems)
      .execute();

    console.log('Order items saved successfully');

    return orderResult.id;
  } catch (error) {
    console.error('Database save error:', error);
    throw error;
  }
}

async function updateEmailSentStatus(orderId: string, emailSent: boolean) {
  try {
    await db
      .updateTable('orders')
      .set({
        email_sent: emailSent,
        updated_at: new Date()
      })
      .where('order_id', '=', orderId)
      .execute();
  } catch (error) {
    console.error('Error updating email status:', error);
  }
}

function formatCartItemsHTML(cartItems: CartItem[]): string {
  return cartItems.map(item => {
    let itemName = item.name;
    let itemSpecs = '';

    if (item.isMerchPack) {
      const specs = [];
      if (item.tshirtSize) specs.push(`T-shirt: ${item.tshirtSize}`);
      if (item.wristbandColor) specs.push(`Wristband: ${item.wristbandColor}`);
      if (specs.length > 0) itemSpecs = ` (${specs.join(', ')})`;
      itemName += ` <span style="background: #06b6d4; color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold; margin-left: 8px;">PACK</span>`;
    } else {
      const specs = [];
      if (item.size) specs.push(`Size: ${item.size}`);
      if (item.color) specs.push(`Color: ${item.color}`);
      if (specs.length > 0) itemSpecs = ` (${specs.join(', ')})`;
    }

    return `
    <tr style="border-bottom: 1px solid #e5e7eb;">
      <td style="padding: 12px 0; font-weight: 500;">${itemName}${itemSpecs}</td>
      <td style="padding: 12px 0; text-align: center;">${item.quantity}</td>
      <td style="padding: 12px 0; text-align: right; font-weight: 600;">${item.price.toLocaleString()} LKR</td>
      <td style="padding: 12px 0; text-align: right; font-weight: 700;">${(item.price * item.quantity).toLocaleString()} LKR</td>
    </tr>
  `;
  }).join('');
}

function generateEmailHTML(data: CustomerData): string {
  const hasMerchPack = data.cartItems.some(item => item.isMerchPack);

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Order Confirmation - NacCon 2026</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f3f4f6;">
      <div style="max-width: 600px; margin: 0 auto; background-color: white;">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1f2937 0%, #374151 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">NatCon 2026</h1>
          <p style="color: #d1d5db; margin: 10px 0 0 0; font-size: 16px;">Order Confirmation ${hasMerchPack ? '🎁' : ''}</p>
        </div>

        <!-- Order Confirmed Message -->
        <div style="padding: 30px; text-align: center; background-color: #ecfdf5; border-bottom: 1px solid #e5e7eb;">
          <div style="font-size: 48px; margin-bottom: 16px;">✅</div>
          <h2 style="color: #065f46; margin: 0 0 10px 0; font-size: 24px;">Order Confirmed!</h2>
          <p style="color: #374151; margin: 0; font-size: 16px;">Thank you for your purchase. We've received your order and proof of purchase.</p>
          ${hasMerchPack ? `
            <div style="margin-top: 15px; padding: 10px; background-color: #dbeafe; border-radius: 6px; border-left: 4px solid #3b82f6;">
              <p style="margin: 0; color: #1e40af; font-weight: 600; font-size: 14px;">🎁 Your order includes custom merch pack selections!</p>
            </div>
          ` : ''}
        </div>

        <!-- Customer Details -->
        <div style="padding: 30px; border-bottom: 1px solid #e5e7eb;">
          <h3 style="color: #1f2937; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">Order Details</h3>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 0 0 8px 0; color: #374151;"><strong>Order ID:</strong> ${data.orderId}</p>
            <p style="margin: 0 0 8px 0; color: #374151;"><strong>Order Date:</strong> ${new Date(data.orderDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })}</p>
            <p style="margin: 0; color: #374151;"><strong>Status:</strong> <span style="color: #059669; font-weight: 600;">Confirmed</span></p>
          </div>

          <h4 style="color: #1f2937; margin: 20px 0 15px 0; font-size: 18px; font-weight: 600;">Customer Information</h4>
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px;">
            <p style="margin: 0 0 8px 0; color: #374151;"><strong>Name:</strong> ${data.name}</p>
            <p style="margin: 0 0 8px 0; color: #374151;"><strong>Email:</strong> ${data.email}</p>
            <p style="margin: 0 0 8px 0; color: #374151;"><strong>Contact:</strong> ${data.contactNumber}</p>
            <p style="margin: 0 0 8px 0; color: #374151;"><strong>Address:</strong> ${data.homeAddress}</p>
            <p style="margin: 0 0 8px 0; color: #374151;"><strong>Entity:</strong> ${data.entity}</p>
            <p style="margin: 0; color: #374151;"><strong>Attending NatCon 2026:</strong> ${data.attendingEvent ? 'Yes' : 'No'}</p>
          </div>
        </div>

        <!-- Order Items -->
        <div style="padding: 30px; border-bottom: 1px solid #e5e7eb;">
          <h3 style="color: #1f2937; margin: 0 0 20px 0; font-size: 20px; font-weight: 600;">Items Ordered</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <thead>
              <tr style="background-color: #f9fafb; border-bottom: 2px solid #e5e7eb;">
                <th style="padding: 12px 0; text-align: left; font-weight: 600; color: #374151;">Item</th>
                <th style="padding: 12px 0; text-align: center; font-weight: 600; color: #374151;">Qty</th>
                <th style="padding: 12px 0; text-align: right; font-weight: 600; color: #374151;">Price</th>
                <th style="padding: 12px 0; text-align: right; font-weight: 600; color: #374151;">Total</th>
              </tr>
            </thead>
            <tbody>
              ${formatCartItemsHTML(data.cartItems)}
            </tbody>
          </table>
          
          ${hasMerchPack ? `
            <div style="margin-top: 20px; padding: 15px; background-color: #eff6ff; border-radius: 8px; border-left: 4px solid #3b82f6;">
              <h4 style="color: #1e40af; margin: 0 0 8px 0; font-size: 16px; font-weight: 600;">🎁 Merch Pack Information</h4>
              <p style="color: #374151; margin: 0; font-size: 14px; line-height: 1.5;">
                Your order includes custom merch pack(s) with your selected t-shirt sizes and wristband colors. 
                Each pack will be prepared according to your specific selections.
              </p>
            </div>
          ` : ''}
        </div>

        <!-- Order Summary -->
        <div style="padding: 30px; border-bottom: 1px solid #e5e7eb;">
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
              <span style="color: #374151;">Subtotal (${data.totalItems} items):</span>
              <span style="color: #374151; font-weight: 600;">${data.totalAmount.toLocaleString()} LKR</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #d1d5db;">
              <span style="color: #374151;">Shipping:</span>
              <span style="color: #059669; font-weight: 600;">Free</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #1f2937; font-size: 18px; font-weight: bold;">Total:</span>
              <span style="color: #1f2937; font-size: 18px; font-weight: bold;">${data.totalAmount.toLocaleString()} LKR</span>
            </div>
          </div>
        </div>

        <!-- Next Steps -->
        <div style="padding: 30px; border-bottom: 1px solid #e5e7eb;">
          <h3 style="color: #1f2937; margin: 0 0 15px 0; font-size: 20px; font-weight: 600;">What happens next?</h3>
          <div style="background-color: #eff6ff; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6;">
            <ul style="margin: 0; padding-left: 20px; color: #374151; line-height: 1.6;">
              <li style="margin-bottom: 8px;">We'll review your proof of purchase</li>
              <li style="margin-bottom: 8px;">Once verified, we'll prepare your order for ${data.attendingEvent ? 'pickup at NatCon 2026' : 'delivery'}</li>
              ${hasMerchPack ? '<li style="margin-bottom: 8px;">Your merch pack items will be customized according to your selections</li>' : ''}
              <li>If you have any questions, please contact us with your Order ID</li>
            </ul>
          </div>
        </div>

        <!-- Contact Information -->
        <div style="padding: 30px; background-color: #f9fafb;">
          <h4 style="color: #1f2937; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">Need Help?</h4>
          <p style="color: #6b7280; margin: 0 0 10px 0; font-size: 14px;">
            If you have any questions about your order, please contact us and include your Order ID: <strong>${data.orderId}</strong>
          </p>
          <p style="color: #6b7280; margin: 0; font-size: 14px;">
            Thank you for supporting NatCon 2026! 🎉
          </p>
        </div>

        <!-- Footer -->
        <div style="padding: 20px; text-align: center; background-color: #1f2937;">
          <p style="color: #9ca3af; margin: 0; font-size: 12px;">
            © 2026 NatCon. This is an automated message, please do not reply to this email.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function POST(request: NextRequest) {
  try {
    const data: Omit<CustomerData, 'orderId'> = await request.json();

    console.log('Received order data:', data);

    // Generate unique order ID with customer info
    const orderId = generateOrderId(data.name, data.entity);
    const customerData: CustomerData = { ...data, orderId };

    console.log('Processing order with ID:', orderId);
    console.log('Cart items:', customerData.cartItems);

    // Save order to database first
    const dbOrderId = await saveOrderToDatabase(customerData);
    console.log(`Order saved to database with ID: ${dbOrderId}`);

    // Check if order contains merch packs for email subject
    const hasMerchPack = customerData.cartItems.some(item => item.isMerchPack);

    // Send email via Mailjet (guarded by env presence)
    const mailjetApiKey = process.env.MAILJET_API_KEY;
    const mailjetSecret = process.env.MAILJET_SECRET_KEY;
    const mailjetFrom = process.env.MAILJET_FROM_EMAIL;

    if (!mailjetApiKey || !mailjetSecret || !mailjetFrom) {
      await updateEmailSentStatus(orderId, false);
      return NextResponse.json({
        success: true,
        message: 'Order saved. Email service not configured.',
        orderId: orderId,
        dbOrderId: dbOrderId,
        hasMerchPack: hasMerchPack
      });
    }

    const mailjet = new Client({ apiKey: mailjetApiKey, apiSecret: mailjetSecret });

    const emailRequest = await mailjet
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: mailjetFrom,
              Name: "NatCon 2026 Store"
            },
            To: [
              {
                Email: customerData.email,
                Name: customerData.name
              }
            ],
            Subject: `Order Confirmation - ${orderId}${hasMerchPack ? ' 🎁' : ''} - NatCon 2026`,
            HTMLPart: generateEmailHTML(customerData)
          }
        ]
      });

    // Update email sent status based on email success
    const emailSent = emailRequest.response.status === 200;
    await updateEmailSentStatus(orderId, emailSent);

    if (emailSent) {
      return NextResponse.json({
        success: true,
        message: 'Order saved and confirmation email sent successfully',
        orderId: orderId,
        dbOrderId: dbOrderId,
        hasMerchPack: hasMerchPack
      });
    } else {
      console.error('Mailjet error:', emailRequest.response.data);
      return NextResponse.json({
        success: false,
        message: 'Order saved but failed to send confirmation email',
        orderId: orderId,
        dbOrderId: dbOrderId
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Error processing order:', error);
    return NextResponse.json({
      success: false,
      message: 'Internal server error'
    }, { status: 500 });
  }
}
