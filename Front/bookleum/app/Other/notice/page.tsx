"use client";

import React, { useState } from "react";

import Inquiry from "@/components/notice/inquiry";
import NoticeDetail from "@/components/notice/noticeDetail";
import Question from "@/components/notice/question"; // 추가된 부분
import SideMenu from "@/components/notice/sideMenu";

export default function Notice() {
  const [select, setSelect] = useState(1);

  return (
    <div className="w-[80%] mx-auto flex mt-12">
      <SideMenu
        select={select}
        setSelect={setSelect}
        mainTitle="고객센터"
        subTitle="공지사항"
        subTitle2="자주하는 질문"
        subTitle3="1:1문의"
      />
      {select === 1 && <NoticeDetail />}
      {select === 2 && <Question />}
      {select === 3 && <Inquiry />}
    </div>
  );
}
