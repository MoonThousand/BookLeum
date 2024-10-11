import React, { useEffect, useState } from "react";

import axios from "axios";
import { getCookie } from "cookies-next";

export default function InformationModify() {
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const id = getCookie("userId") as string | undefined;
    if (id) {
      setUserId(id);
    }
  }, [userId]);

  console.log(userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/history/read/${userId}`
        );
        if (response.status === 200) {
          console.log(response);
        } else {
          console.error("데이터를 불러오지 못했습니다.");
        }
      } catch (error) {
        console.error("서버 에러:", error);
        alert("서버 에러 발생");
      }
    };

    if (userId !== undefined) {
      fetchData();
    }
  }, [userId]);

  return (
    <div className="w-[80%] mx-auto ml-8">
      <div>
        <p className="font-bold text-[2rem]">내 정보</p>
        <div className="w-full h-[2px] bg-black mt-2"></div>
      </div>
      <div className="w-[70%] pl-6 py-8 text-[1.2rem] flex justify-between">
        <ul className="font-bold">
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
