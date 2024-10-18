"use client";

import React, { useEffect, useState } from "react";

import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function InqueryWrite() {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [inquiryType, setInquiryType] = useState("이용문의");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();

  useEffect(() => {
    const id = getCookie("userId") as string | undefined;
    if (id) {
      setUserId(id);
    }
  }, [userId]);

  const handleSubmit = async () => {
    if (title === "" || content === "") {
      alert("빈 칸을 채워주세요");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/inquiry/create`,
        {
          userId,
          inquiryType,
          inquiryTitle: title,
          inquiryContent: content,
          status: "진행중",
        }
      );
      if (response.status === 200) {
        console.log("데이터 작성 성공");
        alert("글이 작성되었습니다");
        router.back();
      } else {
        console.error("데이터를 불러오지 못했습니다.");
      }
    } catch (error) {
      console.error("서버 에러:", error);
      alert("서버 에러 발생");
    }
  };

  return (
    <div className="w-[80%] mx-auto mt-12 font-TTL">
      <div>
        <p className="font-bold text-[2rem]">문의 내용 작성</p>
        <div className="w-full h-[3px] bg-black mt-2"></div>
      </div>
      <div className="w-[90%] mx-auto mt-6">
        <div className="mb-4">
          <select
            className="border-2 border-gray-500 w-[250px] py-2 px-2 rounded-md"
            value={inquiryType}
            onChange={(e) => setInquiryType(e.target.value)}
          >
            <option value="이용문의">이용문의</option>
            <option value="구매문의">구매문의</option>
            <option value="환불문의">환불문의</option>
            <option value="기타문의">기타문의</option>
          </select>
        </div>
        <div className="mb-4">
          <input
            placeholder="제목을 입력해주세요"
            className="border-2 border-gray-500 w-full py-2 px-2 rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <textarea
          placeholder="내용을 입력해주세요"
          value={content}
          className="border-2 border-gray-500 w-full py-2 px-2 h-[300px] rounded-md"
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="w-[90%] mx-auto flex justify-end mt-6">
        <button
          className="py-2 px-4 bg-gray-700 text-white rounded-md hover:bg-gray-800"
          onClick={handleSubmit}
        >
          작성
        </button>
      </div>
    </div>
  );
}
