import { FaStar } from "react-icons/fa";
import Image from "next/image";
import React from "react";

interface Props {
  author: string;
  description: string;
  isbn13: string;
  title: string;
  cover: string;
  priceSales: string;
  priceStandard: string;
  index: number;
}

export default function ListBookDetailDiv({
  author,
  description,
  isbn13,
  index,
  title,
  cover,
  priceSales,
  priceStandard,
}: Props) {
  return (
    <div className="flex items-center justify-around my-4 py-8 px-6 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
      <div className="w-[30%] flex justify-center">
        <Image src={cover} width={180} height={100} alt="book" />
      </div>
      <div className="w-[50%]">
        <p className="font-bold text-[1.3rem]">{`${index}. ${title}`}</p>
        <p className="my-2 text-[1.1rem]">{author}</p>
        <p className="my-2 font-semibold">{`정가 ${priceStandard}원 | 판매가 : ${priceSales}원`}</p>
        <p>{description}</p>
        <p className="flex items-center mt-2">
          <FaStar className="text-[#FF4E88] text-[2rem]" />
          <b className="text-[1.2rem] ml-4">3.9</b>
        </p>
      </div>
      <div className="w-[15%] flex flex-col items-end justify-around">
        <button className="w-32 h-8 rounded-md border border-gray-400">
          찜
        </button>
        <button className="bg-gray-500 border border-gray-600 w-32 h-8 my-6 rounded-md text-white">
          장바구니
        </button>
        <button className="bg-[#A4C49E] border border-gray-600 w-32 h-8 rounded-md">
          구매하기
        </button>
      </div>
    </div>
  );
}
