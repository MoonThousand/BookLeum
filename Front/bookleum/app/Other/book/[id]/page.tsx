"use client";

import React, { useEffect, useState } from "react";

import BookDetailContent from "@/components/main/bookDetailContent";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import ReviewDetail from "@/components/main/reviewDetail";
import axios from "axios";
import { usePathname } from "next/navigation";

export default function BookDetail() {
  const pathname = usePathname();
  const isbn13 = pathname.substring(pathname.lastIndexOf("/") + 1);
  const [book, setBook] = useState({
    author: "",
    description: "",
    categoryName: "",
    title: "",
    cover: "",
    priceSales: "",
    priceStandard: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/open/check-product/ISBN/${isbn13}/mid`
        );

        if (response.status === 200) {
          console.log("데이터 받아오기 성공", response);
          const bookData = response.data.item;

          const todayBookData = bookData[0];
          const originalCoverUrl = todayBookData.cover;

          const modifiedCoverUrl = originalCoverUrl.replace(
            "/coversum/",
            "/cover500/"
          );
          setBook({
            author: todayBookData.author,
            description: todayBookData.description,
            categoryName: todayBookData.categoryName,
            title: todayBookData.title,
            cover: modifiedCoverUrl,
            priceSales: todayBookData.priceSales,
            priceStandard: todayBookData.priceStandard,
          });
        } else {
          console.error("실패");
        }
      } catch (error) {
        console.error("실패", error);
        alert("서버에러.");
      }
    };

    fetchData();
  }, []);

  const randomRating = (Math.random() * (4.3 - 3.4) + 3.4).toFixed(1);

  return (
    <div className="w-[80%] mx-auto mt-16">
      <div className="flex justify-around items-center">
        <Image
          src={book.cover}
          width={250}
          height={100}
          alt="main logo Image"
        />
        <div className="w-[60%]">
          <p className="my-2 text-[2rem]">{book.title}</p>
          <p className="text-[1.1rem]">{book.author}</p>
          <div className="w-full h-[2px] bg-gray-400 my-6"></div>
          <div className="flex flex-col items-end">
            <p className="text-[1.3rem]">{`정가 : ${book.priceStandard}원`}</p>
            <p className="text-[1.3rem] my-3">{`판매가 : ${book.priceSales}원`}</p>
            <p className="my-3 text-[1.1rem]">배송료 : 2000원</p>
            <p className="flex items-center">
              <FaStar className="text-[#FF4E88] text-[2rem]" />
              <b className="text-[1.2rem] ml-4">{randomRating}</b>
            </p>
          </div>
          <div className="w-full h-[2px] bg-gray-400 my-6"></div>
          <div className="flex justify-end ">
            <button className="rounded-md border border-gray-400 py-2 px-4">
              찜하기
            </button>
            <button className="bg-[#4F6F52] text-white border border-gray-400 rounded-md py-2 px-4 mx-4">
              <Link href={`/Other/purchase/${isbn13}`}>구매하기</Link>
            </button>
            <button className="bg-[#C5EBAA] border border-gray-400 rounded-md py-2 px-4">
              장바구니
            </button>
          </div>
        </div>
      </div>
      <BookDetailContent title="책 소개" content={book.description} />
      <BookDetailContent
        title="목차"
        content="01화 흔한남매의 단소 불기 도전!02화 첨벙첨벙 신나는 물놀이알쏭달쏭
            다른 그림 찾기03화 남매와 자매의 자존심 싸움04화 으뜸이가 잠든
            사이꼬불꼬불 미로 찾기05화 만약 게임이 학교 공부라면?06화 수수께끼
            악몽에서 탈출하라!풀면 풀수록 웃음 터지는 개그 난센스 퀴즈"
      />
      <BookDetailContent
        title="작가 소개"
        content=" SBS 코미디 프로그램 ‘웃찾사’에서 만난 으뜸이와 다운이는 어떻게 하면
            더 많은 사람들에게 웃음을 줄 수 있을까 고민하던 중 유튜브 코미디
            콘텐츠를 만들게 되었어요. 그리고 어느덧 많은 사람들에게 사랑받는
            인기 크리에이터가 되었지요. 흔한남매는 지금도 여러분에게 웃음을 주기
            위해 계속 노력하고 있답니다."
      />

      <ReviewDetail />
    </div>
  );
}
