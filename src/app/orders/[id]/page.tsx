"use client";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useCartStore } from "@/hooks/useCardStore";
import { media as wixMedia } from "@wix/sdk";
import Image from "next/image";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2025-08-27.basil",
// });

const OrderPage = ({ params }: { params: { id: string } }) => {
  const { cart } = useCartStore();
  console.log();
  return (
    <div className=" bg-white  flex flex-col h-[calc(100vh-180px)] items-center justify-center ">
      <div className="shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px] px-40 py-20">
        <h1 className="text-xl">Order Details</h1>
        {cart.lineItems?.map((item) => (
          <div key={item._id} className="flex justify-between my-4 w-96">
            {item.image && (
              <Image
                src={wixMedia.getScaledToFillImageUrl(item.image, 72, 96, {})}
                alt=""
                width={72}
                height={96}
                className="rounded-md object-cover"
              />
            )}
            <div>
              <h2 className="font-semibold">{item.productName?.original}</h2>
              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            </div>
            <p>${item.price?.amount}</p>
          </div>
        ))}
        <div className="border-t border-gray-300 pt-4 flex justify-between">
          <h2 className="font-semibold">Total</h2>
          <p className="font-semibold">${cart.subtotal.amount}</p>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          A confirmation email has been sent to{" "}
        </div>
      </div>
      <Link href="/" className="underline mt-6">
        Have a problem? Contact us
      </Link>
    </div>
  );
};

export default OrderPage;
