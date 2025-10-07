"use client";

import { useCartStore } from "@/hooks/useCardStore";
import Image from "next/image";
import Link from "next/link";
import { media as wixMedia } from "@wix/sdk";
import CheckoutButton from "./CheckoutButton";
import { useWixClient } from "@/hooks/useWixClient";

const ViewCard = () => {
  const { wixClient } = useWixClient();
  const { isLoding, removeItem } = useCartStore();

  const { cart, counter } = useCartStore();
  const cartItems =
    cart.lineItems?.map((item: any) => ({
      name: item.productName,
      price: item.price.amount,
      quantity: item.quantity,
      _id: item._id,
    })) || [];

  return (
    <div className=" mt-24 min-h-[calc(100vh-80px)] dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 bg-gradient-to-r from-pink-50 to-yellow-50 p-6 lg:p-12">
      <h1 className="text-3xl lg:text-4xl font-poppins font-bold text-center mb-8 dark:text-gray-100">
        🛒 Your Cart ({counter})
      </h1>

      {cart?.lineItems && cart.lineItems.length > 0 ? (
        <div className="grid gap-6">
          {/* ITEMS LIST */}
          {cart.lineItems?.map((item: any) => (
            <div
              key={item._id}
              className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md"
            >
              {/* IMAGE */}
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                  <Image
                    src={wixMedia.getScaledToFillImageUrl(
                      item.image,
                      72,
                      96,
                      {}
                    )}
                    alt=""
                    width={72}
                    height={96}
                    className="rounded-md object-cover"
                  />
                </div>
                {/* INFO */}
                <div>
                  <h2 className="font-semibold text-lg dark:text-gray-100">
                    {item.productName?.original}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.quantity} × ${item.price.amount}
                  </p>
                </div>
              </div>
              {/* PRICE */}
              <div className=" flex flex-col items-end">
                <p className="font-bold text-xl text-secound">
                  ${(item.price.amount * item.quantity).toFixed(2)}
                </p>
                <p
                  className="text-red-600 text-sm mt-2 hover:underline "
                  style={{ cursor: isLoding ? "not-allowed" : "pointer" }}
                  onClick={() => removeItem(wixClient, item._id!)}
                >
                  Remove
                </p>
              </div>
            </div>
          ))}

          {/* TOTAL & CHECKOUT */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mt-6 flex flex-col items-center gap-4">
            <div className="text-2xl font-bold dark:text-gray-100">
              Total:{" "}
              <span className="text-secound">${cart.subtotal?.amount}</span>
            </div>
            <div className="">
              <CheckoutButton cart={cartItems} show={false} />
            </div>
          </div>
        </div>
      ) : cart?.lineItems?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <p className="text-lg dark:text-gray-300">Your cart is empty </p>
          <Link
            href="/list?cat=all-products"
            className="mt-6 bg-primary hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="flex justify-center items-center h-[300px]">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default ViewCard;
