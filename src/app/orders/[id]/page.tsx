"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/hooks/useCardStore";
import { media as wixMedia } from "@wix/sdk";
import { useSearchParams } from "next/navigation";

const OrderPage = () => {
  const productId = useSearchParams().get("id");

  const { cart } = useCartStore();
  return (
    <div className="my-24 flex flex-col items-center justify-center h-[calc(100vh-180px)] ">
      <div className="px-10 md:px-40 py-10 md:py-20 bg-white dark:bg-slate-900 shadow-2xl rounded-2xl w-full max-w-2xl">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-600 dark:text-indigo-400">
          Order Details
        </h1>

        {/* Products */}
        <div className="space-y-4">
          {cart.lineItems?.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-4"
            >
              {item.image && (
                <Image
                  src={wixMedia.getScaledToFillImageUrl(item.image, 72, 96, {})}
                  alt={item.productName?.original || "Product"}
                  width={72}
                  height={96}
                  className="rounded-md object-cover"
                />
              )}
              <div className="flex-1">
                <h2 className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                  {item.productName?.original}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Quantity: {item.quantity}
                </p>
              </div>
              <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                ${item.price?.amount}
              </p>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="border-t border-slate-300 dark:border-slate-700 mt-6 pt-4 flex justify-between">
          <h2 className="font-semibold text-slate-800 dark:text-slate-200">
            Total
          </h2>
          <p className="font-semibold text-lg text-emerald-600 dark:text-emerald-400">
            ${cart.subtotal?.amount}
          </p>
        </div>

        {/* Message */}
        <div className="mt-4 text-sm text-slate-600 dark:text-slate-400 text-center">
          A confirmation email has been sent to your email address.
        </div>
        <h2 className="text-center mt-8 text-xl dark:text-gray-200">
          Order Id :{productId}
        </h2>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <Link
          href="/list?cat=all-products"
          className="px-5 py-2 text-sm font-medium rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition"
        >
          Continue Shopping
        </Link>
        <Link
          href="/ "
          className="px-5 py-2 text-sm font-medium rounded-md bg-emerald-500 text-white hover:bg-emerald-600 transition"
        >
          Need Help? Contact us
        </Link>
      </div>
    </div>
  );
};

export default OrderPage;
