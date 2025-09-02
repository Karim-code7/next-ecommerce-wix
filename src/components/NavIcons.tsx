"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useContext, useRef } from "react";
import CartModal from "./CartModal";
import { useWixClient } from "@/hooks/useWixClient";
import Cookies from "js-cookie";
import { useCartStore } from "@/hooks/useCardStore";
import Profile from "./Profile";
import { UIContext } from "@/context/UIContext";
import { useUI } from "@/context/UIContext";

const Navicons = () => {
  const wixClient = useWixClient();
  const isLoggedIn = wixClient.auth.loggedIn();
  const router = useRouter();

  const {
    isCartOpen,
    isProfileOpen,
    handleProfileClick,
    handleCartOpen,
    profileRef,
    notificationRef,
    cartRef,
    setIsCartOpen,
    setIsProfileOpen,
  } = useUI();

  const handleLogout = async () => {
    if (isLoggedIn) {
      Cookies.remove("refreshToken");
      const { logoutUrl } = await wixClient.auth.logout(window.location.href);
      router.push(logoutUrl);
    } else {
      router.push("/login");
    }
    setIsCartOpen(false);
    setIsProfileOpen(false);
  };

  const { cart, counter, getCart } = useCartStore();

  const wixCalient = useWixClient();
  useEffect(() => {
    getCart(wixCalient);
  }, [wixCalient, getCart]);

  // const { logoutUrl } = await wixClient.auth.logout(window.location.href);

  // AUTH WUTH NEXT MANAGED AUTH
  // const wixClient = useWixClient();
  // const login = async () => {
  //   const loginRequestData = wixClient.auth.generateOAuthData(
  //     "http://localhost:3000" // Redirect URI
  //   );
  //   console.log(loginRequestData);
  //   localStorage.setItem("oAuthRedirectData", JSON.stringify(loginRequestData));
  //   const { authUrl } = await wixClient.auth.getAuthUrl(loginRequestData);
  //   window.location.href = authUrl;
  // };

  return (
    <div ref={profileRef} className="flex items-center xl:gap-6 gap-4 relative">
      <Image
        src="/profile.png"
        width={22}
        height={22}
        alt=""
        className="cursor-pointer"
        // onClick={login}
        onClick={handleProfileClick}
      />
      {isProfileOpen && (
        <div className="profile w-[320px] flex flex-col items-center absolute p-8 rounded-md bg-white top-12 right-14 text-sm shadow-[0_3px_10px_rgba(0,0,0,0.8)] z-20">
          <Profile />
          {isLoggedIn && (
            <Link
              className="bg-blue-600 w-full text-center rounded-md text-white py-2 "
              href="login"
            >
              My Profile
            </Link>
          )}
          <div
            className={`mt-2 cursor-pointer w-full text-center rounded-md text-white py-2 ${
              !isLoggedIn ? "bg-green-600" : "bg-red-600"
            }`}
            onClick={() => handleLogout()}
          >
            {isLoggedIn ? "Logout" : "Login"}
          </div>
        </div>
      )}

      <Image
        ref={notificationRef} // هنا notification لو هتعمله نافذة خاصة بيه
        src="/notification.png"
        width={22}
        height={22}
        alt=""
        className="cursor-pointer"
      />

      <div
        ref={cartRef}
        className="relative cursor-pointer"
        onClick={() => handleCartOpen()}
      >
        <Image src="/cart.png" width={22} height={22} alt="" />
        <div className="absolute -top-4 -right-4 rounded-full  w-6 h-6 text-white text-sm bg-lama z-20 flex justify-center items-center">
          {counter}
        </div>
      </div>
      {isCartOpen && <CartModal />}
    </div>
  );
};

export default Navicons;
