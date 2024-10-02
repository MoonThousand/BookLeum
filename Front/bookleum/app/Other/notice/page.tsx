import React from "react";
import { TbTriangleInvertedFilled } from "react-icons/tb";

export default function Notice() {
  return (
    <div className=" w-[80%] mx-auto flex mt-12">
      <div className="flex flex-col">
        <p className="font-medium text-[1.5rem] mb-2">고객센터</p>
        <div className="flex flex-col w-[180px]">
          <span className="border-t border-r border-l border-gray-600 py-3 flex items-center">
            <p className="w-[80%] pl-4 text-gray-700">공지사항</p>
            <TbTriangleInvertedFilled className="w-[20%] text-gray-400" />
          </span>
          <span className="border-t border-r border-l border-gray-600 py-3 flex items-center">
            <p className="w-[80%] pl-4 text-gray-700">자주하는 질문</p>
            <TbTriangleInvertedFilled className="w-[20%] text-gray-400" />
          </span>
          <span className="border border-gray-600 py-3 flex items-center">
            <p className="w-[80%] pl-4 text-gray-700">1:1문의</p>
            <TbTriangleInvertedFilled className="w-[20%] text-gray-400" />
          </span>
        </div>
      </div>
      <div className="w-[70%] mx-auto">
        <div>
          <p className="pl-2 font-bold text-[2rem]">공지사항</p>
          <div className="w-full h-[4px] bg-black mt-2"></div>
          <ul className="flex items-center pl-2 pt-2">
            <li className="w-[20%]">No.</li>
            <li className="w-[50%]">제목</li>
            <li className="w-[30%]">등록일</li>
          </ul>
          <div className="w-full h-[2px] bg-black mt-2"></div>
        </div>
        <div className="py-3">
          <ul className="flex items-center pl-2 pt-2">
            <li className="w-[20%]">1.</li>
            <li className="w-[50%]">고객센터 휴무 안내</li>
            <li className="w-[30%]">2024.09.19</li>
          </ul>
        </div>
        <div className="py-3">
          <ul className="flex items-center pl-2 pt-2">
            <li className="w-[20%]">1.</li>
            <li className="w-[50%]">고객센터 휴무 안내</li>
            <li className="w-[30%]">2024.09.19</li>
          </ul>
        </div>
        <div className="py-3">
          <ul className="flex items-center pl-2 pt-2">
            <li className="w-[20%]">1.</li>
            <li className="w-[50%]">고객센터 휴무 안내</li>
            <li className="w-[30%]">2024.09.19</li>
          </ul>
        </div>
        <div className="py-3">
          <ul className="flex items-center pl-2 pt-2">
            <li className="w-[20%]">1.</li>
            <li className="w-[50%]">고객센터 휴무 안내</li>
            <li className="w-[30%]">2024.09.19</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
