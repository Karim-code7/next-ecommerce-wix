"use client";

import { usePathname, useRouter } from "next/navigation";

const Pagination = ({
  currentPage,
  hasprev,
  hasnext,
  searchParams,
}: {
  currentPage: number;
  hasprev: boolean;
  hasnext: boolean;
  searchParams: any;
}) => {
  const pathName = usePathname();
  const { replace } = useRouter();
  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    replace(`${pathName}?${params.toString()}`);
  };
  const style =
    "disabled:text-gray-900 font-poppins rounded-md bg-secound hover:bg-green-700 transition duration-300 text-gray-200 p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-green-200";
  return (
    <div className=" mt-12 flex justify-between w-full">
      <button
        className={style}
        disabled={!hasprev}
        onClick={() => createPageUrl(currentPage - 1)}
      >
        Previos
      </button>
      <button
        className={style}
        disabled={!hasnext}
        onClick={() => createPageUrl(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
