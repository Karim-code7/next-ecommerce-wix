"use client";
import { products } from "@wix/stores";
import { useEffect, useState } from "react";
import Add from "./Add";

const CusomizeProducts = ({
  productId,
  variants,
  productOption,
}: {
  productId: string | undefined;

  variants: products.Variant[];
  productOption: products.ProductOption[];
}) => {
  const [selctedOption, SetselctedOption] = useState<{ [key: string]: string }>(
    {}
  );
  const handleOptionChange = (optionType: string, choice: string) => {
    SetselctedOption((prev) => ({ ...prev, [optionType]: choice }));
  };
  const [selctedVarint, SetselctedVarint] = useState<products.Variant>();
  useEffect(() => {
    const varint = variants.find((v) => {
      const varintChoices = v.choices;
      if (
        Object.keys(selctedOption).length !== Object.keys(varintChoices!).length
      )
        return false;

      if (!varintChoices) return false;
      return Object.entries(selctedOption).every(
        ([key, value]) => varintChoices[key] === value
      );
    });
    SetselctedVarint(varint);
  }, [variants, selctedOption]);

  const isVariantInStock = (choices: { [key: string]: string }) => {
    return variants.some((variant) => {
      const variantChoices = variant.choices;
      if (!variantChoices) return false;
      return (
        Object.entries(choices).every(
          ([key, value]) => variantChoices[key] === value
        ) &&
        variant.stock?.quantity &&
        variant.stock.quantity > 0
      );
    });
  };
  return (
    <div className="   flex flex-col gap-6">
      {productOption.map((option) => (
        <div className=" flex flex-col gap-4" key={option.name}>
          <h4 className="font-medium dark:text-gray-200 text-2xl">
            {" "}
            Chose a {option.name}
          </h4>
          <ul className=" flex items-center gap-3">
            {option.choices?.map((choice, i) => {
              const disabled = !isVariantInStock({
                ...selctedOption,
                [option.name!]: choice.description!,
              });
              const selcted =
                selctedOption[option.name!] === choice.description;
              const clickHandler = disabled
                ? undefined
                : () => handleOptionChange(option.name!, choice.description!);
              return option.name === "Color" ? (
                <li
                  key={i}
                  className="w-8 h-8 rounded-full ring-1 ring-gray-300  relative "
                  style={{
                    backgroundColor: choice.value,
                    cursor: disabled ? "not-allowed" : "pointer",
                  }}
                  onClick={clickHandler}
                >
                  {selcted && (
                    <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                  )}
                  {disabled && (
                    <div className="absolute w-10 h-[2px] bg-red-400  rotate-45  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 " />
                  )}
                </li>
              ) : (
                <li
                  key={i}
                  className={` ring-1 ring-TrendoGo rounded-md   text-TrendoGo py-1 px-4 text-sm font-poppins   `}
                  style={{
                    cursor: disabled ? "not-allowed" : "pointer",
                    backgroundColor: selcted
                      ? "#f35c7a"
                      : disabled
                      ? "#FBCFEB"
                      : "white",
                    color: selcted
                      ? "#e5e7eb"
                      : disabled
                      ? "#111827"
                      : "#f35c7a",
                    boxShadow: disabled ? "none" : "",
                  }}
                  onClick={clickHandler}
                >
                  {choice.description}
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <Add
        productId={productId}
        variantId={selctedVarint?._id || "00000000-0000-0000-0000-000000000000"}
        stockNumber={selctedVarint?.stock?.quantity || 0}
      />
    </div>
  );
};

export default CusomizeProducts;
