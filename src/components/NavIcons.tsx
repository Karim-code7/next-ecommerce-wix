"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import CartModal from "./CartModal";
import { useWixClient } from "@/hooks/useWixClient";
import Cookies from "js-cookie";
import { useCartStore } from "@/hooks/useCardStore";
import Profile from "./Profile";
import { useUI } from "@/context/UIContext";
import Notification from "./Notification";
import { FaRegBell } from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { HiSun, HiMoon } from "react-icons/hi";
import { useTheme } from "../context/ThemeContext";

const Navicons = () => {
  const wixClient = useWixClient();
  const isLoggedIn = wixClient.auth.loggedIn();
  const router = useRouter();
  const { isDark, toggleTheme } = useTheme();

  const {
    isCartOpen,
    isProfileOpen,
    profileRef,
    notificationRef,
    isNotificationOpen,
    cartRef,
    setIsCartOpen,
    setIsProfileOpen,
    handleProfileClick,
    handleCartOpen,
    handleNotificationOpen,
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

  const { counter, getCart } = useCartStore();

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
    <div
      ref={profileRef}
      className=" flex items-center xl:gap-6 gap-4 relative"
    >
      <div
        className="rounded-full p-1 hover:bg-gray-200 transition"
        onClick={handleProfileClick}
      >
        <CgProfile className="cursor-pointer w-7 h-7 text-primary  " />
      </div>
      {isProfileOpen && (
        <div className="profile w-[320px] flex flex-col items-center absolute p-8 rounded-md  bg-white dark:bg-slate-800 top-12 right-14 text-sm shadow-[0_3px_10px_rgba(0,0,0,0.8)] z-20">
          <Profile />

          {isLoggedIn && (
            <Link
              className="bg-blue-600 w-full text-center rounded-md text-gray-100 py-2 "
              href="profile"
            >
              My Profile
            </Link>
          )}
          <div
            className={`mt-2 cursor-pointer w-full text-center rounded-md text-gray-100  py-2 ${
              !isLoggedIn ? "bg-green-600" : "bg-red-600"
            }`}
            onClick={() => handleLogout()}
          >
            {isLoggedIn ? "Logout" : "Login"}
          </div>
        </div>
      )}

      <div
        ref={notificationRef}
        className="relative  hover:bg-gray-200 rounded-full p-1 transition "
        onClick={() => handleNotificationOpen()}
      >
        <FaRegBell className="cursor-pointer w-6 h-6  text-primary " />
      </div>
      {isNotificationOpen && <Notification />}

      <div
        ref={cartRef}
        className=" cursor-pointer rounded-full p-1 hover:bg-gray-200 transition"
        onClick={() => handleCartOpen()}
      >
        <div className="relative">
          <LuShoppingCart className="  cursor-pointer w-7 h-7 text-primary  " />
          <div className="absolute -top-3 -right-2 rounded-full  w-4 h-4 text-gray-100 text-sm bg-lama z-20 flex justify-center items-center">
            {counter}
          </div>
        </div>
      </div>
      {isCartOpen && <CartModal />}

      <div
        className="  cursor-pointer rounded-full p-1 hover:bg-gray-200 transition text-primary"
        onClick={toggleTheme}
      >
        {isDark ? (
          <HiSun className="w-7 h-7 " />
        ) : (
          <HiMoon className="w-7 h-7 " />
        )}
      </div>
    </div>
  );
};

export default Navicons;
