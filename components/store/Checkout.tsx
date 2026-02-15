"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

interface FormData {
  name: string;
  email: string;
  contactNumber: string;
  homeAddress: string;
  entity: string;
  attendingEvent: boolean;
  proofOfPurchase: File | null;
}

interface CartItem {
  id: string;
  image: string;
  name: string;
  size?: string;
  color?: string;
  price: number;
  quantity: number;
  // Merch pack properties
  isMerchPack?: boolean;
  tshirtSize?: string;
  wristbandColor?: string;
  merchPackId?: string;
}

export default function Checkout() {
  const router = useRouter();
  const {
    items: cartItems,
    getTotalPrice,
    getTotalItems,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    contactNumber: "",
    homeAddress: "",
    entity: "",
    attendingEvent: false,
    proofOfPurchase: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [showContactInfo, setShowContactInfo] = useState(false);

  const entityOptions = [
    "Colombo Central",
    "Colombo South",
    "Colombo North",
    "USJ",
    "Kandy",
    "SLIIT",
    "NSBM",
    "NIBM",
    "Rajarata",
    "Ruhuna",
    "Wayamba",
  ];

  // Redirect if cart is empty
  if (cartItems.length === 0) {
    return (
      <section className="relative py-16 min-h-screen overflow-hidden">
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

        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[60vh]">
          <div className="bg-black/70 backdrop-blur-lg border border-white/20 rounded-2xl p-12 text-center">
            <div className="text-6xl mb-6">🛒</div>
            <h2 className="text-2xl font-semibold text-white mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-300 mb-8">
              Add some items to your cart before checking out.
            </p>
            <button
              onClick={() => router.push("/store")}
              className="bg-natcon-green hover:bg-natcon-green/80 text-white py-3 px-6 rounded-xl transition-all duration-300 font-medium"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </section>
    );
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    // Validate file size (10MB limit)
    if (file && file.size > 10 * 1024 * 1024) {
      setErrorMessage("File size must be less than 10MB");
      return;
    }

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (file && !allowedTypes.includes(file.type)) {
      setErrorMessage("Please upload a valid file (JPG, PNG, PDF, DOC, DOCX)");
      return;
    }

    setFormData((prev) => ({ ...prev, proofOfPurchase: file }));
    setErrorMessage(""); // Clear any previous errors
  };

  const sendCustomerConfirmation = async () => {
    try {
      // Prepare cart items data with merch pack details
      const cartItemsForEmail = cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
        isMerchPack: item.isMerchPack || false,
        tshirtSize: item.isMerchPack ? item.tshirtSize : undefined,
        wristbandColor: item.isMerchPack ? item.wristbandColor : undefined,
        merchPackId: item.isMerchPack ? item.merchPackId : undefined,
      }));

      const customerData = {
        name: formData.name,
        email: formData.email,
        contactNumber: formData.contactNumber,
        homeAddress: formData.homeAddress,
        entity: formData.entity,
        attendingEvent: formData.attendingEvent,
        cartItems: cartItemsForEmail,
        totalItems: getTotalItems(),
        totalAmount: getTotalPrice(),
        orderDate: new Date().toISOString(),
      };

      const response = await fetch("/api/send-customer-confirmation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customerData),
      });

      const result = await response.json();

      if (!result.success) {
        console.error("Failed to send customer confirmation:", result.message);
        // Don't fail the entire order if email fails
      }
    } catch (error) {
      console.error("Error sending customer confirmation:", error);
      // Don't fail the entire order if email fails
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const submitData = new FormData();

      // Form fields
      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      submitData.append("contactNumber", formData.contactNumber);
      submitData.append("homeAddress", formData.homeAddress);
      submitData.append("entity", formData.entity);
      submitData.append("attendingEvent", formData.attendingEvent.toString());

      // Enhanced cart summary with merch pack details
      const cartSummary = cartItems
        .map((item) => {
          let itemDetails = item.name;

          if (item.isMerchPack) {
            const specs = [];
            if (item.tshirtSize) specs.push(`T-shirt: ${item.tshirtSize}`);
            if (item.wristbandColor)
              specs.push(`Wristband: ${item.wristbandColor}`);
            if (specs.length > 0) itemDetails += ` (${specs.join(", ")})`;
            itemDetails += " [MERCH PACK]";
          } else {
            if (item.size) itemDetails += ` (Size: ${item.size})`;
            if (item.color) itemDetails += ` (Color: ${item.color})`;
          }

          return `${itemDetails} - Qty: ${item.quantity
            } - ${item.price.toLocaleString()} LKR each`;
        })
        .join("\n");

      submitData.append("cartItems", cartSummary);
      submitData.append("totalItems", getTotalItems().toString());
      submitData.append(
        "totalAmount",
        `${getTotalPrice().toLocaleString()} LKR`
      );

      // Check if order contains merch packs
      const hasMerchPack = cartItems.some((item) => item.isMerchPack);
      submitData.append("hasMerchPack", hasMerchPack.toString());

      // Add detailed cart items as JSON for backend processing
      submitData.append("cartItemsJson", JSON.stringify(cartItems));

      // Order timestamp
      submitData.append("orderDate", new Date().toISOString());

      // Add proof of purchase file
      if (formData.proofOfPurchase) {
        submitData.append("proofOfPurchase", formData.proofOfPurchase);
      }

      // Send to your existing API route (for admin notification)
      const response = await fetch("/api/checkout", {
        method: "POST",
        body: submitData,
      });

      const result = await response.json();

      if (result.success) {
        // Send customer confirmation email
        await sendCustomerConfirmation();

        setSubmitStatus("success");
        // Clear the cart after successful submission
        setTimeout(() => {
          clearCart();
          router.push("/order-confirmation");
        }, 3000);
      } else {
        setSubmitStatus("error");
        setErrorMessage(
          result.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      setSubmitStatus("error");
      setErrorMessage(
        "Network error. Please check your connection and try again."
      );
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper function to render cart item details in checkout
  const renderCheckoutItemDetails = (item: CartItem) => {
    if (item.isMerchPack) {
      return (
        <div>
          <h4 className="text-white font-medium">{item.name}</h4>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-natcon-green text-white text-xs px-2 py-1 rounded-full font-bold">
              PACK
            </span>
          </div>
          {item.tshirtSize && (
            <p className="text-gray-400 text-sm">T-shirt: {item.tshirtSize}</p>
          )}
          {item.wristbandColor && (
            <p className="text-gray-400 text-sm">
              Wristband: {item.wristbandColor}
            </p>
          )}
          <p className="text-gray-300">Qty: {item.quantity}</p>
        </div>
      );
    } else {
      return (
        <div>
          <h4 className="text-white font-medium">{item.name}</h4>
          {item.size && (
            <p className="text-gray-400 text-sm">Size: {item.size}</p>
          )}
          {item.color && (
            <p className="text-gray-400 text-sm">Color: {item.color}</p>
          )}
          <p className="text-gray-300">Qty: {item.quantity}</p>
        </div>
      );
    }
  };

  if (submitStatus === "success") {
    return (
      <section className="relative py-16 min-h-screen overflow-hidden">
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

        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-[60vh]">
          <div className="bg-black/70 backdrop-blur-lg border border-white/20 rounded-2xl p-12 text-center">
            <div className="text-6xl mb-6">✅</div>
            <h2 className="text-3xl font-semibold text-white mb-4">
              Order Submitted Successfully!
            </h2>
            <p className="text-gray-300 mb-4">
              Thank you for your purchase! We have received your order and proof
              of purchase.
            </p>
            <p className="text-gray-400 text-sm mb-8">
              You&apos;ll receive a confirmation email shortly. Redirecting to
              confirmation page...
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-natcon-green mx-auto"></div>
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
        <source src="/squid-game-bg.webm" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="mt-10 mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Checkout
          </h1>
          <p className="text-gray-300 text-lg">Complete your order</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Order Summary */}
          <div className="order-2 lg:order-1">
            <div className="bg-black/70 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">
                Order Summary
              </h3>

              {/* Cart Items */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-white/5 rounded-xl"
                  >
                    <div className="relative w-16 h-16 bg-white/10 rounded-lg overflow-hidden flex-shrink-0">
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
                    <div className="flex-grow">
                      {renderCheckoutItemDetails(item)}
                    </div>
                    <div className="text-right">
                      <p className="text-natcon-green font-semibold">
                        {(item.price * item.quantity).toLocaleString()} LKR
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 pt-4 border-t border-white/20">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span>{getTotalPrice().toLocaleString()} LKR</span>
                </div>
                {/* <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span>Free</span>
                </div> */}
                <div className="flex justify-between text-white text-xl font-bold pt-2 border-t border-white/20">
                  <span>Total</span>
                  <span>{getTotalPrice().toLocaleString()} LKR</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="order-1 lg:order-2">
            <div className="bg-black/70 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">
                Customer Information
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-natcon-green focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-natcon-green focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Contact Number */}
                <div>
                  <label
                    htmlFor="contactNumber"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-natcon-green focus:border-transparent"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Home Address */}
                <div>
                  <label
                    htmlFor="homeAddress"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Home Address *
                  </label>
                  <textarea
                    id="homeAddress"
                    name="homeAddress"
                    value={formData.homeAddress}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-natcon-green focus:border-transparent resize-none"
                    placeholder="Enter your complete home address"
                  />
                </div>

                {/* Entity */}
                <div>
                  <label
                    htmlFor="entity"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Entity *
                  </label>
                  <select
                    id="entity"
                    name="entity"
                    value={formData.entity}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-natcon-green focus:border-transparent"
                  >
                    <option value="" className="bg-gray-800">
                      Select your entity
                    </option>
                    {entityOptions.map((option) => (
                      <option
                        key={option}
                        value={option}
                        className="bg-gray-800"
                      >
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Attending Event */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="attendingEvent"
                    name="attendingEvent"
                    checked={formData.attendingEvent}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-natcon-green bg-white/10 border-white/20 rounded focus:ring-natcon-green focus:ring-2"
                  />
                  <label
                    htmlFor="attendingEvent"
                    className="text-sm text-gray-300"
                  >
                    I will be attending NatCon 2026
                  </label>
                </div>

                {/* Bank Details */}
                <div className="bg-white/5 border border-white/20 rounded-xl p-4">
                  <h4 className="text-white font-semibold mb-3">
                    Bank Account Details
                  </h4>
                  <ul className="space-y-1 text-gray-300 text-sm">
                    <li>
                      <strong>Account Number:</strong> 013020424602
                    </li>
                    <li>
                      <strong>Account Name:</strong> K.G.T.Tharuka
                    </li>
                    <li>
                      <strong>Bank:</strong> HNB
                    </li>
                    <li>
                      <strong>Branch:</strong> Galle
                    </li>
                  </ul>
                  <p className="text-xs text-gray-400 mt-2">
                    💡 Please transfer the amount to the above account and
                    upload your proof of purchase below.
                  </p>
                </div>

                {/* Proof of Purchase File Upload */}
                <div>
                  <label
                    htmlFor="proofOfPurchase"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Proof of Purchase *
                  </label>
                  <input
                    type="file"
                    id="proofOfPurchase"
                    name="proofOfPurchase"
                    onChange={handleFileChange}
                    required
                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-natcon-green file:text-white hover:file:bg-natcon-green/80 focus:outline-none focus:ring-2 focus:ring-natcon-green focus:border-transparent"
                  />
                  <div className="mt-2 space-y-1">
                    <p className="text-gray-400 text-xs">
                      📄 Upload bank receipt, payment screenshot, or other proof
                    </p>
                    <p className="text-gray-400 text-xs">
                      📏 Max file size: 10MB | Formats: JPG, PNG, PDF, DOC
                    </p>
                    {formData.proofOfPurchase && (
                      <p className="text-green-400 text-xs">
                        ✅ File selected: {formData.proofOfPurchase.name}
                      </p>
                    )}
                  </div>
                </div>

                {/* Error Message */}
                {(submitStatus === "error" || errorMessage) && (
                  <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4">
                    <p className="text-red-300 text-sm">
                      {errorMessage ||
                        "Something went wrong. Please try again."}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-natcon-red hover:bg-red-700 disabled:bg-natcon-red/50 disabled:cursor-not-allowed text-white py-4 px-6 rounded-xl transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Processing Order...
                    </>
                  ) : (
                    "Complete Order"
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => router.push("/cart")}
                  className="w-full bg-transparent border-2 border-natcon-green text-natcon-green hover:bg-natcon-green hover:text-white py-3 px-6 rounded-xl transition-all duration-300 font-medium"
                >
                  Back to Cart
                </button>

                {/* Support Email */}
                <div className="mt-4 text-center text-gray-400 text-sm">
                  <p className="mb-2">
                    In case you encounter an error, immediately send an email to{" "}
                    <a href="mailto:bimsara.madurapperuma@aiesec.net" className="text-natcon-green hover:underline">
                      lasal.rathnayake@aiesec.net
                    </a>
                    <br></br>
                    or send a message via WhatsApp
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowContactInfo(!showContactInfo)}
                    className="text-natcon-green hover:text-natcon-green/80 underline transition-colors duration-200"
                  >
                    {showContactInfo ? "Hide WhatsApp contact" : "click to view WhatsApp contact"}
                  </button>
                  {showContactInfo && (
                    <p className="mt-2 text-gray-300">
                      WhatsApp: +94710792783
                    </p>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
