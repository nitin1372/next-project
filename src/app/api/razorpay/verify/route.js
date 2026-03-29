import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { orderId, razorpayPaymentId, razorpaySignature } = await request.json();
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!orderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json(
        { success: false, error: "Missing payment verification fields." },
        { status: 400 }
      );
    }

    if (!keySecret) {
      return NextResponse.json(
        { success: false, error: "Razorpay secret is missing." },
        { status: 500 }
      );
    }

    const expectedSignature = crypto
      .createHmac("sha256", keySecret)
      .update(`${orderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      return NextResponse.json(
        { success: false, error: "Payment verification failed." },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      paymentId: razorpayPaymentId,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message || "Verification failed." },
      { status: 500 }
    );
  }
}
