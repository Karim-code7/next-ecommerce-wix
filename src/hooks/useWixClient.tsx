"use client";

import { WixClientContext } from "@/context/WixContext";
import { useContext } from "react";

export const useWixClient = () => {
  const wixClient = useContext(WixClientContext);

  const isLoggedIn = wixClient.auth.loggedIn();

  return { wixClient, isLoggedIn };
};
