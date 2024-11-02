"use client";

import React, { useState } from "react";

import BookMark from "@/components/mypage/BookMark";
import InformationModify from "@/components/mypage/InformationModify";
import MyBasketList from "@/components/mypage/MyBasketList";
import OrderList from "@/components/mypage/OrderList";
import SideMenu from "@/components/notice/sideMenu";

export default function Mypage() {
  const [select, setSelect] = useState(1);
  return (
    <div className="w-[80%] mx-auto flex mt-12 font-TTL min-h-[350px]">
      <SideMenu
        select={select}
        setSelect={setSelect}
        mainTitle="마이페이지"
        subTitle="주문내역 조회"
        subTitle2="장바구니"
        subTitle3="찜 목록"
        subTitle4="내 정보 조회"
        type="mypage"
      />

      {select === 1 && <OrderList />}
      {select === 2 && <MyBasketList />}
      {select === 3 && <BookMark />}
      {select === 4 && <InformationModify />}
    </div>
  );
}
