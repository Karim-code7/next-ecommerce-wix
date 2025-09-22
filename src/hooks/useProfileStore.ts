"use client";
import { create } from "zustand";
import { WixClient } from "@/context/WixContext";

type ProfileState = {
  member: any;
  email: string | null;
  isLoading: boolean;
  fetchMember: (wixClient: WixClient) => Promise<void>;
};

export const useProfileStore = create<ProfileState>((set) => ({
  member: null,
  email: null,
  isLoading: false,

  fetchMember: async (wixClient) => {
    set({ isLoading: true });
    try {
      const isLoggedIn = wixClient.auth.loggedIn();
      if (!isLoggedIn) {
        set({ member: null, email: null, isLoading: false });
        return;
      }

      const res = await wixClient.members.getCurrentMember();
      set({
        member: res.member,
        email: res.member?.profile?.slug?.slice(0, -5) || null,
        isLoading: false,
      });
    } catch (err) {
      console.error("Failed to fetch member:", err);
      set({ member: null, email: null, isLoading: false });
    }
  },
}));
