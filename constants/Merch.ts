export interface MerchItem {
  name: string;
  price: string;
  images: string[];
  type: 'tshirt' | 'accessory' | 'pack';
  sizes?: string[];
  colors?: string[];
  description?: string;
}

export const MERCH_ITEMS: MerchItem[] = [
  {
    name: "Crew Neck Tee",
    price: "1800",
    images: ["/merch/Black both.png", "/merch/Black front.png", "/merch/Black back.png"],
    type: "tshirt",
    sizes: ["2XS", "XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"]
  },
  {
    name: "Radium Wristband",
    price: "300",
    images: ["/merch/Wristband.png"],
    type: "accessory"
  },
  {
    name: "Drawstring Bag",
    price: "550",
    images: ["/merch/bag.png"],
    type: "accessory"
  },
  {
    name: "Pouch",
    price: "450",
    images: ["/merch/pouch.png"],
    type: "accessory"
  },
  {
    name: "Merch Pack",
    price: "2000",
    images: ["/merch/Merch pack.png"],
    type: "pack",
    sizes: ["2XS", "XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
    description: "Includes: Crew Neck Tee x 1, Transparent Wristband x 1, Sticker Pack x 1"
  }
];