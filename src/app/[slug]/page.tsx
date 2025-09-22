import Add from "@/components/Add";
import CusomizeProducts from "@/components/CusomizeProducts";
import ProductsImages from "@/components/ProductsImages";
import { wixClientServer } from "@/lib/WixClientServer";
import { notFound } from "next/navigation";
const SinglePage = async ({ params }: { params: { slug: string } }) => {
  const wixClient = await wixClientServer();
  const products = await wixClient.products
    .queryProducts()
    .eq("slug", params.slug)
    .find();

  if (!products.items[0]) {
    return notFound();
  }
  const product = products.items[0];
  return (
    <div className="mt-28 pb-24 flex flex-col lg:flex-row gap-16 px-4 md:px-8 lg:px-16  xl:px-32 2xl:px-64 relative">
      {/* IMAGE */}
      <div className="w-full  lg:w-1/2 lg:sticky  top-20 h-max">
        <ProductsImages items={product.media?.items} />
      </div>
      {/* TEXTS */}
      <div className="lg:w-1/2  w-full flex flex-col gap-6 ">
        <h1 className="pb-1 bg-gradient-to-r from-green-600  to-blue-600  bg-clip-text text-transparent text-4xl font-medium">
          {product.name}
        </h1>
        <p className="text-gray-500 dark:text-gray-300 ">
          {product.description}
        </p>
        <div className="h-[2px] bg-gray-100 dark:bg-gray-600 " />
        {product.price?.discountedPrice === product.priceData?.price ? (
          <h2 className="font-normal text-2xl dark:text-gray-100">
            ${product.priceData?.price}
          </h2>
        ) : (
          <div className=" flex items-center gap-4">
            <h3 className=" text-xl dark:text-gray-100 line-through">
              ${product.priceData?.price}
            </h3>
            <h2 className="font-medium text-2xl dark:text-gray-100">
              ${product.priceData?.discountedPrice}
            </h2>
          </div>
        )}
        <div className="h-[2px] bg-gray-100 dark:bg-gray-600" />
        {product.variants && product.productOptions ? (
          <CusomizeProducts
            productId={product._id}
            variants={product.variants}
            productOption={product.productOptions}
          />
        ) : (
          <Add
            productId={product._id!}
            variantId="00000000-0000-0000-0000-000000000000"
            stockNumber={product.stock?.quantity || 0}
          />
        )}

        <div className="h-[2px] bg-gray-100 dark:bg-gray-600" />
        {product.additionalInfoSections?.map((section: any) => (
          <div className="text-sm dark:text-gray-300" key={section.title}>
            <h4 className="font-medium mb-4 ">{section.title}</h4>
            <p>{section.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SinglePage;
