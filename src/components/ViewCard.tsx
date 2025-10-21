"use client";

import { useCartStore } from "@/hooks/useCardStore";
import Image from "next/image";
import Link from "next/link";
import { media as wixMedia } from "@wix/sdk";
import CheckoutButton from "./CheckoutButton";
import { useWixClient } from "@/hooks/useWixClient";

const ViewCard = () => {
  const { wixClient } = useWixClient();
  const { cart, counter, isLoding, removeItem, updateItemQuantity } =
    useCartStore();
  const cartItems =
    cart?.lineItems?.map((item: any) => ({
      name: item.productName,
      price: item.price.amount,
      quantity: item.quantity,
      _id: item._id,
    })) || [];
  const handleQuantityChange = (
    itemId: string,
    currentQty: number,
    change: number
  ) => {
    const newQty = currentQty + change;
    if (newQty < 1) return;
    updateItemQuantity(wixClient, itemId, newQty);
  };
  return (
    <div className="mt-24 min-h-[calc(100vh-80px)] dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 bg-gradient-to-r from-pink-50 to-yellow-50 p-6 lg:p-12">
      <h1 className="text-3xl lg:text-4xl font-poppins font-bold text-center mb-8 dark:text-gray-100">
        🛒 Your Cart ({counter})
      </h1>

      {cart?.lineItems && cart.lineItems.length > 0 ? (
        <div className="flex flex-col lg:flex-row gap-8 lg:items-start">
          {/*  LEFT SECTION - ITEMS LIST */}
          <div className="flex-1 flex flex-col gap-6">
            {cart.lineItems.map((item: any) => (
              <div
                key={item._id}
                className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-md"
              >
                {/* IMAGE + INFO */}
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                    <Image
                      src={wixMedia.getScaledToFillImageUrl(
                        item.image,
                        72,
                        96,
                        {}
                      )}
                      alt={item.productName?.original || ""}
                      width={72}
                      height={96}
                      className="rounded-md object-cover"
                    />
                  </div>

                  <div>
                    <div className="mb-2">
                      <h2 className="font-semibold text-lg dark:text-gray-100">
                        {item.productName?.original}
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        ${item.price.amount} each
                      </p>
                    </div>
                    {item.descriptionLines?.map((line: any, index: number) => (
                      <div
                        className="flex items-center gap-2 text-sm font-roboto font-normal mb-2"
                        key={index}
                      >
                        <p className="text-gray-700 dark:text-gray-200">
                          {line.name?.original}
                        </p>
                        <span className="text-gray-400">|</span>
                        <p className="text-gray-500 dark:text-gray-400">
                          {line.plainText?.original || line.colorInfo?.original}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* QUANTITY + REMOVE + PRICE */}
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity, -1)
                      }
                      disabled={isLoding || item.quantity <= 1}
                      className="w-8 h-8 flex justify-center items-center rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-xl font-bold disabled:opacity-50"
                    >
                      −
                    </button>
                    <span className="w-6 text-center font-semibold dark:text-gray-100">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item._id, item.quantity, +1)
                      }
                      disabled={
                        isLoding ||
                        item.quantity >= item.availability.quantityAvailable
                      }
                      className="w-8 h-8 flex justify-center items-center rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 text-xl font-bold disabled:opacity-50"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-bold text-xl text-secound mt-2">
                    ${(item.price.amount * item.quantity).toFixed(2)}
                  </p>

                  <button
                    disabled={isLoding}
                    onClick={() => removeItem(wixClient, item._id!)}
                    className={`text-red-600 text-sm mt-2 hover:underline transition ${
                      isLoding
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 💰 RIGHT SECTION - ORDER SUMMARY */}
          <div className="lg:w-[350px] bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-24 h-fit flex flex-col gap-4">
            <h3 className="text-xl font-semibold dark:text-gray-100">
              Order Summary
            </h3>
            <div className="flex justify-between text-gray-600 dark:text-gray-300">
              <span>Items:</span>
              <span>${cart.subtotal?.amount || "0.00"}</span>
            </div>
            <div className="flex justify-between text-gray-600 dark:text-gray-300">
              <span>Shipping:</span>
              <span>Free</span>
            </div>

            <hr className="my-2 border-gray-300 dark:border-gray-700" />
            <div className="flex justify-between font-bold text-lg dark:text-gray-100">
              <span>Total:</span>
              <span className="text-secound">
                ${cart.subtotal?.amount || "0.00"}
              </span>
            </div>
            <CheckoutButton cart={cartItems} show={false} />
          </div>
        </div>
      ) : cart?.lineItems?.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center">
          <p className="text-lg dark:text-gray-300">Your cart is empty</p>
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
