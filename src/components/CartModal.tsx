"use client";

import { useCartStore } from "@/hooks/useCardStore";
import Image from "next/image";
import { media as wixMedia } from "@wix/sdk";
import { useWixClient } from "@/hooks/useWixClient";
import CheckoutButton from "./CheckoutButton";

const CartModal = () => {
  const { cart, isLoding, removeItem } = useCartStore();
  const wixClient = useWixClient();
  const cartItems =
    cart.lineItems?.map((item: any) => ({
      name: item.productName,
      price: item.price.amount,
      quantity: item.quantity,
      _id: item._id,
    })) || [];
  return (
    <div className="absolute top-12 right-0 p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white flex flex-col gap-6 z-20">
      {!cart.lineItems?.length ? (
        <div className="w-36">Your cart is empty</div>
      ) : (
        <>
          <h2 className=" text-xl">Shopping Cart</h2>

          {/* LIST */}
          <div className="flex flex-col gap-8">
            {cart.lineItems?.map((item) => (
              <div className="flex gap-4 w-full" key={item._id}>
                {item.image && (
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
                )}
                <div className="flex justify-between flex-col w-full">
                  {/* TOP */}
                  <div>
                    <div className=" flex items-center justify-between gap-8">
                      <h3 className="font-semibold">
                        {item.productName?.original}
                      </h3>
                      <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                        {item.quantity && item.quantity > 1 && (
                          <div className="text-xs text-green-500">
                            {item.quantity} x{" "}
                          </div>
                        )}
                        ${item.price?.amount}
                      </div>
                    </div>
                    <div className="text-sm text-gray-500">
                      {item.availability?.status}
                    </div>
                  </div>
                  {/* BOTTOM */}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500"> Qty {item.quantity}</span>
                    <span
                      className="text-red-600 cursor-pointer"
                      style={{ cursor: isLoding ? "not-allowed" : "pointer" }}
                      onClick={() => removeItem(wixClient, item._id!)}
                    >
                      Remove
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* BOTTOM */}
          <div className="flex items-center justify-between font-semibold flex-col">
            <div className="flex w-full justify-between">
              <span className="font-bold">Subtotal</span>
              <span>${cart.subtotal.amount}</span>
            </div>
            <p className=" text-gray-500 text-sm mt-2 mb-4 w-max ">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="flex justify-between text-sm w-full">
              <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">
                View Cart
              </button>

              <CheckoutButton cart={cartItems} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
