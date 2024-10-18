import Image from "next/image";
import React from "react";

interface MyList {
  title: string;
  price: string;
  cover: string;
  quantity: number;
}

export default function PurchaseList({
  title,
  price,
  cover,
  quantity,
}: MyList) {
  return (
    <>
      <ul className="flex justify-center items-center pl-2 pt-2 py-2 border-b border-gray-700">
        <li className="w-[20%] flex justify-end items-center">
          <Image src={cover} width={100} height={100} alt="book" />
        </li>
        <li className="w-[40%] flex justify-start items-center">
          <p className="ml-6 font-bold">{title}</p>
        </li>
        <li className="w-[15%] flex justify-center">
          <p>{`${quantity}권`}</p>
        </li>
        <li className="w-[25%] flex justify-center font-bold">
          <p>{`${Number(price) * quantity}원`}</p>
        </li>
      </ul>
    </>
  );
}
