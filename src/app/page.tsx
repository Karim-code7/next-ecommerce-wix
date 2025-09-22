import CategoryList from "@/components/CategoryList";
import ProductList from "@/components/ProductList";
import Slider from "@/components/Slider";
import { Suspense } from "react";

const sectionWrapper =
  "pt-24 pb-10 border-t border-gray-300 dark:border-gray-700 ";

const container = "px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64";

const headingBase = "font-poppins font-medium text-xl lg:text-3xl 2xl:text-5xl";

const gradiant =
  " bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent";

const HomePage = async () => {
  return (
    <div className=" font-mono  font-medium   ">
      {/* Hero / Slider */}
      <Slider />

      {/* Featured Products */}
      <div className={`${sectionWrapper} ${container}`}>
        <h1
          className={`${headingBase} 
            ${gradiant}
            `}
        >
          Featured Product
        </h1>
        <Suspense fallback={"loading..."}>
          <ProductList
            categoryId={process.env.NEXT_PUBLIC_FEATURED_PRODUCTS_CATEGORY_ID!}
            limit={4}
          />
        </Suspense>
      </div>

      {/* Categories */}
      <div className={sectionWrapper}>
        <h1
          className={`${headingBase} 
            ${container} pb-12
            ${gradiant}`}
        >
          Categories
        </h1>
        <Suspense fallback={"loading..."}>
          <CategoryList />
        </Suspense>
      </div>

      {/* New Products */}
      <div className={`${sectionWrapper} ${container}`}>
        <h1 className={`${headingBase} ${gradiant}`}>New Product</h1>
        <div className="mt-8">
          <ProductList
            categoryId={"00000000-000000-000000-000000000001"}
            limit={8}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
