"use client";
import { useCartStore } from "@/hooks/useCardStore";
import { useWixClient } from "@/hooks/useWixClient";
import { useEffect, useState } from "react";

const Add = ({
  productId,
  variantId,
  stockNumber,
}: {
  productId: string | undefined;
  variantId: string | undefined;
  stockNumber: number | undefined;
}) => {
  // const stock = 4;
  const [quantity, setQuantity] = useState(0);
  const saveStock = stockNumber ?? 0;
  useEffect(() => {
    if (saveStock === 0) {
      setQuantity(0);
    } else {
      setQuantity(1);
    }
  }, [saveStock]);

  const wixClient = useWixClient();
  const { addItem } = useCartStore();

  const handleQuantityChange = (operation: "increase" | "decrease") => {
    setQuantity((prevQuantity) => {
      if (operation === "increase" && prevQuantity < saveStock) {
        return prevQuantity + 1;
      } else if (operation === "decrease" && prevQuantity > 1) {
        return prevQuantity - 1;
      }
      return prevQuantity;
    });
  };
  const canDecrease = quantity > 1;
  const canIncrease = quantity < saveStock;
  return (
    <div className=" flex flex-col gap-4">
      <h4 className="font-medium"> Chose a Quantity</h4>
      <div className=" flex  justify-between ">
        <div className="flex items-center gap-4">
          <div className=" bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
            <button
              onClick={() => canDecrease && handleQuantityChange("decrease")}
              className={`text-xl ${
                canDecrease
                  ? "cursor-pointer"
                  : "cursor-not-allowed text-gray-300"
              }`}
            >
              -
            </button>

            <span>{quantity}</span>

            <button
              onClick={() => canIncrease && handleQuantityChange("increase")}
              className={`text-xl ${
                canIncrease
                  ? "cursor-pointer"
                  : "cursor-not-allowed text-gray-300"
              }`}
            >
              +
            </button>
          </div>
          {saveStock < 1 ? (
            <div className="text-xs">Product is out of stock</div>
          ) : (
            <div className="text-xs">
              Only <span className="text-orange-500"> {saveStock} items</span>{" "}
              left! <br />
              {"Dont't"} miss it
            </div>
          )}
        </div>
        <button
          onClick={() => addItem(wixClient, productId!, variantId!, quantity)}
          className="w-36 text-sm rounded-3xl ring-1 ring-lama text-lama py-2 px-4 hover:bg-lama hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:text-white disabled:ring-none"
        >
          {" "}
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Add;
