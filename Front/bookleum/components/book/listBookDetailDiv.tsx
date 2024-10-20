"use client";

import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

import { FaStar } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { getCookie } from "cookies-next";
import { starRating } from "@/utils/starRating";

interface Props {
  author: string;
  description: string;
  isbn13: string;
  title: string;
  cover: string;
  priceSales: string;
  priceStandard: string;
  index: number;
  type: string;
}

export default function ListBookDetailDiv({
  author,
  description,
  isbn13,
  index,
  title,
  cover,
  priceSales,
  priceStandard,
  type,
}: Props) {
  const [cookie, setCookie] = useState<string | undefined>(undefined);
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    const token = getCookie("accessToken") as string | undefined;
    if (token) {
      setCookie(token);
    }
    const id = getCookie("userId") as string | undefined;
    if (id) {
      setUserId(id);
    }
  }, []);

  const handleWishData = async () => {
    console.log(userId, isbn13);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/wish/add`,
        {
          userId,
          isbn: isbn13,
        }
      );
      if (response.status === 200) {
        console.log("데이터 보내기 성공");
        alert("찜 목록에 추가되었습니다");
      } else {
        console.error("데이터를 보내기 실패.");
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        if (error.response.status === 400) {
          alert("이미 선택된 품목입니다");
        } else if (error.response.status === 204) {
          alert("선택이 불가능합니다");
        } else {
          console.error("데이터를 보내기 실패.");
        }
      } else {
        console.error("서버 에러:", error);
        alert("서버 에러 발생");
      }
    }
  };

  const handleAlert = () => {
    alert("로그인이 필요합니다");
  };

  return (
    <div className="flex items-center justify-around my-4 py-8 px-6 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
      <div className="w-[30%] flex justify-center">
        <Link href={`/Other/book/${isbn13}`}>
          <Image src={cover} width={180} height={100} alt="book" />
        </Link>
      </div>
      <div className="w-[50%]">
        <Link href={`/Other/book/${isbn13}`}>
          <p className="font-bold text-[1.3rem]">{`${index}. ${title}`}</p>
          <div className="flex justify-start">
            <p className="flex items-center mt-2">
              <FaStar className="text-[#FF4E88] text-[1.5rem]" />
              <b className="text-[1rem] ml-4">{`${
                isbn13 !== "" ? starRating(isbn13) : 4.3
              }`}</b>
            </p>
          </div>
          <p className="my-2 text-[1.1rem]">{author}</p>
          <p className="my-2 font-semibold text-[0.9rem]">
            <span className="text-[#0D92F4]">정가 : </span>
            {`${parseInt(priceStandard).toLocaleString()}원`}
          </p>
          <p className="my-2 font-semibold text-[0.9rem]">
            <span className="text-[#EF5A6F]">판매가 : </span>
            {`${parseInt(priceSales).toLocaleString()}원`}
          </p>
          <p className="font-Score">{description}</p>
        </Link>
      </div>
      <div className="w-[15%] flex flex-col items-end justify-around font-bold">
        {cookie !== undefined && (
          <>
            <button
              className={`${
                type === "best"
                  ? "bg-orange-400 text-white"
                  : "bg-blue-400 text-white"
              } border border-gray-400 w-32 h-12 mb-12 rounded-md`}
            >
              <Link href={`/Other/purchase/${isbn13}?type=normal`}>
                구매하기
              </Link>
            </button>
            <button
              className={`${
                type === "best"
                  ? "bg-white text-orange-400 border border-orange-500"
                  : "bg-white text-blue-400 border border-blue-600"
              } w-32 h-12 mb-12 rounded-md`}
              onClick={handleWishData}
            >
              찜
            </button>
          </>
        )}
        {cookie === undefined && (
          <>
            <button
              className={`${
                type === "best"
                  ? "bg-orange-400 text-white"
                  : "bg-blue-400 text-white"
              } border border-gray-400 w-32 h-12 mb-12 rounded-md`}
              onClick={handleAlert}
            >
              구매하기
            </button>
            <button
              className={`${
                type === "best"
                  ? "bg-white text-orange-400 border border-orange-500"
                  : "bg-white text-blue-400 border border-blue-600"
              } w-32 h-12 mb-12 rounded-md`}
              onClick={handleAlert}
            >
              찜
            </button>
          </>
        )}
      </div>
    </div>
  );
}
