"use client";

import React, { useEffect, useState } from "react";

import axios from "axios";
import { formatDate } from "@/utils/formatDate";
import { usePathname } from "next/navigation";

export default function NoticeDetailPage() {
  const pathname = usePathname();
  const postId = pathname.substring(pathname.lastIndexOf("/") + 1);
  const [noticeData, setNoticeData] = useState({
    id: "",
    title: "",
    content: "",
    createdDate: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/main/notice/post/${postId}`
        );
        if (response.status === 200) {
          setNoticeData({
            id: response.data.id,
            title: response.data.title,
            content: response.data.content,
            createdDate: response.data.createdDate,
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

  const sentences = noticeData.content.split(".");
  return (
    <div className="w-[70%] mx-auto mt-12">
      <div className="font-TTL">
        <p className="font-bold text-[2rem]">공지사항</p>
        <div className="w-full h-[2px] bg-black mt-2"></div>
        <div className="flex justify-between items-center py-4">
          <p className="text-[1.5rem]">{noticeData.title}</p>
          <div>
            <p className="pb-2">{`작성일 : ${formatDate(
              noticeData.createdDate
            )}`}</p>
            <p>작성자 : 관리자</p>
          </div>
        </div>
        <div className="w-full h-[2px] bg-black mt-2"></div>
      </div>
      <div className="mt-8">
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
