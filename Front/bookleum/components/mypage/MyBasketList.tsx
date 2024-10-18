import React, { useEffect, useState } from "react";

import Link from "next/link";
import Loading from "../UI/loding";
import MyBasketListDetail from "./MyBasketListDetail";
import MyNan from "./MyNan";
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
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIsbns, setSelectedIsbns] = useState<string[]>([]);

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
      } finally {
        setIsLoading(false);
      }
    };
    if (userId !== undefined) {
      fetchData();
    }
  }, [userId]);

  const handleCheckboxChange = (isbn: string) => {
    setSelectedIsbns((prevIsbns) =>
      prevIsbns.includes(isbn)
        ? prevIsbns.filter((id) => id !== isbn)
        : [...prevIsbns, isbn]
    );
  };

  const handleMyBasketAllDelete = async () => {
    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/cart/deleteAll/${userId}`
      );
      if (response.status === 200) {
        alert("장바구니 전체 목록이 삭제되었습니다");
        setMyListData([]);
      } else {
        console.error("데이터를 불러오지 못했습니다.");
      }
    } catch (error) {
      console.error("서버 에러:", error);
      alert("서버 에러 발생");
    }
  };

  const handleSelectedDelete = async () => {
    if (selectedIsbns.length === 0) {
      alert("선택된 항목이 없습니다.");
      return;
    }

    console.log(userId, selectedIsbns);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/cart/delete`,
        {
          userId,
          isbn: selectedIsbns,
        }
      );
      if (response.status === 200) {
        alert("선택된 목록이 삭제되었습니다.");
        setMyListData((prevData) =>
          prevData.filter((mylist) => !selectedIsbns.includes(mylist.isbn))
        );
        setSelectedIsbns([]);
      } else {
        console.error("데이터를 불러오지 못했습니다.");
      }
    } catch (error) {
      console.error("서버 에러:", error);
      alert("서버 에러 발생");
    }
  };

  // const handleSelectedPurchase = () => {
  //   if (selectedIsbns.length > 0) {
  //     sessionStorage.setItem("selectedIsbns", JSON.stringify(selectedIsbns));
  //     router.push("Other/purchase?type=cartselect");
  //   } else {
  //     alert("선택된 항목이 없습니다.");
  //   }
  // };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {myListData.length > 0 ? (
        <div className="w-[80%] mx-auto ml-8 font-TTL">
          <p className="font-bold text-[1.8rem]">장바구니</p>
          <div className="w-full h-[30px] bg-gradient-to-r from-emerald-400 to-emerald-500 mt-2 flex justify-end items-center pr-4">
            <p className="font-semibold text-white">{`나의 장바구니 개수 : ${myListData.length}개`}</p>
          </div>
          <div className="flex justify-end">
            {selectedIsbns.length > 0 ? (
              <>
                <button
                  className="text-gray-500 border-2 border-gray-500 py-2 px-4 mt-3 rounded ml-4 hover:text-gray-600 hover:border-gray-600"
                  onClick={handleSelectedDelete}
                >
                  선택 삭제
                </button>
              </>
            ) : (
              <>
                <Link href={"Other/purchase?type=cart"}>
                  <button className="text-emerald-500 border-2 border-emerald-500 py-2 px-4 mt-3 rounded">
                    전체 구매
                  </button>
                </Link>
                <button
                  className="text-gray-500 border-2 border-gray-500 py-2 px-4 mt-3 rounded ml-4 hover:text-gray-600 hover:border-gray-600"
                  onClick={handleMyBasketAllDelete}
                >
                  전체 삭제
                </button>
              </>
            )}
          </div>
          {myListData.map((mylist: MyList) => (
            <div key={mylist.isbn} className="flex items-center w-full">
              <input
                type="checkbox"
                checked={selectedIsbns.includes(mylist.isbn)}
                onChange={() => handleCheckboxChange(mylist.isbn)}
                className="mr-4 w-5 h-5 flex-shrink-0"
              />
              <div className="flex-grow">
                <MyBasketListDetail
                  title={mylist.title}
                  cover={mylist.cover}
                  price={mylist.price}
                  isbn={mylist.isbn}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <MyNan title="장바구니가 비어있어요🥹" />
      )}
    </>
  );
}
