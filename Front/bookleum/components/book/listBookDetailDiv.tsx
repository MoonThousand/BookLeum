"use client";

import React, { useEffect, useState } from "react";

import { FaStar } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { getCookie } from "cookies-next";

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
  const randomRating = (Math.random() * (4.3 - 3.4) + 3.4).toFixed(1);

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
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/wish/add`,
        {
          userId,
          isbn13,
        }
      );
      if (response.status === 200) {
        console.log("데이터 보내기 성공");
      } else {
        console.error("데이터를 보내기 실패.");
      }
    } catch (error) {
      console.error("서버 에러:", error);
      alert("서버 에러 발생");
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
          <p className="my-2 text-[1.1rem]">{author}</p>
          <p className="my-2 font-semibold">{`정가 ${priceStandard}원 | 판매가 : ${priceSales}원`}</p>
          <p>{description}</p>
          <p className="flex items-center mt-2">
            <FaStar className="text-[#FF4E88] text-[2rem]" />
            <b className="text-[1.2rem] ml-4">{randomRating}</b>
          </p>
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
              <Link href={`/Other/purchase/${isbn13}`}>구매하기</Link>
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
