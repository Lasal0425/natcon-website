"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

export default function Cart() {
  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const router = useRouter();
  const {
    items: cartItems,
    isLoading,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    getTotalItems,
  } = useCart();

  const showPopup = (message: string) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(null), 2000);
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
    showPopup("Quantity updated");
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
    showPopup("Item removed from cart");
  };

  const handleContinueShopping = () => {
    router.push("/store");
  };

  const handleCheckout = () => {
    showPopup("Proceeding to checkout...");
    setTimeout(() => {
      router.push("/checkout");
    }, 1000);
  };

  if (isLoading) {
    return (
      <section className="relative py-16 min-h-screen overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/background.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-natcon-green mx-auto mb-4"></div>
            <p className="text-white text-xl">Loading your cart...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-16 min-h-screen overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-10 mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Shopping Cart
          </h1>
          <p className="text-gray-300 text-lg pt-7">
            {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"} in your
            cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-black/70 backdrop-blur-lg border border-white/20 rounded-2xl p-12 max-w-md mx-auto">
              <div className="text-6xl mb-6">🛒</div>
              <h2 className="text-2xl font-semibold text-white mb-4">
                Your cart is empty
              </h2>
              <p className="text-gray-300 mb-8">
                Add some amazing NatCon drip to get started!
              </p>
              <button
                onClick={handleContinueShopping}
                className="bg-natcon-green hover:bg-natcon-green/80 text-white py-3 px-6 rounded-xl transition-all duration-300 font-medium"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="bg-black/70 backdrop-blur-lg border border-white/20 rounded-2xl p-6 sticky top-8">
                <h3 className="text-xl font-semibold text-white mb-6">
                  Order Summary
                </h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-gray-300">
                    <span>Subtotal ({getTotalItems()} items)</span>
                    <span>{getTotalPrice().toLocaleString()} LKR</span>
                  </div>
                  <div className="flex justify-between text-gray-300 text-sm">
                    <span>
                      Can be collected on the event day or will be handed over
                      to your entity
                    </span>
                  </div>
                  <div className="border-t border-white/20 pt-3">
                    <div className="flex justify-between text-white text-lg font-semibold">
                      <span>Total</span>
                      <span>{getTotalPrice().toLocaleString()} LKR</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleCheckout}
                    className="w-full bg-natcon-red hover:bg-red-700 text-white py-4 px-6 rounded-xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl"
                  >
                    Proceed to Checkout
                  </button>

                  <button
                    onClick={handleContinueShopping}
                    className="w-full bg-transparent border-2 border-natcon-green text-natcon-green hover:bg-natcon-green hover:text-white py-3 px-6 rounded-xl transition-all duration-300 font-medium"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {popupMessage && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-natcon-blue border-2 border-natcon-green text-white py-3 px-6 rounded-xl shadow-xl text-center z-50 animate-fade-in-out opacity-80">
          {popupMessage}
        </div>
      )}
    </section>
  );
}

interface CartItem {
  id: string;
  image: string;
  name: string;
  size?: string;
  color?: string;
  price: number;
  quantity: number;
  // New properties for merch packs
  isMerchPack?: boolean;
  tshirtSize?: string;
  wristbandColor?: string;
  merchPackId?: string;
}

function CartItemCard({
  item,
  onUpdateQuantity,
  onRemove,
}: {
  item: CartItem;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}) {
  const handleQuantityChange = (increment: boolean) => {
    const newQuantity = increment ? item.quantity + 1 : item.quantity - 1;
    if (newQuantity >= 1) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  // Helper function to render item specifications
  const renderItemSpecs = () => {
    if (item.isMerchPack) {
      return (
        <div className="space-y-1">
          {item.tshirtSize && (
            <p className="text-gray-400 text-sm">
              T-shirt Size: {item.tshirtSize}
            </p>
          )}
          {item.wristbandColor && (
            <p className="text-gray-400 text-sm">
              Wristband Color: {item.wristbandColor}
            </p>
          )}
          <p className="text-natcon-green text-xs font-medium">🎁 Merch Pack</p>
        </div>
      );
    } else {
      return (
        <div className="space-y-1">
          {item.size && (
            <p className="text-gray-400 text-sm">Size: {item.size}</p>
          )}
          {item.color && (
            <p className="text-gray-400 text-sm">Color: {item.color}</p>
          )}
        </div>
      );
    }
  };

  return (
    <div className="bg-black/70 backdrop-blur-lg border border-white/20 rounded-2xl p-6 hover:shadow-xl transition-all duration-300">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-shrink-0">
          <div className="relative w-24 h-24 bg-white/5 rounded-xl overflow-hidden">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-contain p-2"
            />
            {item.isMerchPack && (
              <div className="absolute top-1 right-1 bg-natcon-green text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                PACK
              </div>
            )}
          </div>
        </div>

        <div className="flex-grow">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white mb-1">
                {item.name}
              </h3>
              {renderItemSpecs()}
              <p className="text-natcon-green font-semibold text-lg mt-2">
                {item.price.toLocaleString()} LKR
              </p>
            </div>

            <div className="flex flex-col items-end gap-3">
              <div className="flex items-center gap-3">
                <span className="text-gray-300 text-sm">Qty:</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleQuantityChange(false)}
                    disabled={item.quantity <= 1}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white flex items-center justify-center transition-colors duration-200"
                  >
                    -
                  </button>
                  <span className="text-white font-medium text-lg min-w-[2rem] text-center">
                    {item.quantity}
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
                onClick={() => onRemove(item.id)}
                className="text-red-400 hover:text-red-300 text-sm transition-colors duration-200 underline"
              >
                Remove
              </button>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Item total:</span>
              <span className="text-white font-semibold text-lg">
                {(item.price * item.quantity).toLocaleString()} LKR
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

