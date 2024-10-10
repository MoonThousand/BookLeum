import React from "react";

export default function InformationModify() {
  return (
    <div className="w-[80%] mx-auto ml-8">
      <div>
        <p className="font-bold text-[2rem]">내 정보</p>
        <div className="w-full h-[2px] bg-black mt-2"></div>
      </div>
      <div className="w-[70%] pl-6 py-8 font-bold text-[1.2rem] flex justify-between">
        <ul>
          <li className="mb-6">ID</li>
          <li className="mb-6">이름</li>
          <li className="mb-6">이메일</li>
          <li className="mb-6">기존 비밀번호</li>
          <li className="mb-6">새 비밀번호</li>
          <li className="mb-6">전화 번호</li>
          <li className="mb-6">주소</li>
          <li>생년월일</li>
        </ul>
        <ul>
          <li className="mb-6">test0524</li>
          <li className="mb-6">정의현</li>
          <li className="mb-6">test0524@naver.com</li>
          <li className="mb-6">
            <input className="border border-gray-300" />
          </li>
          <li className="mb-6">
            <input className="border border-gray-300" />
          </li>
          <li className="mb-6">012-1231-1245</li>
          <li className="mb-6">주소</li>
          <li>생년월일</li>
        </ul>
      </div>
    </div>
  );
}
