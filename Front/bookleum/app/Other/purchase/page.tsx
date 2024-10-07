"use client";

import React, { useState } from "react";

import Address from "@/components/signup/address";
import Input from "@/components/login/Input";
import PurchaseList from "@/components/purchase/purchaseList";

export default function Purchase() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [memo, setMemo] = useState("");

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
        <PurchaseList />
        <PurchaseList />
        <PurchaseList />
      </div>
      <div className="flex  mt-16">
        <div className="w-[50%]">
          <p className="font-bold text-[1.4rem] mb-4">배송지 정보</p>
          <div className="flex items-center w-full">
            <Input
              label="수령인"
              value={name}
              onChange={setName}
              placeholder="수령인을 입력해주세요"
            />
          </div>
          <div className="flex items-center w-full">
            <Input
              label="전화 번호"
              value={phoneNumber}
              onChange={setPhoneNumber}
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
        <div className="w-[50%] mt-8 bg-gray-300 py-4 px-6 flex flex-col justify-evenly border-2 border-gray-400">
          <p className="text-[1.4rem] mb-4 pl-4 font-bold">결제 금액</p>
          <div className="w-full h-[2px] bg-black mt-2"></div>
          <span className="flex justify-between">
            <p className="text-[1.3rem] mb-4 pl-4">주문 금액</p>
            <p className="pr-4 text-[1.3rem] font-bold">37500원</p>
          </span>
          <span className="flex justify-between">
            <p className="text-[1.3rem] mb-4 pl-4">배송비</p>
            <p className="pr-4 text-[1.3rem] font-bold">3000원</p>
          </span>
          <div className="w-full h-[2px] bg-black mt-2"></div>
          <span className="flex justify-between">
            <p className="text-[1.3rem] mb-4 pl-4">총 결제 금액</p>
            <p className="pr-4 text-[1.3rem] font-bold">40500원</p>
          </span>
        </div>
      </div>
      <div className="border-2 border-gray-700 w-[15rem] h-[50px] mx-auto mt-16 rounded-lg hover:bg-gray-100">
        <button className="font-bold text-[1.5rem] w-full h-full flex justify-center items-center">
          <p>결제 하기</p>
        </button>
      </div>
    </div>
  );
}
