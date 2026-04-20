export interface Partner {
  name: string;
  role: string;
  logo: string;
  link?: string;
}

export const mainPartners: Partner[] = [
  {
    name: "Ceylinco Life",
    role: "Official Title Partner",
    logo: "/partners/Ceylinco Life.png",
    link: "https://www.ceylincolife.com/"
  },
  {
    name: "Colombo West International Terminal",
    role: "Official Bronze Partner",
    logo: "/partners/cwit01.png",
    link: "https://www.cwit.lk/"
  },
  {
    name: "Technomedics",
    role: "Official Banner Partner",
    logo: "/partners/technomedics.jpg",
    link: "https://www.technomediclk.com/"
  },
  {
    name: "DIMO",
    role: "National Partner",
    logo: "/partners/dimo logo.png",
    link: "https://www.dimolanka.com/"
  },
  {
    name: "Emerald",
    role: "National Partner",
    logo: "/partners/Emerald Logo.png",
    link: "https://www.emerald.lk/"
  },
];

export const otherPartners: Partner[] = [
  {
    name: "Barista",
    role: "Official Happiness Partner",
    logo: "/partners/Barista New Logo - o.png",
    link: "https://barista.lk/"
  },
  {
    name: "Eventure",
    role: "Official Event Partner",
    logo: "/partners/Eventure.jpeg",
  },
  {
    name: "Pearl Bay",
    role: "Official Leisure Partner",
    logo: "/partners/Perlbay Logo.jpeg",
  },
  {
    name: "Digital Canvas Pvt Ltd",
    role: "Printing Partner",
    logo: "/partners/digital canvas.png",
  },
  {
    name: "Soft Wave",
    role: "Printing Partner",
    logo: "/partners/Soft Wave.jpeg",
  },
  {
    name: "CEYORA PHOTOGRAPHY",
    role: "Photography Partner",
    logo: "/partners/Ceyora.jpeg",
  },
  {
    name: "PRIYANTHA BANDARA",
    role: "Photography Partner",
    logo: "/partners/priyantha bandara photography.jpg",
  },
  {
    name: "Sen Events",
    role: "Multimedia Partner",
    logo: "/partners/LOGO JPG.png",
  },
  {
    name: "Samaposha",
    role: "Nutrition Partner",
    logo: "/partners/Samaposha - Nutrition Partner.jpeg",
  },
];

export const giftPartners: Partner[] = [
  {
    name: "Naturals",
    role: "Gift Partner",
    logo: "/partners/Naturals Logo.png",
  },
  {
    name: "Wijaya Lelwala",
    role: "Gift Partner",
    logo: "/partners/wijaya lelwala.jpeg",
  },
  {
    name: "Nilwarie Cakes and Sweets",
    role: "Gift Partner",
    logo: "/partners/Nilwarie.jpeg",
  },
  {
    name: "Catfeine",
    role: "Gift Partner",
    logo: "/partners/Business Logo .jpeg",
  },
  {
    name: "Rich Layers",
    role: "Gift Partner",
    logo: "/partners/Rich Layers.jpeg",
  },
  {
    name: "The Velvet Crumb",
    role: "Gift Partner",
    logo: "/partners/The Velvet Crumb.jpeg",
  },
  {
    name: "Treats & Treasures",
    role: "Gift Partner",
    logo: "/partners/Treats & Treasures.jpeg",
  },
  {
    name: "Candles Studio",
    role: "Gift Partner",
    logo: "/partners/Candles Studio.jpg",
  },
];

// For backward compatibility
export const refreshmentsPartners = giftPartners;
