"use client";
import Image from "next/image";
import { useState } from "react";

const ProductsImages = ({ items }: { items: any }) => {
  const [index, setIndex] = useState(0);
  return (
    <div className=" flex items-center justify-center  flex-col h-full">
      <div className="  h-[380px] w-[380px]  lg:h-[500px] lg:w-[500px]   relative">
        <Image
          src={items[index].image?.url}
          alt=""
          fill
          className="object-contain rounded-md "
          sizes="50vw"
        />
      </div>
      <div className=" flex justify-between gap-4 mt-8 w-full">
        {items.map((item: any, i: number) => (
          <div key={i} className="w-1/4 h-32 relative gap-4 mt-8 ">
            <Image
              key={item._id}
              src={item.image?.url}
              alt=""
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
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
