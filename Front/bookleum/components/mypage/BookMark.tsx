import Image from "next/image";
import React from "react";

export default function BookMark() {
  return (
    <div className="w-[80%] mx-auto ml-8">
      <p className="font-bold text-[1.8rem]">찜 목록</p>
      <div className="w-full h-[30px] bg-gradient-to-r from-gray-600 to-gray-700 mt-2 flex justify-end items-center pr-4">
        <p className="font-semibold text-white">개수 : 2개</p>
      </div>
      <div className="flex py-6 pl-8 justify-between my-4 border-b border-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        <div className="w-[30%] flex justify-center items-center">
          <Image src="/book.png" width={150} height={100} alt="book" />
        </div>
        <div className="flex flex-col justify-between w-[70%] p-4 ">
          <div>
            <p className="font-bold text-[1.3rem]">
              언젠가 우리가 같은 별을 바라본다면
            </p>
            <p className="text-[1.1rem] my-3 font-bold">작가 : 차인표</p>
            <p className="text-[1.2rem] font-semibold">12,500원</p>
          </div>
          <div className="flex flex-col justify-end items-end space-x-4 pr-2">
            <button className="bg-gray-100 text-gray-600 px-4 py-2 rounded mb-4 border border-gray-400">
              구매
            </button>
            <button className="bg-gray-600 text-white px-4 py-2 rounded border border-gray-400">
              취소
            </button>
          </div>
        </div>
      </div>
      <div className="flex py-6  pl-8 justify-between my-4 border-b border-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        <div className="w-[30%] flex justify-center items-center">
          <Image src="/book.png" width={150} height={100} alt="book" />
        </div>
        <div className="flex flex-col justify-between w-[70%] p-4 ">
          <div>
            <p className="font-bold text-[1.3rem]">
              언젠가 우리가 같은 별을 바라본다면
            </p>
            <p className="text-[1.1rem] my-3 font-bold">작가 : 차인표</p>
            <p className="text-[1.2rem] font-semibold">12,500원</p>
          </div>
          <div className="flex flex-col justify-end items-end space-x-4 pb-2 pr-2">
            <button className="bg-gray-600 text-white px-4 py-2 rounded">
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
