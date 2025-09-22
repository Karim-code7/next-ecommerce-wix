"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Menu = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Image
        src="/menu.png"
        alt=""
        width={28}
        height={28}
        className="cursor-pointer"
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div className="absolute top-20 left-0 w-full text-center bg-neutral-700 shadow-lg rounded-lg p-4 z-40">
          <ul className="flex flex-col items-center gap-8 text-white dark:text-gray-100 text-lg z-10  ">
            <Link href="/" className=" hover:text-green-600 w-fit ">
              Home
            </Link>

            <Link href="/shop" className=" hover:text-green-600  w-fit">
              Shop
            </Link>

            <Link href="/deals" className="0 hover:text-green-600  w-fit">
              Deals
            </Link>

            <Link href="/about" className=" hover:text-green-600  w-fit">
              About
            </Link>
            <Link href="/contact" className=" hover:text-green-600  w-fit">
              Contact
            </Link>
            <Link href="/logout" className=" hover:text-green-600  w-fit">
              Logout
            </Link>
            <Link href="/cart" className=" hover:text-green-600  w-fit">
              Cart(1)
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Menu;
