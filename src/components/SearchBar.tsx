"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const SerachBar = () => {
  const router = useRouter();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    let name = formData.get("name") as string;
    if (name) {
      name = name.replace(/[\u200E\u200F\u202A-\u202E]/g, ""); // يحذف الرموز الخفية

      router.push("/list?name=" + name);
    }
  };

  return (
    <form
      className="flex items-center justify-between gap-2 bg-gray-100 p-2 rounded-2xl flex-1"
      onSubmit={handleSearch}
    >
      <input
        className="rounded-xl p-1 flex-1 bg-transparent outline-none text-sm"
        name="name"
        type="text"
        placeholder="Search"
      />
      <button className="cursor-pointer">
        <Image src="/search.png" alt="" width={18} height={18} />
      </button>
    </form>
  );
};

export default SerachBar;
