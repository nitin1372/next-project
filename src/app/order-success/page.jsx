import Link from "next/link";

export default async function OrderSuccessPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const paymentId =
    typeof resolvedSearchParams?.payment_id === "string"
      ? resolvedSearchParams.payment_id
      : "";
  const paymentMethod =
    typeof resolvedSearchParams?.payment_method === "string"
      ? resolvedSearchParams.payment_method
      : "razorpay";
  const mode =
    resolvedSearchParams?.mode === "buy-now" ? "buy-now" : "cart";

  return (
    <div className="min-h-screen bg-[#f8fafc] px-5 py-10 md:px-8">
      <div className="mx-auto max-w-3xl rounded-3xl bg-white p-8 text-center shadow-sm md:p-12">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl text-green-600">
          ?
        </div>

        <p className="mt-6 text-sm font-semibold uppercase tracking-[0.25em] text-green-600">
          Payment Successful
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900">
          Your order has been placed
        </h1>
        <p className="mt-3 text-slate-600">
          {mode === "buy-now"
            ? "Your quick checkout payment was completed successfully."
            : "Your cart checkout payment was completed successfully."}
        </p>

        {paymentId && (
          <div className="mt-6 rounded-2xl bg-[#f8fafc] px-4 py-4 text-left">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {paymentMethod === "upi-qr"
                ? "UPI Payment Reference"
                : "Razorpay Payment ID"}
            </p>
            <p className="mt-2 break-all font-mono text-sm text-slate-800">
              {paymentId}
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="rounded-xl bg-[#2874f0] px-6 py-3 text-sm font-semibold text-white"
          >
            Continue Shopping
          </Link>
          <Link
            href="/cart"
            className="rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700"
          >
            View Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
