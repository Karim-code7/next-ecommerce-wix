"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUI } from "@/context/UIContext";

const Slider = () => {
  const { gradiant } = useUI();
  const slides = [
    {
      id: 1,
      title: "Summer Sale Collections",
      description: "Sale! Up to 50% off!",
      src: "/fashion1.jpg",
      url: "/",
      bg: "dark:bg-gradient-to-r dark:from-gray-800 dark:to-dark bg-gradient-to-r from-pink-50 to-yellow-50",
    },
    {
      id: 2,
      title: "Winter Sale Collections",
      description: "Sale! Up to 50% off!",
      src: "/fashion2.jpg",
      url: "/",
      bg: "dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 bg-gradient-to-r from-pink-50 to-yellow-50",
    },
    {
      id: 3,
      title: "Spring Sale Collections",
      description: "Sale! Up to 50% off!",
      src: "/fashion3.jpg",
      url: "/",
      bg: "dark:bg-gradient-to-r dark:from-gray-800 dark:to-gray-900 bg-gradient-to-r from-pink-50 to-yellow-50",
    },
  ];

  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length, current]);

  return (
    <div className=" h-[calc(100vh-80px)] overflow-hidden">
      <div
        style={{ transform: `translateX(-${current * 100}vw)` }}
        className=" w-max h-full flex transition-all ease-in-out duration-1000"
      >
        {slides.map((slide, index) => (
          <div
            className={`${slide.bg} w-screen h-full flex flex-col gap-16 xl:flex-row `}
            key={slide.id}
          >
            {/* TEXT CONATINER */}
            <div className="h-1/2 xl:w-1/2  xl:h-full flex justify-center items-center gap-8 flex-col 2xl:gap:12 text-center ">
              <h2 className={`${gradiant} text-3xl font-poppins`}>
                {slide.description}
              </h2>
              <h2 className="text-5xl lg:text-6xl 2xl:text-8xl dark:text-gray-100  font-medium">
                {slide.title}
              </h2>
              <Link href={slide.url}>
                <button className="tracking-wider text-xl rounded-md bg-lama-green hover:bg-green-800 transition-all  text-gray-100 font-bold py-3 px-4  ">
                  {" "}
                  SHOP NOW
                </button>
              </Link>
            </div>
            {/* IMAGE CONATINER */}
            <div className=" h-1/2 xl:w-1/2  xl:h-full  relative ">
              <Image
                src={slide.src}
                alt=""
                fill
                sizes="100%"
                className="object-cover"
              ></Image>
            </div>
          </div>
        ))}
      </div>
      <div className=" absolute m-auto left-1/2 bottom-8 flex gap-4 ">
        {slides.map((slide, index) => (
          <div
            className={`w-3 h-3   rounded-full ring-1 ring-primary cursor-pointer flex items-center justify-center ${
              current === index ? "scale-150" : ""
            }`}
            key={slide.id}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className={` w-[6px] h-[6px] bg-primary rounded-full`}></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
