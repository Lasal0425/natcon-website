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
    price: "1600",
    images: ["/merch/crew-neck-tee.webp", "/merch/crew-neck-tee-front.webp", "/merch/crew-neck-tee-back.webp"],
    type: "tshirt",
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"]
  },
  {
    name: "Oversized Tee",
    price: "1800",
    images: ["/merch/oversized-tee.webp" , "/merch/oversized-tee-front.webp", "/merch/oversized-tee-back.webp"],
    type: "tshirt",
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"]
  },
  {
    name: "Black Wristband",
    price: "300",
    images: ["/merch/wrist-band-black.webp"],
    type: "accessory"
  },
  {
    name: "White Wristband",
    price: "300",
    images: ["/merch/wrist-band-white.webp"],
    type: "accessory"
  }, 
  {
    name: "Bucket Hat (double sided)",
    price: "1400",
    images: ["/merch/bucket-hat.webp"],
    type: "accessory"
  },
  {
    name: "Water Bottle",
    price: "950",
    images: ["/merch/water-bottle.webp"],
    type: "accessory"
  },
  {
    name: "Merch Pack",
    price: "2100",
    images: ["/merch/merch-pack.webp"],
    type: "pack",
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    colors: ["Black", "White"],
    description: "Includes: Crew Neck Tee x 1, Wristband x 1, Sticker Pack x 1 + Secret Item"
  },
  {
    name: "Merch pack - Oversized",
    price: "2300",
    images: ["/merch/merch-pack-oversized.webp"],
    type: "pack",
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    colors: ["Black", "White"],
    description: "Includes: Oversized Tee x 1, Wristband x 1, Sticker Pack x 1 + Secret Item"
  }
];


