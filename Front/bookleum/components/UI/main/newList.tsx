import Image from "next/image";
import React from "react";

export default function NewList() {
  return (
    <div className="w-[70%] mt-8">
      <div className="font-bold text-[2rem] my-4 py-2">
        <p>신간 리스트</p>
      </div>
      <div className="flex justify-around">
        <div className="flex flex-col items-center">
          <Image src="/book.png" width={140} height={100} alt="new book" />
          <p className="font-semibold">불편한 편의점</p>
          <p>김호연 지음</p>
        </div>
        <div className="flex flex-col items-center">
          <Image src="/book.png" width={140} height={100} alt="new book" />
          <p className="font-semibold">불편한 편의점</p>
          <p>김호연 지음</p>
        </div>
        <div className="flex flex-col items-center">
          <Image src="/book.png" width={140} height={100} alt="new book" />
          <p className="font-semibold">불편한 편의점</p>
          <p>김호연 지음</p>
        </div>
      </div>
    </div>
  );
}
