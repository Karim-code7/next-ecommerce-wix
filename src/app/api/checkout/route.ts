import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Request body:", body.cart[0]._id);
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
              productId: item._id, // 👈 هنا بتضيف الـ id بتاع المنتج
            },
          },

          unit_amount: Math.round(Number(item.price) * 100),
        },
        quantity: item.quantity,
      })),
      success_url: `http://localhost:3000/success?orderId=${body.cart[0]._id}`,

      cancel_url: "http://localhost:3000",
    });

    return NextResponse.json({ id: session.id });
  } catch (err: any) {
    console.error("Stripe error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
