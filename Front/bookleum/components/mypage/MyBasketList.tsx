import React, { useEffect, useState } from "react";

import Link from "next/link";
import MyBasketListDetail from "./MyBasketListDetail";
import axios from "axios";
import { getCookie } from "cookies-next";

interface MyList {
  title: string;
  price: string;
  cover: string;
  isbn: string;
}

export default function MyBasketList() {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [myListData, setMyListData] = useState<MyList[]>([]);

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
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/cart/read/${userId}`
        );
        if (response.status === 200) {
          console.log(response);
          const myListData = response.data.map((wish: MyList) => {
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
          setMyListData(myListData);
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

  const handleMyBasketDelete = async (isbn: string) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/cart/delete`,
        {
          userId,
          isbn: [isbn],
        }
      );
      if (response.status === 200) {
        console.log("선택 목록 삭제 완료");
        setMyListData((prevData) =>
          prevData.filter((mylist) => mylist.isbn !== isbn)
        );
      } else {
        console.error("데이터를 불러오지 못했습니다.");
      }
    } catch (error) {
      console.error("서버 에러:", error);
      alert("서버 에러 발생");
    }
  };

  return (
    <div className="w-[80%] mx-auto ml-8 font-TTL">
      <p className="font-bold text-[1.8rem]">장바구니</p>
      <div className="w-full h-[30px] bg-gradient-to-r from-emerald-400 to-emerald-500 mt-2 flex justify-end items-center pr-4">
        <p className="font-semibold text-white">{`나의 장바구니 개수 : ${myListData.length}개`}</p>
      </div>
      <div className="flex justify-end">
        <Link href={"Other/purchase"}>
          <button className="text-emerald-500 border-2 border-emerald-500 py-2 px-4 mt-3 rounded">
            구매하기
          </button>
        </Link>
      </div>
      {myListData.map((mylist: MyList) => (
        <div key={mylist.isbn}>
          <Link href={`/Other/book/${mylist.isbn}`}>
            <MyBasketListDetail
              title={mylist.title}
              cover={mylist.cover}
              price={mylist.price}
              isbn={mylist.isbn}
              onDelete={handleMyBasketDelete}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}
