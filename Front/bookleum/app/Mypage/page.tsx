"use client";

import React, { useState } from "react";

import BookMark from "@/components/mypage/BookMark";
import InformationModify from "@/components/mypage/InformationModify";
import ShoppingBasket from "@/components/mypage/ShoppingBasket";
import SideMenu from "@/components/notice/sideMenu";

export default function Mypage() {
  const [select, setSelect] = useState(1);
  return (
    <div className="w-[80%] mx-auto flex mt-12">
      <SideMenu
        select={select}
        setSelect={setSelect}
        mainTitle="마이페이지"
        subTitle="내 정보 수정"
        subTitle2="찜 목록"
        subTitle3="주문내역 조회"
      />
      {select === 1 && <InformationModify />}
      {select === 2 && <BookMark />}
      {select === 3 && <ShoppingBasket />}
    </div>
  );
}
