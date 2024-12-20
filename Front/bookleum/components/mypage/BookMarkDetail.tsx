import Image from "next/image";
import Link from "next/link";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

interface Wish {
  title: string;
  price: string;
  cover: string;
  isbn: string;
  onDelete: (isbn: string) => void;
}

export default function BookMarkDetail({
  title,
  price,
  cover,
  isbn,
  onDelete,
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
        <div className="flex justify-end items-end space-x-4 pr-2">
          <Link href={`/Other/purchase/${isbn}?type=wish`}>
            <button className="bg-white px-3 py-2 rounded text-pink-400 border-2 border-pink-300 hover:border-pink-400 w-16 h-10 flex justify-center items-center">
              <p>구매</p>
            </button>
          </Link>
          <button
            className="bg-white px-3 py-2 rounded border-2 border-gray-400 hover:border-gray-500 w-16 h-10 flex justify-center items-center"
            onClick={() => onDelete(isbn)}
          >
            <RiDeleteBin6Line />
          </button>
        </div>
      </div>
    </div>
  );
}
