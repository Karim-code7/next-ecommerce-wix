"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface CheckoutButtonProps {
  cart: {
    name: string;
    price: number;
    quantity: number;
  }[];
}

export default function CheckoutButton({ cart }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout(cart: any[]) {
    try {
      setLoading(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
      });

      const data = await res.json();
      if (data.id) {
        const stripe = await stripePromise;
        await stripe?.redirectToCheckout({ sessionId: data.id });
      } else {
        console.error("Checkout error:", data);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      setLoading(false);
    }
  }

  return (
    <div className="p-4 bg-gray-100 rounded">
      <h3 className="font-bold">Test Card </h3>
      <p>Visa: 4242 4242 4242 4242</p>
      <p>Expiry: Any future date </p>
      <p>CVC: Any 3 digits</p>
      <button
        onClick={() => handleCheckout(cart)}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Processing..." : "Checkout"}
      </button>
    </div>
  );
}
