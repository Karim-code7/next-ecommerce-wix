"use client";
import { create } from "zustand";
import { WixClient } from "@/context/WixContext";
import { members } from "@wix/members";

type ProfileState = {
  member: any;
  email: string | null;
  isLoading: boolean;
  fetchMember: (wixClient: WixClient, isLoggedIn: boolean) => Promise<void>;
};

export const useProfileStore = create<ProfileState>((set) => ({
  member: null,
  email: null,
  isLoading: false,

  fetchMember: async (wixClient, isLoggedIn) => {
    set({ isLoading: true });
    try {
      if (!isLoggedIn) {
        set({ member: null, email: null, isLoading: false });
        return;
      }

      const res = await wixClient.members.getCurrentMember({
        fieldsets: [members.Set.FULL],
      });
      set({
        member: res.member,
        email: res.member?.loginEmail,
        isLoading: false,
      });
    } catch (err) {
      console.error("Failed to fetch member:", err);
      set({ member: null, email: null, isLoading: false });
    }
  },
}));
