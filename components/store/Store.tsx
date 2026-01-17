"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { MERCH_ITEMS, MerchItem } from "@/constants/Merch";

// Size Chart Modal Component
function SizeChartModal({
  isOpen,
  onClose,
  productType,
}: {
  isOpen: boolean;
  onClose: () => void;
  productType: string;
}) {
  if (!isOpen) return null;

  const sizeCharts = {
    tshirt: {
        title: "Crew Neck Tee Size Chart",
      image: "/merch/crewneck-size-chart.webp",
    },
    oversized: {
      title: "Oversized Tee Size Chart", 
      image: "/merch/oversized-size-chart.webp",
    },
    pack: {
      title: "Crew Neck Tee Size Chart",
      image: "/merch/crewneck-size-chart.webp",
    },
    // Add specific pack types
    packOversized: {
      title: "Oversized Tee Size Chart",
      image: "/merch/oversized-size-chart.webp",
    },
  };

  const chart = sizeCharts[productType as keyof typeof sizeCharts] || sizeCharts.tshirt;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-squid-dark border-2 border-squid-teal rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-white">{chart.title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200 text-white text-xl"
          >
            ×
          </button>
        </div>

        {/* Size Chart Image */}
        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-lg aspect-square">
            <Image
              src={chart.image}
              alt={chart.title}
              fill
              className="object-contain rounded-xl"
            />
          </div>
        </div>

        {/* Optional measurement guide */}
        <div className="p-4 bg-white/5 rounded-xl text-center">
          <p className="text-sm text-gray-300">
            All measurements are in inches. For best fit, measure yourself and compare with the chart above.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Store() {
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const [sizeChartType, setSizeChartType] = useState<string>("tshirt");
  const router = useRouter();
  const { addToCart } = useCart();

  const handleAddToCart = (
    productName: string,
    size: string,
    quantity: number,
    product: MerchItem,
    color?: string
  ) => {
    const productDetails = MERCH_ITEMS.find(
      (item) => item.name === productName
    );

    if (productDetails) {
      const price =
        typeof productDetails.price === "string"
          ? parseFloat(productDetails.price.replace(/[^\d.-]/g, ""))
          : productDetails.price;

      addToCart({
        name: productName,
        price: price,
        image: Array.isArray(productDetails.images)
          ? productDetails.images[0]
          : productDetails.images[0],
        size,
        quantity,
        color,
      });

      const sizeText = size ? ` (${size})` : "";
      const colorText = color ? ` - ${color}` : "";
      setPopupMessage(
        `${quantity} × ${productName}${sizeText}${colorText} added to your cart!`
      );
      setTimeout(() => setPopupMessage(null), 2500);
    }
  };

  const handleViewCart = () => {
    router.push("/cart");
  };

  const openSizeChart = (productType: string) => {
    setSizeChartType(productType);
    setSizeChartOpen(true);
  };

  const closeSizeChart = () => {
    setSizeChartOpen(false);
  };

  // Helper function to determine size chart type for merch packs
  const getSizeChartTypeForPack = (product: MerchItem): string => {
    // Check if the product name contains "oversized" (case-insensitive)
    if (product.name.toLowerCase().includes('oversized')) {
      return 'packOversized';
    }
    // You can add more conditions here based on your product naming or add a sizeChartType property to MerchItem
    return 'pack';
  };

  // Separate items by type
  const merchPacks = MERCH_ITEMS.filter((item) => item.type === "pack");
  const tshirts = MERCH_ITEMS.filter((item) => item.type === "tshirt");
  const accessories = MERCH_ITEMS.filter((item) => item.type === "accessory");

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/squid-game-bg.webm" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Foreground content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mt-10 mb-8 flex items-center justify-center pb-10">
          <Image
            src="/topics/Store.png"
            alt="Store"
            width={512}
            height={64}
            className="w-3/4 sm:w-2/3 md:w-1/2 lg:w-auto h-auto hover:scale-105 hover:shadow-xl rounded-2xl transition-all duration-300 ease-in-out"
          />
        </div>

        {/* Merch Packs Section */}
        {merchPacks.length > 0 && (
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Merch Packs</h2>
              <p className="text-gray-300">
                Enter the game with our ultimate survival bundles!
              </p>
            </div>
            <div className="space-y-8 max-w-7xl mx-auto">
              {merchPacks.map((merchPack, index) => (
                <div key={index} className="flex justify-center">
                  <div className="w-full">
                    <MerchPackCard
                      product={merchPack}
                      onAddToCart={handleAddToCart}
                      onOpenSizeChart={() => openSizeChart(getSizeChartTypeForPack(merchPack))}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* T-Shirts Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">T-Shirts</h2>
            <p className="text-gray-300">
              Suit up in our premium tees, player-approved for any deadly
              challenge.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
            {tshirts.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                onAddToCart={handleAddToCart}
                onOpenSizeChart={() => {
                  const isOversized = product.name.toLowerCase().includes('oversized');
                  openSizeChart(isOversized ? "oversized" : "tshirt");
                }}
              />
            ))}
          </div>
        </div>

        {/* Accessories Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Accessories</h2>
            <p className="text-gray-300">
              Mask your identity and level up with these game-changing
              accessories.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {accessories.map((product, index) => (
              <ProductCard
                key={index}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>

        {/* View Cart Button */}
        <div className="flex justify-center mt-12 pb-8">
          <button
            onClick={handleViewCart}
            className="bg-squid-teal hover:bg-squid-teal/80 text-white py-4 px-8 rounded-xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 border-2 border-white/20"
          >
            View Cart
          </button>
        </div>
      </div>

      {/* Size Chart Modal */}
      <SizeChartModal
        isOpen={sizeChartOpen}
        onClose={closeSizeChart}
        productType={sizeChartType}
      />

      {/* Popup Message */}
      {popupMessage && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-squid-dark border-2 border-squid-teal text-white py-3 px-6 rounded-xl shadow-xl text-center z-50 animate-fade-in-out opacity-80">
          {popupMessage}
        </div>
      )}
    </section>
  );
}

function MerchPackCard({
  product,
  onAddToCart,
  onOpenSizeChart,
}: {
  product: MerchItem;
  onAddToCart: (
    productName: string,
    size: string,
    quantity: number,
    product: MerchItem,
    color?: string
  ) => void;
  onOpenSizeChart: () => void;
}) {
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[2] || "");
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [quantity, setQuantity] = useState(1);

  const hasMultipleImages =
    Array.isArray(product.images) && product.images.length > 1;
  const mainImage = hasMultipleImages
    ? product.images[imageIndex]
    : product.images?.[0];

  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleQuantityChange = (increment: boolean) => {
    setQuantity((prev) => (increment ? prev + 1 : Math.max(1, prev - 1)));
  };

  const handlePrevImage = () => {
    if (!hasMultipleImages) return;
    setImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!hasMultipleImages) return;
    setImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX - touchEndX;

    if (diffX > 50) handleNextImage();
    else if (diffX < -50) handlePrevImage();

    setTouchStartX(null);
  };

  const displayPrice =
    typeof product.price === "string"
      ? parseFloat(product.price.replace(/[^\d.-]/g, ""))
      : product.price;

  return (
    <div className="bg-gradient-to-br from-squid-dark to-black backdrop-blur-lg border-2 border-squid-teal rounded-3xl overflow-hidden shadow-2xl hover:shadow-pink-500/20 transition-all duration-300 group flex flex-col lg:flex-row">
      {/* Image container */}
      <div
        className="relative w-full lg:w-1/2 aspect-square lg:aspect-auto bg-white/5 p-6 flex items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full h-full">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-300"
          />
        </div>

        {/* Left Arrow */}
        {hasMultipleImages && (
          <button
            onClick={handlePrevImage}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-pink-600/80 hover:bg-pink-600 rounded-full transition-colors duration-200"
          >
            <div className="w-0 h-0 border-t-4 border-b-4 border-r-6 border-t-transparent border-b-transparent border-r-white"></div>
          </button>
        )}

        {/* Right Arrow */}
        {hasMultipleImages && (
          <button
            onClick={handleNextImage}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-pink-600/80 hover:bg-pink-600 rounded-full transition-colors duration-200"
          >
            <div className="w-0 h-0 border-t-4 border-b-4 border-l-6 border-t-transparent border-b-transparent border-l-white"></div>
          </button>
        )}
      </div>

      {/* Content section */}
      <div className="p-6 text-center space-y-6 flex flex-col justify-center w-full lg:w-1/2">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
          {product.description && (
            <p className="text-gray-300 text-sm mb-3">{product.description}</p>
          )}
          <p className="text-white text-3xl font-bold">{displayPrice} LKR</p>
        </div>

        {/* T-Shirt Size Selector */}
        {product.sizes && (
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2">
              <label className="text-sm text-gray-300 block font-medium">
                T-Shirt Size:
              </label>
              <button
                onClick={onOpenSizeChart}
                className="text-xs text-squid-teal hover:text-squid-teal/80 underline transition-colors duration-200"
              >
                View Size Chart
              </button>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedSize === size
                      ? "bg-pink-600 text-white shadow-lg scale-105"
                      : "bg-white/10 text-gray-300 hover:bg-white/20 hover:scale-105"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Wristband Color Selector */}
        {product.colors && (
          <div className="space-y-3">
            <label className="text-sm text-gray-300 block font-medium">
              Wristband Color:
            </label>
            <div className="flex gap-3 justify-center">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    selectedColor === color
                      ? "bg-pink-600 text-white shadow-lg scale-105"
                      : "bg-white/10 text-gray-300 hover:bg-white/20 hover:scale-105"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={() =>
            onAddToCart(
              product.name,
              selectedSize,
              quantity,
              product,
              selectedColor
            )
          }
          className="w-full bg-gradient-to-r from-squid-teal to-squid-teal/60  text-white py-4 px-6 rounded-xl transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

function ProductCard({
  product,
  onAddToCart,
  onOpenSizeChart,
}: {
  product: MerchItem;
  onAddToCart: (
    productName: string,
    size: string,
    quantity: number,
    product: MerchItem
  ) => void;
  onOpenSizeChart?: () => void;
}) {
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[2] || "");
  const [quantity, setQuantity] = useState(1);

  const hasMultipleImages =
    Array.isArray(product.images) && product.images.length > 1;
  const mainImage = hasMultipleImages
    ? product.images[imageIndex]
    : product.images?.[0];

  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleQuantityChange = (increment: boolean) => {
    setQuantity((prev) => (increment ? prev + 1 : Math.max(1, prev - 1)));
  };

  const handlePrevImage = () => {
    if (!hasMultipleImages) return;
    setImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!hasMultipleImages) return;
    setImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX - touchEndX;

    if (diffX > 50) handleNextImage();
    else if (diffX < -50) handlePrevImage();

    setTouchStartX(null);
  };

  const displayPrice =
    typeof product.price === "string"
      ? parseFloat(product.price.replace(/[^\d.-]/g, ""))
      : product.price;

  return (
    <div className="bg-black/70 backdrop-blur-lg border border-white/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer h-full flex flex-col">
      {/* Image container */}
      <div
        className="relative w-full aspect-square bg-white/5 p-4 flex items-center justify-center"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full h-full">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-contain transition-transform duration-300"
          />
        </div>

        {/* Left Arrow */}
        {hasMultipleImages && (
          <button
            onClick={handlePrevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/40 rounded-full transition-colors duration-200"
          >
            <div className="w-0 h-0 border-t-4 border-b-4 border-r-6 border-t-transparent border-b-transparent border-r-white"></div>
          </button>
        )}

        {/* Right Arrow */}
        {hasMultipleImages && (
          <button
            onClick={handleNextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/40 rounded-full transition-colors duration-200"
          >
            <div className="w-0 h-0 border-t-4 border-b-4 border-l-6 border-t-transparent border-b-transparent border-l-white"></div>
          </button>
        )}
      </div>

      {/* Content section */}
      <div className="p-4 text-center flex flex-col flex-grow space-y-4">
        <h3 className="text-lg font-semibold text-white">{product.name}</h3>
        <p className="text-gray-300 text-xl font-medium">{displayPrice} LKR</p>

        {/* Size Selector */}
        {product.type === "tshirt" && product.sizes && (
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <label className="text-sm text-gray-300 block">Size:</label>
              {onOpenSizeChart && (
                <button
                  onClick={onOpenSizeChart}
                  className="text-xs text-squid-teal hover:text-squid-teal/80 underline transition-colors duration-200"
                >
                  View Size Chart
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    selectedSize === size
                      ? "bg-pink-600 text-white"
                      : "bg-white/10 text-gray-300 hover:bg-white/20"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity Selector */}
        <div className="space-y-2">
          <label className="text-sm text-gray-300 block">Quantity:</label>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => handleQuantityChange(false)}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors duration-200"
            >
              -
            </button>
            <span className="text-white font-medium text-lg min-w-[2rem] text-center">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(true)}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors duration-200"
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={() =>
            onAddToCart(product.name, selectedSize, quantity, product)
          }
          className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 px-4 rounded-xl transition-colors duration-300 font-medium mt-auto"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}