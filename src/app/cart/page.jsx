"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "../context/cartContext.js";

export default function CartPage() {
  const router = useRouter();
  const { cart, updateQuantity, removeFromCart, setBuyNowItem } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + (item.qty || 1), 0);
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * (item.qty || 1),
    0
  );
  const deliveryCharge = totalPrice > 0 ? 40 : 0;
  const discount = totalPrice > 50000 ? 500 : 0;
  const finalAmount = totalPrice + deliveryCharge - discount;

  const handleBuyThisNow = (item) => {
    setBuyNowItem({ ...item, qty: item.qty || 1 });
    router.push("/checkout?mode=buy-now");
  };

  return (
    <div className="min-h-screen bg-[#f1f3f6] px-4 py-6 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.8fr_0.9fr]">
        <section className="space-y-4">
          <div className="rounded-sm bg-white px-5 py-4 shadow-sm">
            <h1 className="text-2xl font-bold text-slate-800">
              My Cart ({totalItems})
            </h1>
          </div>

          {cart.length === 0 ? (
            <div className="rounded-sm bg-white px-6 py-12 text-center shadow-sm">
              <h2 className="text-xl font-semibold text-slate-800">
                Your cart is empty
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Add products and they will appear here.
              </p>
              <Link
                href="/"
                className="mt-5 inline-block rounded-sm bg-[#2874f0] px-6 py-3 text-sm font-semibold text-white"
              >
                Shop Now
              </Link>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <article
                  key={item.id}
                  className="rounded-sm bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-5 md:flex-row">
                    <div className="flex min-w-[140px] flex-col items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-28 w-28 object-contain"
                      />

                      <div className="flex items-center rounded-full border border-slate-300">
                        <button
                          onClick={() => updateQuantity(item.id, "decrease")}
                          className="h-8 w-8 text-lg font-semibold text-slate-700"
                        >
                          -
                        </button>
                        <span className="w-10 text-center text-sm font-semibold">
                          {item.qty || 1}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, "increase")}
                          className="h-8 w-8 text-lg font-semibold text-slate-700"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-slate-800">
                        {item.name}
                      </h2>

                      {(item.storage || item.ram) && (
                        <p className="mt-1 text-sm text-slate-500">
                          {item.storage || "Standard"}
                          {item.ram ? `, ${item.ram}` : ""}
                        </p>
                      )}

                      <p className="mt-3 text-2xl font-bold text-slate-900">
                        Rs. {item.price}
                      </p>

                      <p className="mt-1 text-sm text-green-600">
                        Delivery by tomorrow
                      </p>

                      <div className="mt-5 flex flex-wrap gap-6 text-sm font-semibold text-slate-700">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="transition hover:text-[#2874f0]"
                        >
                          REMOVE
                        </button>
                        <button
                          onClick={() => handleBuyThisNow(item)}
                          className="transition hover:text-[#2874f0]"
                        >
                          BUY THIS NOW
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}

              <div className="sticky bottom-0 rounded-sm bg-white px-5 py-4 shadow-sm">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-end">
                  <p className="text-sm text-slate-500">
                    Safe and secure payments. Easy returns.
                  </p>
                  <Link
                    href="/checkout?mode=cart"
                    className="inline-flex items-center justify-center rounded-sm bg-[#fb641b] px-10 py-3 text-sm font-semibold uppercase tracking-wide text-white"
                  >
                    Place Order
                  </Link>
                </div>
              </div>
            </>
          )}
        </section>

        <aside className="h-fit rounded-sm bg-white shadow-sm">
          <div className="border-b px-5 py-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Price Details
          </div>

          <div className="space-y-4 px-5 py-4 text-sm text-slate-700">
            <div className="flex items-center justify-between">
              <span>Price ({totalItems} items)</span>
              <span>Rs. {totalPrice}</span>
            </div>

            <div className="flex items-center justify-between text-green-600">
              <span>Discount</span>
              <span>- Rs. {discount}</span>
            </div>

            <div className="flex items-center justify-between">
              <span>Delivery Charges</span>
              <span>Rs. {deliveryCharge}</span>
            </div>

            <div className="border-t border-dashed pt-4 text-base font-bold text-slate-900">
              <div className="flex items-center justify-between">
                <span>Total Amount</span>
                <span>Rs. {finalAmount}</span>
              </div>
            </div>

            <p className="border-t pt-4 text-sm font-semibold text-green-600">
              You will save Rs. {discount} on this order
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
