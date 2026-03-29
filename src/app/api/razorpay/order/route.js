import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { items, mode, customer } = await request.json();

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "No items provided for payment." },
        { status: 400 }
      );
    }

    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: "Razorpay keys are missing. Add them to your env file." },
        { status: 500 }
      );
    }

    const subtotal = items.reduce(
      (sum, item) => sum + Number(item.price || 0) * Number(item.qty || 1),
      0
    );
    const deliveryCharge = subtotal > 0 ? 40 : 0;
    const amount = subtotal + deliveryCharge;

    if (amount <= 0) {
      return NextResponse.json(
        { error: "Invalid order amount." },
        { status: 400 }
      );
    }

    const authToken = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
    const razorpayResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        Authorization: `Basic ${authToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount * 100,
        currency: "INR",
        receipt: `mn_${Date.now()}`,
        notes: {
          checkout_mode: mode || "cart",
          customer_name: customer?.fullName || "",
          customer_phone: customer?.phone || "",
          customer_city: customer?.city || "",
        },
      }),
      cache: "no-store",
    });

    const razorpayOrder = await razorpayResponse.json();

    if (!razorpayResponse.ok) {
      return NextResponse.json(
        {
          error:
            razorpayOrder?.error?.description ||
            "Unable to create Razorpay order.",
        },
        { status: razorpayResponse.status }
      );
    }

    return NextResponse.json({
      id: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      key: keyId,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to create payment order." },
      { status: 500 }
    );
  }
}
