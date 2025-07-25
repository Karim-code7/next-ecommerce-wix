"use client";
import Image from "next/image";
import { useState } from "react";

const ProductsImages = ({ items }: { items: any }) => {
  const [index, setIndex] = useState(0);
  return (
    <div className="">
      <div className="h-[500px] w-[500px]  relative">
        <Image
          src={items[index].image?.url}
          alt=""
          fill
          sizes="50vw"
          className="object-contain rounded-md "
        />
      </div>
      <div className=" flex justify-between gap-4 mt-8">
        {items.map((item: any, i: number) => (
          <div key={i} className="w-1/4 h-32 relative gap-4 mt-8 ">
            <Image
              key={item._id}
              src={item.image?.url}
              alt=""
              fill
              className={`object-cover rounded-md cursor-pointer `}
              onClick={() => setIndex(i)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsImages;
