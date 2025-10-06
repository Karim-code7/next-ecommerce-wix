import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export async function POST(req: Request, request: Request) {
  try {
    const body = await req.json();
    const origin =
      req.headers.get("origin") || process.env.NEXT_PUBLIC_BASE_URL;

    console.log("Checkout body:", origin);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: body.cart.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name:
              typeof item.name === "string" ? item.name : item.name.original,
            metadata: {
              productId: item._id,
            },
          },

          unit_amount: Math.round(Number(item.price) * 100),
        },
        quantity: item.quantity,
      })),
      success_url: `${origin}/success?orderId=${body.cart[0].buyerId}`,

      cancel_url: origin,
    });

    return NextResponse.json({ id: session.id });
  } catch (err: any) {
    console.error("Stripe error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
