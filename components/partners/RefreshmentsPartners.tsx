"use client";

import Image from "next/image";
import { refreshmentsPartners } from "../../constants/Partners";

export default function RefreshmentsPartners() {
  return (
    <section className="w-full py-12 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-natcon-red mb-8">Refreshments Partners</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-6xl w-full px-6">
        {refreshmentsPartners.map((partner, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center"
          >
            <div className="relative w-32 h-20 mb-4">
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain"
              />
            </div>
            <p className="text-white/80 text-sm">{partner.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

