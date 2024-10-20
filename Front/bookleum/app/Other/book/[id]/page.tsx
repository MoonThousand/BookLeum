"use client";

import React, { useEffect, useState } from "react";

import BookDetailContent from "@/components/main/bookDetailContent";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import Loading from "@/components/UI/loding";
import ReviewDetail from "@/components/main/reviewDetail";
import axios from "axios";
import { getCookie } from "cookies-next";
import { starRating } from "@/utils/starRating";
import { usePathname } from "next/navigation";

export default function BookDetail() {
  const pathname = usePathname();
  const isbn13 = pathname.substring(pathname.lastIndexOf("/") + 1);
  const [cookie, setCookie] = useState<string | undefined>(undefined);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [book, setBook] = useState({
    author: "",
    description: "",
    categoryName: "",
    title: "",
    cover: "",
    priceSales: "",
    priceStandard: "",
    isbn: "",
    pubDate: "",
    publisher: "",
  });

  useEffect(() => {
    const token = getCookie("accessToken") as string | undefined;
    if (token) {
      setCookie(token);
    }
    const id = getCookie("userId") as string | undefined;
    if (id) {
      setUserId(id);
    }

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
            isbn: todayBookData.isbn,
            pubDate: todayBookData.pubDate,
            publisher: todayBookData.publisher,
          });
          setIsLoading(true);
        } else {
          console.error("실패");
        }
      } catch (error) {
        console.error("실패", error);
        alert("서버에러.");
      }
    };

    fetchData();
  }, [isbn13]);

  const handleCartData = async () => {
    console.log(userId, isbn13);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/cart/add`,
        {
          userId,
          isbn: isbn13,
        }
      );
      if (response.status === 200) {
        console.log("데이터 보내기 성공");
        alert("장바구니에 추가되었습니다.");
      } else if (response.status === 204) {
        console.log("데이터 안보냈음");
        alert("장바구니에 존재합니다.");
      } else {
        console.error("데이터를 보내기 실패.");
      }
    } catch (error) {
      console.error("서버 에러:", error);
      alert("서버 에러 발생");
    }
  };

  const handleWishData = async () => {
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
        alert("찜목록에 추가되었습니다.");
      } else if (response.status === 204) {
        console.log("데이터 안보냈음");
        alert("찜목록에 존재합니다.");
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
    <div className="w-[80%] mx-auto mt-16 font-TTL">
      {isLoading ? (
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
              <p className="text-[1.3rem]">{`정가 : ${parseInt(
                book.priceStandard
              ).toLocaleString()}원`}</p>
              <p className="text-[1.3rem] my-3">{`판매가 : ${parseInt(
                book.priceSales
              ).toLocaleString()}원`}</p>
              <p className="my-3 text-[1.1rem]">배송료 : 2,000원</p>
              <p className="flex items-center">
                <FaStar className="text-[#FF4E88] text-[2rem]" />
                <b className="text-[1.2rem] ml-4">{`${starRating(isbn13)}`}</b>
              </p>
            </div>
            <div className="w-full h-[2px] bg-gray-400 my-6"></div>
            <div className="flex justify-end">
              {cookie !== undefined && (
                <>
                  <button
                    className="rounded-md border border-gray-400 py-2 px-4"
                    onClick={handleWishData}
                  >
                    찜하기
                  </button>
                  <button className="bg-[#4F6F52] text-white border border-gray-400 rounded-md py-2 px-4 mx-4">
                    <Link href={`/Other/purchase/${isbn13}?type=normal`}>
                      구매하기
                    </Link>
                  </button>
                  <button
                    className="bg-[#C5EBAA] border border-gray-400 rounded-md py-2 px-4"
                    onClick={handleCartData}
                  >
                    장바구니
                  </button>
                </>
              )}
              {cookie === undefined && (
                <>
                  <button
                    className="rounded-md border border-gray-400 py-2 px-4"
                    onClick={handleAlert}
                  >
                    찜하기
                  </button>
                  <button
                    className="bg-[#4F6F52] text-white border border-gray-400 rounded-md py-2 px-4 mx-4"
                    onClick={handleAlert}
                  >
                    구매하기
                  </button>
                  <button
                    className="bg-[#C5EBAA] border border-gray-400 rounded-md py-2 px-4"
                    onClick={handleAlert}
                  >
                    장바구니
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <Loading />
        </>
      )}

      <BookDetailContent
        title="책 소개"
        content={`${
          book.description ? book.description : "책 소개가 존재하지 않습니다"
        }`}
      />
      <ReviewDetail
        categoryName={book.categoryName}
        isbn={book.isbn}
        pubDate={book.pubDate}
        publisher={book.publisher}
      />
    </div>
  );
}
