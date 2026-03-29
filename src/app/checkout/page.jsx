"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "../context/cartContext.js";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  city: "",
  pinCode: "",
  address: "",
};

const upiId = "nitin242@ptaxis";
const payeeName = "nitin";
const qrImagePath = "/qr.jpeg";

const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve(false);
      return;
    }

    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const existingScript = document.getElementById("razorpay-checkout-js");
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(true), {
        once: true,
      });
      existingScript.addEventListener("error", () => resolve(false), {
        once: true,
      });
      return;
    }

    const script = document.createElement("script");
    script.id = "razorpay-checkout-js";
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") === "buy-now" ? "buy-now" : "cart";
  const { cart, buyNowItem, clearCart, clearBuyNowItem } = useCart();
  const [formData, setFormData] = useState(initialForm);
  const [paymentError, setPaymentError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUpiModalOpen, setIsUpiModalOpen] = useState(false);
  const [copiedField, setCopiedField] = useState("");

  const checkoutItems =
    mode === "buy-now"
      ? buyNowItem
        ? [buyNowItem]
        : []
      : cart;

  const totalItems = checkoutItems.reduce(
    (acc, item) => acc + (item.qty || 1),
    0
  );
  const subtotal = checkoutItems.reduce(
    (acc, item) => acc + item.price * (item.qty || 1),
    0
  );
  const deliveryCharge = subtotal > 0 ? 40 : 0;
  const finalAmount = subtotal + deliveryCharge;

  const updateField = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const validateCheckout = () => {
    if (checkoutItems.length === 0) {
      setPaymentError("No items are ready for checkout.");
      return false;
    }

    if (
      !formData.fullName ||
      !formData.phone ||
      !formData.city ||
      !formData.pinCode ||
      !formData.address
    ) {
      setPaymentError("Please fill all delivery details before payment.");
      return false;
    }

    setPaymentError("");
    return true;
  };

  const completeCheckout = (paymentId, paymentMethod = "razorpay") => {
    if (mode === "buy-now") {
      clearBuyNowItem();
    } else {
      clearCart();
      clearBuyNowItem();
    }

    router.push(
      `/order-success?payment_id=${encodeURIComponent(
        paymentId
      )}&mode=${mode}&payment_method=${encodeURIComponent(paymentMethod)}`
    );
  };

  const handleOpenUpiModal = () => {
    if (!validateCheckout()) {
      return;
    }

    setCopiedField("");
    setIsUpiModalOpen(true);
  };

  const handleManualPaymentComplete = () => {
    setIsUpiModalOpen(false);
    completeCheckout(`UPI-QR-${Date.now()}`, "upi-qr");
  };

  const handleCopyUpiId = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopiedField("upi");
    } catch {
      setCopiedField("");
      setPaymentError("Unable to copy UPI ID automatically.");
    }
  };

  const handlePlaceOrder = async () => {
    if (!validateCheckout()) {
      return;
    }

    setIsProcessing(true);

    try {
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        throw new Error("Unable to load Razorpay checkout.");
      }

      const orderResponse = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: checkoutItems,
          mode,
          customer: formData,
        }),
      });

      const orderData = await orderResponse.json();

      if (!orderResponse.ok) {
        throw new Error(orderData.error || "Failed to create payment order.");
      }

      const razorpay = new window.Razorpay({
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "MobileStore",
        description: mode === "buy-now" ? "Quick Checkout" : "Cart Checkout",
        order_id: orderData.id,
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        notes: {
          city: formData.city,
          pin_code: formData.pinCode,
          address: formData.address,
        },
        theme: {
          color: "#2874f0",
        },
        modal: {
          ondismiss: () => setIsProcessing(false),
        },
        handler: async function (response) {
          try {
            const verifyResponse = await fetch("/api/razorpay/verify", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                orderId: orderData.id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (!verifyResponse.ok || !verifyData.success) {
              throw new Error(
                verifyData.error || "Payment verification failed."
              );
            }

            completeCheckout(response.razorpay_payment_id, "razorpay");
          } catch (error) {
            setPaymentError(error.message || "Payment verification failed.");
            setIsProcessing(false);
          }
        },
      });

      razorpay.on("payment.failed", function (response) {
        setPaymentError(
          response.error?.description || "Payment failed. Please try again."
        );
        setIsProcessing(false);
      });

      razorpay.open();
    } catch (error) {
      setPaymentError(error.message || "Unable to start payment.");
      setIsProcessing(false);
    }
  };

  if (checkoutItems.length === 0) {
    return (
      <div className="mx-auto max-w-3xl rounded-2xl bg-white px-6 py-12 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">Checkout</h1>
        <p className="mt-3 text-slate-600">No items are ready for checkout.</p>
        <Link
          href="/"
          className="mt-5 inline-flex rounded-lg bg-[#2874f0] px-5 py-3 text-sm font-semibold text-white"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const upiPaymentLink = `upi://pay?pa=${encodeURIComponent(
    upiId
  )}&pn=${encodeURIComponent(payeeName)}&am=${encodeURIComponent(
    String(finalAmount)
  )}&cu=INR&tn=${encodeURIComponent(
    `${mode === "buy-now" ? "Quick Checkout" : "Cart Checkout"} payment`
  )}`;

  return (
    <>
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.6fr_0.9fr]">
        <section className="space-y-5">
          <div className="rounded-2xl bg-white px-6 py-5 shadow-sm">
            <p className="text-sm font-medium text-[#2874f0]">
              {mode === "buy-now" ? "Quick Checkout" : "Cart Checkout"}
            </p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">Checkout</h1>
            <p className="mt-2 text-sm text-slate-500">
              {totalItems} {totalItems === 1 ? "item" : "items"} ready for
              secure payment and delivery.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Delivery Details
            </h2>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <input
                type="text"
                value={formData.fullName}
                onChange={(event) => updateField("fullName", event.target.value)}
                placeholder="Full Name"
                className="rounded-xl border border-slate-300 p-3 outline-none focus:ring-2 focus:ring-[#2874f0]"
              />
              <input
                type="email"
                value={formData.email}
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="Email (optional)"
                className="rounded-xl border border-slate-300 p-3 outline-none focus:ring-2 focus:ring-[#2874f0]"
              />
              <input
                type="text"
                value={formData.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                placeholder="Phone Number"
                className="rounded-xl border border-slate-300 p-3 outline-none focus:ring-2 focus:ring-[#2874f0]"
              />
              <input
                type="text"
                value={formData.city}
                onChange={(event) => updateField("city", event.target.value)}
                placeholder="City"
                className="rounded-xl border border-slate-300 p-3 outline-none focus:ring-2 focus:ring-[#2874f0]"
              />
              <input
                type="text"
                value={formData.pinCode}
                onChange={(event) => updateField("pinCode", event.target.value)}
                placeholder="PIN Code"
                className="rounded-xl border border-slate-300 p-3 outline-none focus:ring-2 focus:ring-[#2874f0] md:col-span-2"
              />
            </div>

            <textarea
              value={formData.address}
              onChange={(event) => updateField("address", event.target.value)}
              placeholder="Full Address"
              className="mt-4 min-h-[120px] w-full rounded-xl border border-slate-300 p-3 outline-none focus:ring-2 focus:ring-[#2874f0]"
            />
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Order Items</h2>

            <div className="mt-5 space-y-4">
              {checkoutItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 rounded-xl border border-slate-200 p-4"
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="h-20 w-20 object-contain"
                  />

                  <div className="flex-1">
                    <h3 className="font-semibold text-slate-900">{item.name}</h3>
                    {(item.storage || item.ram) && (
                      <p className="mt-1 text-sm text-slate-500">
                        {item.storage || "Standard"}
                        {item.ram ? `, ${item.ram}` : ""}
                      </p>
                    )}
                    <p className="mt-2 text-sm text-slate-500">
                      Qty: {item.qty || 1}
                    </p>
                  </div>

                  <p className="text-lg font-bold text-slate-900">
                    Rs. {item.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="h-fit rounded-2xl bg-white shadow-sm">
          <div className="border-b px-5 py-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Payment Summary
          </div>

          <div className="space-y-4 px-5 py-4 text-sm text-slate-700">
            <div className="flex items-center justify-between">
              <span>Items ({totalItems})</span>
              <span>Rs. {subtotal}</span>
            </div>

            <div className="flex items-center justify-between">
              <span>Delivery Charges</span>
              <span>Rs. {deliveryCharge}</span>
            </div>

            <div className="border-t border-dashed pt-4 text-base font-bold text-slate-900">
              <div className="flex items-center justify-between">
                <span>Total Payable</span>
                <span>Rs. {finalAmount}</span>
              </div>
            </div>

            <p className="rounded-xl bg-[#f8fbff] px-3 py-3 text-xs text-slate-600">
              Scan your custom QR and pay directly on UPI. You can also use
              Razorpay checkout if you want online verification.
            </p>

            {paymentError && (
              <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">
                {paymentError}
              </p>
            )}

            <button
              onClick={handleOpenUpiModal}
              disabled={isProcessing}
              className="mt-2 w-full rounded-xl bg-[#fb641b] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              Show QR & UPI
            </button>

            <button
              onClick={handlePlaceOrder}
              disabled={isProcessing}
              className="w-full rounded-xl border border-slate-300 px-5 py-3 text-sm font-semibold uppercase tracking-wide text-slate-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isProcessing ? "Processing..." : "Pay with Razorpay"}
            </button>
          </div>
        </aside>
      </div>

      {isUpiModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/65 px-4 py-6">
          <div className="w-full max-w-md rounded-3xl bg-white p-5 shadow-2xl sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-[#2874f0]">UPI Payment</p>
                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                  Scan & Pay
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Pay Rs. {finalAmount} to complete your order.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsUpiModalOpen(false)}
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100"
                aria-label="Close payment popup"
              >
                x
              </button>
            </div>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="mx-auto flex w-full max-w-[260px] items-center justify-center rounded-2xl bg-white p-3 shadow-sm">
                <Image
                  src={qrImagePath}
                  alt="UPI QR code"
                  width={240}
                  height={240}
                  className="h-auto w-full rounded-xl object-contain"
                />
              </div>

              <div className="mt-4 space-y-3 rounded-2xl bg-white p-4 shadow-sm">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Payee Name
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {payeeName}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    UPI ID
                  </p>
                  <p className="mt-1 break-all text-sm font-medium text-slate-900">
                    {upiId}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Amount
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    Rs. {finalAmount}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleCopyUpiId}
                className="rounded-xl border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                {copiedField === "upi" ? "UPI ID Copied" : "Copy UPI ID"}
              </button>

              <a
                href={upiPaymentLink}
                className="rounded-xl border border-[#2874f0] px-4 py-3 text-center text-sm font-semibold text-[#2874f0] transition hover:bg-[#f0f7ff]"
              >
                Open UPI App
              </a>
            </div>

            <p className="mt-4 rounded-xl bg-amber-50 px-3 py-3 text-xs leading-5 text-amber-700">
              After payment, click the confirmation button below. This is a
              manual confirmation flow, so it does not auto-verify the UPI
              payment.
            </p>

            <button
              type="button"
              onClick={handleManualPaymentComplete}
              className="mt-4 w-full rounded-xl bg-[#26a541] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-white"
            >
              I Have Completed Payment
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#f1f3f6] p-5 md:p-8">
      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl rounded-2xl bg-white px-6 py-12 shadow-sm">
            Loading checkout...
          </div>
        }
      >
        <CheckoutContent />
      </Suspense>
    </div>
  );
}
