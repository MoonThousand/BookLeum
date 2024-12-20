"use client";

import React, { useEffect, useState } from "react";

import axios from "axios";
import { formatDate } from "@/utils/formatDate";
import { usePathname } from "next/navigation";

export default function InquiryDetail() {
  const pathname = usePathname();
  const postId = pathname.substring(pathname.lastIndexOf("/") + 1);
  const [inquiryData, setInquiryata] = useState({
    inquiryId: 0,
    inquiryTitle: "",
    inquiryContent: "",
    createDate: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/inquiry/read/${postId}`
        );
        if (response.status === 200) {
          console.log(response);
          setInquiryata({
            inquiryId: response.data.inquiryId,
            inquiryTitle: response.data.inquiryTitle,
            inquiryContent: response.data.inquiryContent,
            createDate: response.data.createDate,
          });
        } else {
          console.error("데이터를 불러오지 못했습니다.");
        }
      } catch (error) {
        console.error("서버 에러:", error);
        alert("서버 에러 발생");
      }
    };

    fetchData();
  }, [postId]);

  const sentences = inquiryData.inquiryContent.split("/");
  return (
    <div className="w-[70%] mx-auto mt-12">
      <div className="font-TTL">
        <p className="font-bold text-[2rem]">1:1 문의</p>
        <div className="w-full h-[2px] bg-black mt-2"></div>
        <div className="flex justify-between items-center py-4">
          <p className="text-[1.5rem]">{inquiryData.inquiryTitle}</p>
          <div>
            <p className="pb-2">{`작성일 : ${formatDate(
              inquiryData.createDate
            )}`}</p>
            <p>작성자 : 관리자</p>
          </div>
        </div>
        <div className="w-full h-[2px] bg-black mt-2"></div>
      </div>
      <div className="mt-8 min-h-[300px]">
        {sentences.map(
          (sentence, index) =>
            sentence.trim() && (
              <p key={index} className="whitespace-pre-wrap py-2">
                {sentence.trim()}.
              </p>
            )
        )}
      </div>
    </div>
  );
}
