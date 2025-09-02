import CategoryList from "@/components/CategoryList";
import ProductList from "@/components/ProductList";
import Slider from "@/components/Slider";
import { WixClientContext } from "@/context/WixContext";
import { useWixClient } from "@/hooks/useWixClient";
import { wixClientServer } from "@/lib/WixClientServer";
import { Suspense, useContext, useEffect } from "react";
const HomePage = async () => {
  // const wixClient = useWixClient();

  // useEffect(() => {
  //   const getProducts = async () => {
  //     const res = await wixClient.products.queryProducts().find();
  //     console.log(res);
  //   };
  //   getProducts();
  // }, [wixClient]);

  // const wixClient = await wixClientServer();
  // const res = await wixClient.products.queryProducts().find();
  // console.log(res);
  return (
    <div className="">
      <Slider />
      <div className=" bg-white pt-24  px-4 md:px-8 lg:px-16  xl:px-32 2xl:px-64 ">
        <h1 className="text-xl">Featured Product</h1>
        <Suspense fallback={"loding"}>
          <ProductList
            categoryId={process.env.NEXT_PUBLIC_FEATURED_PRODUCTS_CATEGORY_ID!}
            limit={4}
          />
        </Suspense>
      </div>
      <div className="pt-24  bg-white ">
        <h1 className="text-xl  px-4 md:px-8 lg:px-16  xl:px-32 2xl:px-64 mb-12">
          Categories
        </h1>
        <Suspense fallback={"loding"}>
          <CategoryList />
        </Suspense>
      </div>
      <div className="pt-24  bg-white  px-4 md:px-8 lg:px-16  xl:px-32 2xl:px-64 ">
        <h1 className="text-xl">New Product</h1>
      </div>
      {/* <ProductList /> */}
    </div>
  );
};

export default HomePage;
