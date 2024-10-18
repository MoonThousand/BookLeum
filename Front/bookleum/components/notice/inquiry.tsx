"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import axios from "axios";
import { formatDate } from "@/utils/formatDate";
import { getCookie } from "cookies-next";

interface Inquiry {
  inquiryId: number;
  inquiryType: string;
  createDate: string;
  status: string;
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
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/inquiry/readAll/${userId}`
        );
        if (response.status === 200) {
          console.log(response);
          const inquiryData = response.data.inquiryList.map(
            (inquiry: Inquiry) => {
              return {
                inquiryType: inquiry.inquiryType,
                inquiryId: inquiry.inquiryId,
                status: inquiry.status,
                createDate: inquiry.createDate,
              };
            }
          );
          setInquiryList(inquiryData);
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

  const handleAlert = () => {
    alert("로그인이 필요합니다");
  };

  return (
    <div className="w-[70%] mx-auto min-h-[300px]">
      <div>
        <div className="flex justify-between items-center">
          <p className="pl-2 font-bold text-[2rem]">1:1문의 내역</p>
          {userId ? (
            <Link href="/Other/notice/inquiryDetail/inquiryWrite">
              <button className="py-2 px-3 bg-gray-700 text-white rounded-md border border-black hover:bg-gray-800">
                작성
              </button>
            </Link>
          ) : (
            <button
              className="py-2 px-3 bg-gray-700 text-white rounded-md border border-black hover:bg-gray-800"
              onClick={handleAlert}
            >
              작성
            </button>
          )}
        </div>
        <div className="w-full h-[4px] bg-black mt-2"></div>
        <ul className="flex items-center pl-2 pt-2">
          <li className="w-[20%]">No.</li>
          <li className="w-[30%]">문의 유형</li>
          <li className="w-[25%]">문의 날짜</li>
          <li className="w-[15%]">상태</li>
        </ul>
        <div className="w-full h-[2px] bg-black mt-2"></div>
      </div>
      {userId ? (
        <>
          {inquiryList.length > 0 ? (
            inquiryList.map((inquiry: Inquiry, index) => (
              <div className="py-4" key={inquiry.inquiryId}>
                <Link href={`/Other/notice/inquiryDetail/${inquiry.inquiryId}`}>
                  <ul className="flex items-center pl-2 pt-2">
                    <li className="w-[20%]">{index + 1}.</li>
                    <li className="w-[30%]">{inquiry.inquiryType}</li>
                    <li className="w-[25%]">
                      {formatDate(inquiry.createDate)}
                    </li>
                    <li className="w-[15%]">{inquiry.status}</li>
                  </ul>
                </Link>
              </div>
            ))
          ) : (
            <div className="w-full h-[300px] flex items-center justify-center">
              <p className="text-[1.5rem]">문의 내역이 없습니다</p>
            </div>
          )}
        </>
      ) : (
        <div className="mx-auto ml-8 font-TTL h-[300px] flex flex-col justify-center items-center">
          <p className="text-[1.5rem]">로그인이 필요합니다</p>
        </div>
      )}
    </div>
  );
}
