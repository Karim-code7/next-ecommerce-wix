"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Confetti from "react-confetti";
import { Suspense } from "react";

const SuccessContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderId = searchParams.get("orderId");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (orderId) {
        router.push("/orders/order?id=" + orderId);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [orderId, router]);

  return (
    <div className="flex flex-col gap-6 items-center justify-center h-[calc(100vh-180px)] font-poppins">
      <Confetti width={2000} height={1000} />
      <h1 className="text-6xl text-green-700">Successful</h1>
      <h2 className="text-xl font-medium text-green-700">
        We sent the invoice to your e-mail
      </h2>
      <h3 className="dark:text-gray-300 text-gray-600">
        You are being redirected to the order page...
      </h3>
    </div>
  );
};

const SuccessPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
};

export default SuccessPage;
