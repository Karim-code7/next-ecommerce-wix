"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CartModal from "./CartModal";
import { useWixClient } from "@/hooks/useWixClient";
import Cookies from "js-cookie";

const Navicons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoding, setIsLoding] = useState(false);

  const wixClient = useWixClient();
  const isLoggedIn = wixClient.auth.loggedIn();
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn]);

  const handleProfileClick = () => {
    if (isLoggedIn) {
      setIsProfileOpen(!isProfileOpen);
    }
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = async () => {
    setIsLoding(true);
    Cookies.remove("refreshToken");
    const { logoutUrl } = await wixClient.auth.logout(window.location.href);
    setIsLoding(false);

    router.push(logoutUrl);
  };

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
    <div className="flex items-center xl:gap-6 gap-4 relative">
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
        <div className="absolute p-4 rounded-md bg-white top-12 l-0 text-sm shadow-[0_3px_10px_rgba(0,0,0,0.2)] z-20 ">
          <Link href="login">Profile</Link>
          <div className="mt-2 cursor-pointer" onClick={() => handleLogout()}>
            {isLoggedIn ? "Logout" : "Login"}
          </div>
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
