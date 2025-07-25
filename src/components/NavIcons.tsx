"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CartModal from "./CartModal";

const Navicons = () => {
  const router = useRouter();
  const isLoggedIn = false;
  const handleProfileClick = () => {
    if (isLoggedIn) {
      router.push("/login");
    }
    setIsProfileOpen(!isProfileOpen);
  };

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  return (
    <div className="flex items-center xl:gap-6 gap-4 relative">
      <Image
        src="/profile.png"
        width={22}
        height={22}
        alt=""
        className="cursor-pointer"
        onClick={handleProfileClick}
      />
      {isProfileOpen && (
        <div className="absolute p-4 rounded-md top-12 l-0 text-sm shadow-[0_3px_10px_rgba(0,0,0,0.2)] z-20 ">
          <Link href="/">Profile</Link>
          <div className="mt-2 cursor-pointer">Logout</div>
        </div>
      )}
      <Image
        src="/notification.png"
        width={22}
        height={22}
        alt=""
        className="cursor-pointer"
      />
      <div
        className="relative cursor-pointer "
        onClick={() => setIsCartOpen((prev) => !prev)}
      >
        <Image src="/cart.png" width={22} height={22} alt="" />
        <div className="absolute -top-4 -right-4 rounded-full  w-6 h-6 text-white text-sm bg-lama   z-20 flex justify-center items-center  ">
          2
        </div>
      </div>
      {isCartOpen && <CartModal />}
    </div>
  );
};

export default Navicons;
