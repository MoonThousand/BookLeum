"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import axios from "axios";
import { formatDate } from "@/utils/formatDate";
import { getCookie } from "cookies-next";

interface Inquiry {
  id: number;
  title: string;
  createdDate: string;
}

export default function Inquiry() {
  const [inquiryList, setInquiryList] = useState([]);
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const id = getCookie("userId") as string | undefined;
    if (id) {
      setUserId(id);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/inquiry/read/${userId}`
        );
        if (response.status === 200) {
          console.log(response);
          // const inquiryData = response.data.map((qustion: Inquiry) => {
          //   return {
          //     title: qustion.title,
          //     id: qustion.id,
          //     createdDate: qustion.createdDate,
          //   };
          // });
          // setInquiryList(inquiryData);
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

  console.log(userId);

  return (
    <div className="w-[70%] mx-auto">
      <div>
        <p className="pl-2 font-bold text-[2rem]">1:1문의 내역</p>
        <div className="w-full h-[4px] bg-black mt-2"></div>
        <ul className="flex items-center pl-2 pt-2">
          <li className="w-[20%]">No.</li>
          <li className="w-[50%]">제목</li>
          <li className="w-[30%]">등록일</li>
        </ul>
        <div className="w-full h-[2px] bg-black mt-2"></div>
      </div>
      {inquiryList.map((inquiry: Inquiry, index) => (
        <div className="py-4" key={inquiry.id}>
          <Link href={`/Other/notice/noticeDetail/${inquiry.id}`}>
            <ul className="flex items-center pl-2 pt-2">
              <li className="w-[20%]">{index + 1}.</li>
              <li className="w-[50%]">{inquiry.title}</li>
              <li className="w-[30%]">{formatDate(inquiry.createdDate)}</li>
            </ul>
          </Link>
        </div>
      ))}
    </div>
  );
}
