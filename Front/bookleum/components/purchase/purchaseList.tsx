import Image from "next/image";
import React from "react";

export default function PurchaseList() {
  return (
    <>
      <ul className="flex justify-center items-center pl-2 pt-2 py-2 border-b border-gray-700">
        <li className="w-[60%] flex justify-center items-center">
          <Image src="/book.png" width={100} height={100} alt="book" />
          <p className="ml-6 font-bold">언젠가 우리가 같은 별을 바라본다면</p>
        </li>
        <li className="w-[15%] flex justify-center">
          <p>1권</p>
        </li>
        <li className="w-[25%] flex justify-center font-bold">
          <p>12500원</p>
        </li>
      </ul>
    </>
  );
}
