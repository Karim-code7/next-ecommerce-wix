import Filter from "@/components/Filter";
import ProductList from "@/components/ProductList";
import { wixClientServer } from "@/lib/WixClientServer";
import Image from "next/image";
import { Suspense } from "react";

const ListPage = async ({ searchParams }: { searchParams: any }) => {
  const wixClient = await wixClientServer();
  const category = await wixClient.collections.getCollectionBySlug(
    searchParams.cat || "all-products"
  );
  return (
    <div className=" mt-24  px-4 md:px-8 lg:px-16  xl:px-32 2xl:px-64 relative pb-24 ">
      {/* CAMPAIGN */}
      <div className=" hidden bg-pink-50 px-4 sm:flex justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className=" text-4xl font-medium leading-[48px] text-gray-700 font-poppins">
            Grap up to 50% off on <br /> selected Products
          </h1>
          <button className=" font-pop rounded-3xl bg-lama text-white dark:text-gray-100 w-max py-3 px-5 text-sm ">
            Buy Now
          </button>
        </div>
        <div className="relative w-1/3  aspect-[3/4] ">
          <Image
            src="/woman.png"
            alt=""
            fill
            className="object-contain"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </div>
      </div>
      {/* FILTER */}
      <Filter searchParams={searchParams} />
      {/* PRODUCTS */}
      <h1 className="mt-12 text-2xl bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent font-poppins font-medium ">
        {category.collection?.name} For You
      </h1>
      <Suspense fallback={"loding..."}>
        <ProductList
          categoryId={
            category.collection?._id || "00000000-000000-000000-000000000001"
          }
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  );
};

export default ListPage;
