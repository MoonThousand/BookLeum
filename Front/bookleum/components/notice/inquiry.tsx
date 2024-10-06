import React from "react";

export default function Inquiry() {
  return (
    <div className="w-[70%] mx-auto">
      <div>
        <p className="pl-2 font-bold text-[2rem]">1:1문의</p>
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
    </div>
  );
}
