// types/cart.ts
export interface BaseCartItem {
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

export interface RegularCartItem extends BaseCartItem {
  size?: string;
  color?: string;
  isMerchPack?: false;
}

export interface MerchPackCartItem extends BaseCartItem {
  isMerchPack: true;
  tshirtSize: string;
  wristbandColor: string;
  merchPackId: string;
  // Optional legacy fields for backward compatibility
  size?: never;
  color?: never;
}

export type CartItem = RegularCartItem | MerchPackCartItem;

// Database interfaces
export interface OrderRecord {
  id: number;
  order_id: string;
  customer_name: string;
  customer_email: string;
  contact_number: string;
  home_address: string;
  entity: string;
  attending_event: boolean;
  total_items: number;
  total_amount: number;
  order_date: string;
  order_items_summary: string;
  has_merch_pack: boolean;
  email_sent: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface OrderItemRecord {
  id: number;
  order_id: number;
  item_id: string;
  item_name: string;
  item_size?: string;
  price: number;
  quantity: number;
  total_price: number;
  // Merch pack specific fields
  is_merch_pack: boolean;
  tshirt_size?: string;
  wristband_color?: string;
  merch_pack_id?: string;
  created_at?: string;
}

export interface MerchPackRecord {
  id: number;
  pack_id: string;
  pack_name: string;
  pack_description?: string;
  pack_price: number;
  tshirt_size?: string;
  wristband_color?: string;
  created_at: string;
  updated_at: string;
}

// Email data interfaces
export interface CustomerOrderData {
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

// Utility type guards
export function isMerchPackItem(item: CartItem): item is MerchPackCartItem {
  return item.isMerchPack === true;
}

export function isRegularItem(item: CartItem): item is RegularCartItem {
  return !item.isMerchPack;
}

// Helper functions
export function getItemDisplayName(item: CartItem): string {
  if (isMerchPackItem(item)) {
    const specs = [];
    if (item.tshirtSize) specs.push(`T-shirt: ${item.tshirtSize}`);
    if (item.wristbandColor) specs.push(`Wristband: ${item.wristbandColor}`);
    return `${item.name}${specs.length > 0 ? ` (${specs.join(', ')})` : ''} [PACK]`;
  } else {
    const specs = [];
    if (item.size) specs.push(`Size: ${item.size}`);
    if (item.color) specs.push(`Color: ${item.color}`);
    return `${item.name}${specs.length > 0 ? ` (${specs.join(', ')})` : ''}`;
  }
}

export function getItemSpecifications(item: CartItem): string[] {
  if (isMerchPackItem(item)) {
    const specs = [];
    if (item.tshirtSize) specs.push(`T-shirt Size: ${item.tshirtSize}`);
    if (item.wristbandColor) specs.push(`Wristband Color: ${item.wristbandColor}`);
    return specs;
  } else {
    const specs = [];
    if (item.size) specs.push(`Size: ${item.size}`);
    if (item.color) specs.push(`Color: ${item.color}`);
    return specs;
  }
}
