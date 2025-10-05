"use client";

import { useCartStore } from "@/hooks/useCardStore";
import Image from "next/image";
import { media as wixMedia } from "@wix/sdk";
import { useWixClient } from "@/hooks/useWixClient";
import CheckoutButton from "./CheckoutButton";
import { useUI } from "@/context/UIContext";

const CartModal = () => {
  const { cart, isLoding, removeItem, counter } = useCartStore();
  const { gradiant } = useUI();

  const { wixClient } = useWixClient();
  const cartItems =
    cart.lineItems?.map((item: any) => ({
      name: item.productName,
      price: item.price.amount,
      quantity: item.quantity,
      _id: item._id,
      buyerId: cart.buyerInfo?.contactId || "",
    })) || [];
  console.log(cartItems);
  return (
    <div className="absolute  top-12 right-0 p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white dark:bg-slate-800 flex flex-col gap-6 z-20">
      {!cart.lineItems?.length ? (
        <div className="w-36">Your cart is empty</div>
      ) : (
        <>
          <div className="flex justify-between items-center gap-1">
            <h2 className={` text-2xl ${gradiant}`}>Shopping Cart</h2>
            <p className="bg-gray-200 rounded-xl p-1 text-sm text-gray-600  font-roboto font-normal">
              {counter} items
            </p>
          </div>

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
                      <h2 className="font-roboto font-normal dark:text-gray-100 ">
                        {item.productName?.original}
                      </h2>
                      <div className="p-1  rounded-sm flex items-center gap-2">
                        {item.quantity && item.quantity > 1 && (
                          <div className="text-xs text-green-500 ">
                            {item.quantity} x{" "}
                          </div>
                        )}
                        <p className="dark:text-gray-100   font-roboto font-normal">
                          ${item.price?.amount}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-green-500 font-roboto">
                      {item.availability?.status}
                    </div>
                  </div>
                  {/* BOTTOM */}
                  <div className="flex justify-between text-sm">
                    <span className="dark:text-gray-100 text-gray-600  font-roboto font-normal">
                      {" "}
                      Qty {item.quantity}
                    </span>
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
              <span className="font-roboto font-normal dark:text-gray-100">
                Subtotal
              </span>
              <span className="dark:text-gray-100   font-roboto font-normal">
                ${cart.subtotal?.amount}
              </span>
            </div>
            <p className=" text-gray-500 text-sm mt-2 mb-4 w-max ">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="text-sm w-full">
              <CheckoutButton show={true} cart={cartItems} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
