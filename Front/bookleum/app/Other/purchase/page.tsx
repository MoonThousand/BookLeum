"use client";

import React, { useEffect, useState } from "react";

import Address from "@/components/signup/address";
import Input from "@/components/login/Input";
import PurchaseList from "@/components/purchase/purchaseList";
import PurchaseSummation from "@/components/purchase/purchaseSummation";
import axios from "axios";
import { getCookie } from "cookies-next";

interface MyList {
  title: string;
  price: string; // 가격이 문자열로 저장되어 있음
  cover: string;
  isbn: string;
  quantity: number;
}

export default function Purchase() {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [myListData, setMyListData] = useState<MyList[]>([]);
  const [recipient, setRecipient] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [memo, setMemo] = useState("");
  const [requestOrderDetailsList, setRequestOrderDetailsList] = useState([]);

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
          const myListData = response.data.map((data: MyList) => {
            const originalCoverUrl = data.cover;
            const modifiedCoverUrl = originalCoverUrl.replace(
              "/coversum/",
              "/cover500/"
            );

            return {
              isbn: data.isbn,
              title: data.title,
              cover: modifiedCoverUrl,
              price: data.price,
              quantity: data.quantity,
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

  console.log(myListData);

  const totalPrice = myListData.reduce((acc, item) => {
    return acc + parseFloat(item.price) * item.quantity;
  }, 0);

  const handlePurchase = async () => {
    if (recipient === "" || phone === "" || address === "" || memo === "") {
      alert("빈 칸을 입력해주세요");
    } else {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/order/purchase`,
          {
            userId,
            recipient,
            phone,
            address,
            memo,
            requestOrderDetailsList,
          }
        );
        if (response.status === 200) {
          console.log("데이터 전송 성공");
        } else {
          console.error("데이터를 불러오지 못했습니다.");
        }
      } catch (error) {
        console.error("서버 에러:", error);
        alert("서버 에러 발생");
      }
    }
  };

  const handleAdress = (addr: string) => {
    setAddress(addr);
  };

  return (
    <div className="w-[80%] mx-auto mt-12">
      <div>
        <p className="font-bold text-[1.7rem] mb-4">주문/결제</p>
        <ul className="flex justify-center items-center pl-2 pt-2 font-bold border-y-2 border-gray-700 py-2">
          <li className="w-[60%] flex justify-center">상풍정보</li>
          <li className="w-[15%] flex justify-center">수량</li>
          <li className="w-[25%] flex justify-center">금액</li>
        </ul>
        {myListData.map((data: MyList) => (
          <PurchaseList
            key={data.isbn}
            title={data.title}
            cover={data.cover}
            price={data.price}
            quantity={data.quantity}
          />
        ))}
      </div>
      <div className="flex  mt-16">
        <div className="w-[50%]">
          <p className="font-bold text-[1.4rem] mb-4">배송지 정보</p>
          <div className="flex items-center w-full">
            <Input
              label="수령인"
              value={recipient}
              onChange={setRecipient}
              placeholder="수령인을 입력해주세요"
            />
          </div>
          <div className="flex items-center w-full">
            <Input
              label="전화 번호"
              value={phone}
              onChange={setPhone}
              placeholder="전화번호를 입력해주세요"
            />
          </div>
          <div className="flex flex-col w-full">
            <Address handleAdress={handleAdress} />
            <Input
              label="상세주소"
              value={detailAddress}
              onChange={setDetailAddress}
              placeholder="상세 주소"
            />
          </div>
          <div className="flex items-center w-full">
            <Input
              label="배송 메모"
              value={memo}
              onChange={setMemo}
              placeholder="배송 메모를 입력해주세요"
            />
          </div>
        </div>
        <PurchaseSummation price={totalPrice} tip={3000} />
      </div>
      <div className="border-2 border-gray-700 w-[15rem] h-[50px] mx-auto mt-16 rounded-lg hover:bg-gray-100">
        <button className="font-bold text-[1.5rem] w-full h-full flex justify-center items-center">
          <p>결제 하기</p>
        </button>
      </div>
    </div>
  );
}
