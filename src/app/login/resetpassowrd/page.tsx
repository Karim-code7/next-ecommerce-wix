"use client";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function ResetPasswordSuccess() {
  const router = useRouter();
  return (
    <div className="flex h-[calc(100vh-80px)] items-center justify-center bg-gray-200">
      <div className=" flex justify-center items-center flex-col bg-white p-12 rounded-2xl shadow-md text-center">
        <Image
          className=""
          src={"/checked.png"}
          alt=""
          width={120}
          height={120}
        />
        <h1 className="text-2xl font-bold text-green-600 mb-3 mt-8">
          Password changed Successfuliy
        </h1>
        <p className="text-gray-500">
          please login to your eamil account login
        </p>

        <button
          className="mt-14 bg-blue-600 w-full p-3 rounded-md text-sm text-white"
          onClick={() => router.push("/login")}
        >
          Login in now
        </button>
      </div>
    </div>
  );
}
