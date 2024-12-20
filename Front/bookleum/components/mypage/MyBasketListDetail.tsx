import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Wish {
  title: string;
  price: string;
  cover: string;
  isbn: string;
}

export default function MyBasketListDetail({
  title,
  price,
  cover,
  isbn,
}: Wish) {
  return (
    <div className="flex py-6 pl-8 justify-between my-4 border-b border-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
      <div className="w-[30%] flex justify-center items-center">
        <Image src={cover} width={150} height={100} alt="book" />
      </div>
      <div className="flex flex-col justify-between w-[70%] p-4 ">
        <div>
          <p className="font-bold text-[1.2rem] mb-4">{title}</p>
          <p className="text-[1.1rem] font-semibold">{`가격 : ${price}원`}</p>
        </div>
      </div>
      <div className="flex items-end mr-4">
        <Link href={`/Other/purchase/${isbn}?type=cart`}>
          <button className="flex justify-center items-center w-16 h-8 border-2 bg-emerald-500 text-white hover:bg-emerald-600">
            <p>구매</p>
          </button>
        </Link>
      </div>
    </div>
  );
}
