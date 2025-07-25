import { wixClientServer } from "@/lib/WixClientServer";
import { products } from "@wix/stores";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
const PRODUCT_PER_PAGE = 20;
const ProductList = async ({
  categoryId,
  limit,
  searchParams,
}: {
  categoryId: string;
  limit?: number;
  searchParams?: any;
}) => {
  const wixClient = await wixClientServer();
  let res;
  if (categoryId) {
    res = await wixClient.products
      .queryProducts()
      .eq("collectionIds", categoryId)
      .limit(limit || PRODUCT_PER_PAGE)
      .find();
  } else {
    res = await wixClient.products
      .queryProducts()
      .limit(limit || PRODUCT_PER_PAGE)
      .find();
  }
  return (
    <div className=" mt-12 flex gap-x-8  gap-y-16 justify-between flex-wrap">
      {res.items.map((product: products.Product) => (
        <Link
          key={product._id}
          href={"/" + product.slug!}
          className=" w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
        >
          <div className=" relative w-full h-80">
            <Image
              src={product.media?.mainMedia?.image?.url || "/product.png"}
              alt=""
              fill
              sizes="25vw"
              className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-all easy duration-500"
            />
            {product.media?.items && (
              <Image
                src={product.media?.items[1].image?.url || "/product.png"}
                alt=""
                fill
                sizes="25vw"
              />
            )}
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{product.name}</span>
            <span className="font-semibold">${product.price?.price}</span>
          </div>
          {product.additionalInfoSections && (
            <div
              className="text-sm text-gray-500"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  product.additionalInfoSections.find(
                    (section: any) => section.title === "shortDesc"
                  )?.description || ""
                ),
              }}
            ></div>
          )}
          <button className=" rounded-2xl ring-1 ring-lama py-2 px-4 text-sm hover:bg-lama hover:text-white  w-max m-auto  transition-all duration-300">
            {" "}
            Add my Cart
          </button>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
