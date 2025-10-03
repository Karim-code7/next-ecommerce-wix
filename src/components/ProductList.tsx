import { wixClientServer } from "@/lib/WixClientServer";
import { products } from "@wix/stores";
import Image from "next/image";
import Link from "next/link";
import DOMPurify from "isomorphic-dompurify";
import Pagination from "./Pagination";
import StarRating from "./StarRating";
const PRODUCT_PER_PAGE = 4;
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

  const productQuery = wixClient.products
    .queryProducts()
    .startsWith("name", searchParams?.name || "")
    .eq("collectionIds", categoryId)
    .hasSome("productType", [searchParams?.type || "physical", "digital"])
    .gt("priceData.price", searchParams?.min || 0)
    .lt("priceData.price", searchParams?.max || 999999)
    .limit(limit || PRODUCT_PER_PAGE)
    .skip(
      searchParams?.page
        ? parseInt(searchParams.page) * (limit || PRODUCT_PER_PAGE)
        : 0
    );

  const res = await productQuery.find();
  searchParams?.sort
    ? res.items.sort((a, b) => {
        const [sortType, sortBy] = searchParams.sort.split(" ");
        const aPrice = a.priceData?.price || 0;
        const bPrice = b.priceData?.price || 0;
        if (sortType === "asc") return aPrice - bPrice;
        if (sortType === "desc") return bPrice - aPrice;
        return 0;
      })
    : res.items;
  return (
    <div className="     mt-12 flex gap-x-8  gap-y-16 justify-between flex-wrap">
      {res.items.map((product: products.Product) => (
        <div
          className=" w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
          key={product._id}
        >
          <Link href={"/" + product.slug!}>
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
            <div className="flex justify-between mt-3 ">
              <span className=" dark:text-gray-200   font-roboto">
                {product.name}
              </span>
              <span className="font-normal dark:text-gray-200 font-roboto   ">
                ${product.price?.price}
              </span>
            </div>
            {product.additionalInfoSections && (
              <div
                className="text-sm text-gray-500 font-roboto"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    product.additionalInfoSections.find(
                      (section: any) => section.title === "shortDesc"
                    )?.description || ""
                  ),
                }}
              ></div>
            )}
            <button className=" mt-4 font-roboto tracking-wide dark:text-gray-200 rounded-2xl ring-1 ring-TrendoGo py-2 px-4 text-sm hover:bg-TrendoGo   w-max m-auto  transition-all duration-300">
              {" "}
              Add my Cart
            </button>
          </Link>
          <StarRating />
        </div>
      ))}
      {searchParams?.cat || searchParams?.name ? (
        <Pagination
          currentPage={res.currentPage || 0}
          hasprev={res.hasPrev()}
          hasnext={res.hasNext()}
          searchParams={searchParams}
        />
      ) : null}
    </div>
  );
};

export default ProductList;
