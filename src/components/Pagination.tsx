"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

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
  const searchParamss = useSearchParams();
  const { replace } = useRouter();
  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    replace(`${pathName}?${params.toString()}`);
  };

  return (
    <div className=" mt-12 flex justify-between w-full">
      <button
        className="rounded-md bg-lama text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200"
        disabled={!hasprev}
        onClick={() => createPageUrl(currentPage - 1)}
      >
        Previos
      </button>
      <button
        className="rounded-md bg-lama text-white p-2 text-sm w-24 cursor-pointer disabled:cursor-not-allowed disabled:bg-pink-200"
        disabled={!hasnext}
        onClick={() => createPageUrl(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
