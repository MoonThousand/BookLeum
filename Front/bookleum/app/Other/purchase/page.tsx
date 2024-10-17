"use client";

import React, { useEffect, useState } from "react";

import Address from "@/components/signup/address";
import Input from "@/components/login/Input";
import PurchaseList from "@/components/purchase/purchaseList";
import PurchaseSummation from "@/components/purchase/purchaseSummation";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

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
  const [recipientError, setRecipientError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const router = useRouter();

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

  const totalPrice = myListData.reduce((acc, item) => {
    return acc + parseFloat(item.price) * item.quantity;
  }, 0);

  const handlePurchase = async () => {
    if (!recipient || !phone || !address || !memo) {
      alert("빈 칸을 입력해주세요");
      return;
    }

    const fullAddress = `${address} ${detailAddress}`;

    const requestOrderDetailsList = myListData.map((item) => ({
      isbn: item.isbn,
      title: item.title,
      price: parseFloat(item.price), // 문자열인 가격을 숫자로 변환
      cover: item.cover,
      quantity: item.quantity,
    }));

    console.log(
      userId,
      recipient,
      phone,
      fullAddress,
      memo,
      requestOrderDetailsList
    );

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user/order/purchase`,
        {
          userId,
          type: "CART",
          recipient,
          phone,
          address: fullAddress,
          memo,
          requestOrderDetailsList,
        }
      );

      if (response.status === 200) {
        console.log("구매 성공");
        alert("구매가 완료되었습니다");
        router.push("/");
      } else {
        console.error("데이터를 불러오지 못했습니다.");
        alert("구매에 실패하였습니다");
      }
    } catch (error) {
      console.error("서버 에러:", error);
      alert("서버 에러 발생");
    }
  };

  const handleAdress = (addr: string) => {
    setAddress(addr);
  };

  const validateRecipient = (value: string) => {
    const regex = /^[가-힣]{1,15}$/;
    if (!regex.test(value)) {
      setRecipientError("수령인 이름은 한글 1~15자여야 합니다.");
    } else {
      setRecipientError("");
    }
    setRecipient(value);
  };

  const validatePhone = (value: string) => {
    const regex = /^\d{11}$/;
    if (!regex.test(value)) {
      setPhoneError("전화번호는 숫자 11자리여야 합니다.");
    } else {
      setPhoneError("");
    }
    setPhone(value);
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
          <div className="w-full mb-2">
            <div className="flex items-center w-full">
              <Input
                label="수령인"
                value={recipient}
                onChange={(value) => validateRecipient(value)}
                placeholder="수령인을 입력해주세요"
              />
            </div>
            {recipientError && (
              <p className="text-red-500 text-sm">{recipientError}</p>
            )}
          </div>
          <div className="w-full mb-2">
            <div className="flex items-center w-full">
              <Input
                label="전화 번호"
                value={phone}
                onChange={(value) => validatePhone(value)}
                placeholder="전화번호를 입력해주세요"
              />
            </div>
            {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
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
        <button
          className="font-bold text-[1.5rem] w-full h-full flex justify-center items-center"
          onClick={handlePurchase}
        >
          <p>결제 하기</p>
        </button>
      </div>
    </div>
  );
}
