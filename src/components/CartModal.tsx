"use client";

import Image from "next/image";

const CartModal = () => {
  const cartItems = true;

  return (
    <div className="absolute top-12 right-0  p-4 rounded-md   shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white flex flex-col gap-6 z-20">
      {!cartItems ? (
        <div className=""> Your cart is empty</div>
      ) : (
        <>
          <h2 className=" text-xl">Shopping Cart</h2>
          {/* // LIST */}
          <div className="flex flex-col gap-8">
            {/* ITEMS */}
            <div className="flex gap-4 w-full">
              {" "}
              <Image
                src={
                  "https://images.pexels.com/photos/32751828/pexels-photo-32751828.jpeg"
                }
                alt=""
                width={72}
                height={96}
                className="rounded-md object-cover"
              />
              <div className="flex justify-between flex-col w-full">
                {/* TOP */}
                <div className="">
                  {/* TITLE */}
                  <div className=" flex items-center justify-between gap-8">
                    <h3 className="font-semibold">Product Name</h3>
                    <div className="p-1 bg-gray-50">$49</div>
                  </div>
                  {/* DESCRIPTION */}
                  <div className="text-sm text-gray-500">availaple</div>
                </div>
                {/* BOTTOM */}
                <div className="flex justify-between text-sm ">
                  <span className="text-gray-500"> Qty. 2</span>
                  <span className="text-red-600"> Remove</span>
                </div>
              </div>
            </div>
            <div className="flex gap-4  w-full">
              {" "}
              <Image
                src={
                  "https://images.pexels.com/photos/32751828/pexels-photo-32751828.jpeg"
                }
                alt=""
                width={72}
                height={96}
                className="rounded-md object-cover"
              />
              <div className="flex justify-between flex-col w-full ">
                {/* TOP */}
                <div className="">
                  {/* TITLE */}
                  <div className=" flex items-center justify-between gap-8">
                    <h3 className="font-semibold">Product Name</h3>
                    <div className="p-1 bg-gray-50">$49</div>
                  </div>
                  <div className="text-sm text-gray-500">availaple</div>
                </div>
                {/* DESCRIPTION */}
                {/* BOTTOM */}
                <div className="flex justify-between text-sm ">
                  <span className="text-gray-500"> Qty. 2</span>
                  <span className="text-red-600"> Remove</span>
                </div>
              </div>
            </div>
          </div>
          {/* BOTTOM */}
          <div className="flex items-center justify-between font-semibold flex-col">
            <div className="flex w-full justify-between">
              <span className="font-bold">Subtotal</span>
              <span className="">49$</span>
            </div>
            <p className=" text-gray-500 text-sm mt-2 mb-4 w-max ">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="flex justify-between text-sm w-full">
              <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">
                View Cart
              </button>
              <button className="bg-black text-white rounded-md py-3 px-4 ">
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;
