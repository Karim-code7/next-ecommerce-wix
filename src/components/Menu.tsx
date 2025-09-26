"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Cookies from "js-cookie";
import { useWixClient } from "@/hooks/useWixClient";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/hooks/useCardStore";

const Menu = () => {
  const wixClient = useWixClient();
  const { counter } = useCartStore();
  const router = useRouter();
  const isLoggedIn = wixClient.auth.loggedIn();

  const handleLogout = async () => {
    if (isLoggedIn) {
      Cookies.remove("refreshToken");
      const { logoutUrl } = await wixClient.auth.logout(window.location.href);
      router.push(logoutUrl);
    } else {
      router.push("/login");
    }
  };

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

            <Link href="/list" className=" hover:text-green-600  w-fit">
              Shop
            </Link>

            <Link href="/" className="0 hover:text-green-600  w-fit">
              Deals
            </Link>

            <Link href="/" className=" hover:text-green-600  w-fit">
              About
            </Link>
            <Link href="/" className=" hover:text-green-600  w-fit">
              Contact
            </Link>
            <div
              onClick={() => handleLogout()}
              className=" hover:text-green-600  w-fit cursor-pointer"
            >
              {isLoggedIn ? "Logout" : "Login"}
            </div>
            <Link href="/viewcard" className=" hover:text-green-600  w-fit">
              Cart ({counter})
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Menu;
