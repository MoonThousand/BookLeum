"use client";

import React, { useEffect, useState } from "react";

import BookMarkDetail from "./BookMarkDetail";
import Loading from "../UI/loding";
import MyNan from "./MyNan";
import axios from "axios";
import { getCookie } from "cookies-next";

interface Wish {
  title: string;
  price: string;
  cover: string;
  isbn: string;
}

export default function BookMark() {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [wishData, setWishData] = useState<Wish[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = getCookie("userId") as string | undefined;
    if (id) {
      setUserId(id);
    }
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/wish/read/${userId}`
        );
        if (response.status === 200) {
          console.log(response);
          const wishData = response.data.map((wish: Wish) => {
            const originalCoverUrl = wish.cover;
            const modifiedCoverUrl = originalCoverUrl.replace(
              "/coversum/",
              "/cover500/"
            );

            return {
              isbn: wish.isbn,
              title: wish.title,
              cover: modifiedCoverUrl,
              price: wish.price,
            };
          });
          setWishData(wishData);
        } else {
          console.error("데이터를 불러오지 못했습니다.");
        }
      } catch (error) {
        console.error("서버 에러:", error);
        alert("서버 에러 발생");
      } finally {
        setIsLoading(false);
      }
    };
    if (userId !== undefined) {
      fetchData();
    }
  }, [userId]);

  const handleWishListSelectDelete = async (isbn: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/wish/delete`,
        {
          userId,
          isbn: [isbn],
        }
      );
      if (response.status === 200) {
        console.log("선택 목록 삭제 완료");
        alert("해당 물품이 삭제되었습니다");
        setWishData((prevData) =>
          prevData.filter((wish) => wish.isbn !== isbn)
        );
      } else {
        console.error("데이터를 불러오지 못했습니다.");
      }
    } catch (error) {
      console.error("서버 에러:", error);
      alert("서버 에러 발생");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {wishData.length > 0 ? (
        <div className="w-[80%] mx-auto ml-8 font-TTL">
          <p className="font-bold text-[1.8rem]">찜 목록</p>
          <div className="w-full h-[30px] bg-gradient-to-r from-pink-400 to-pink-500 mt-2 flex justify-end items-center pr-4">
            <p className="font-semibold text-white">{`나의 찜 개수 : ${wishData.length}개`}</p>
          </div>
          {wishData.map((wish: Wish) => (
            <div key={wish.isbn}>
              <BookMarkDetail
                title={wish.title}
                cover={wish.cover}
                price={wish.price}
                isbn={wish.isbn}
                onDelete={handleWishListSelectDelete}
              />
            </div>
          ))}
        </div>
      ) : (
        <MyNan title="찜 목록이 비어있어요🥹" />
      )}
    </>
  );
}
