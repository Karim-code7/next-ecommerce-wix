"use client";

import { useWixClient } from "@/hooks/useWixClient";
import { loadStripe } from "@stripe/stripe-js";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface CheckoutButtonProps {
  cart: {
    name: string;
    price: number;
    quantity: number;
  }[];
  show?: boolean;
}

export default function CheckoutButton({ cart, show }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const { isLoggedIn } = useWixClient();
  const router = useRouter();

  async function handleCheckout(cart: any[]) {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
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
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4  rounded">
      <h3 className="dark:text-gray-100   font-poppins font-normal">
        Test Card{" "}
      </h3>
      <div className="text-sm  dark:text-gray-300 font-poppins">
        <p>Visa: 4242 4242 4242 4242</p>
        <p>Expiry: Any future date </p>
        <p>CVC: Any 3 digits</p>
      </div>
      <div className="flex flex-col gap-4 mt-4 ">
        <button
          onClick={() => handleCheckout(cart)}
          disabled={loading}
          className="py-3 px-4  bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 transition"
        >
          {loading ? "Processing..." : "Checkout"}
        </button>
        {show && (
          <Link href={"/viewcard"}>
            <button className="w-full rounded-md py-3 px-4 bg-secound text-white hover:bg-green-700 transition ">
              View Cart
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}
