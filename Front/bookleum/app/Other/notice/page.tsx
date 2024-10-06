"use client";

import React, { useState } from "react";

import Inquiry from "@/components/notice/inquiry";
import NoticeDetail from "@/components/notice/noticeDetail";
import Question from "@/components/notice/question"; // 추가된 부분
import SideMenu from "@/components/notice/sideMenu";

export default function Notice() {
  const [notice, setNotice] = useState(1);

  return (
    <div className="w-[80%] mx-auto flex mt-12">
      <SideMenu notice={notice} setNotice={setNotice} />
      {notice === 1 && <NoticeDetail />}
      {notice === 2 && <Question />}
      {notice === 3 && <Inquiry />}
    </div>
  );
}
