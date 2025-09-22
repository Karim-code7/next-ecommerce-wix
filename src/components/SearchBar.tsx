"use client";

import { useWixClient } from "@/hooks/useWixClient";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { IoIosSearch } from "react-icons/io";
import { useCartStore } from "@/hooks/useCardStore";

const SerachBar = () => {
  const wixClient = useWixClient();

  const { getCart } = useCartStore();

  useEffect(() => {
    if (wixClient) {
      getCart(wixClient);
    }
  }, [wixClient, getCart]);

  const router = useRouter();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    let name = formData.get("name") as string;
    if (name) {
      name = name.replace(/[\u200E\u200F\u202A-\u202E]/g, "");

      router.push("/list?name=" + name);
    }
  };

  return (
    <form
      className="flex items-center justify-between gap-2  bg-gray-200 dark:bg-gray-300 text-gray-800   p-2 rounded-2xl flex-1"
      onSubmit={handleSearch}
    >
      <input
        className="rounded-xl p-1 flex-1 bg-transparent outline-none text-sm"
        name="name"
        type="text"
        placeholder="Search"
      />
      <button className="cursor-pointer">
        <IoIosSearch className="w-6 h-6 text-[#464747]" />
      </button>
    </form>
  );
};

export default SerachBar;
