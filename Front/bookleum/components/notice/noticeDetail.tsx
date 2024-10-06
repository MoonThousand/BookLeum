"use client";

import React, { useEffect, useState } from "react";

import axios from "axios";

interface Notice {
  id: number;
  title: string;
  createDate: string;
}

export default function NoticeDetail() {
  const [noticeList, setNoticeList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/main/notice/list`
        );
        if (response.status === 200) {
          const noticeData = response.data.map((notice: Notice) => {
            return {
              title: notice.title,
              id: notice.id,
              createDate: notice.createDate,
            };
          });
          setNoticeList(noticeData);
        } else {
          console.error("데이터를 불러오지 못했습니다.");
        }
      } catch (error) {
        console.error("서버 에러:", error);
        alert("서버 에러 발생");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-[70%] mx-auto">
      <div>
        <p className="pl-2 font-bold text-[2rem]">공지사항</p>
        <div className="w-full h-[4px] bg-black mt-2"></div>
        <ul className="flex items-center pl-2 pt-2">
          <li className="w-[20%]">No.</li>
          <li className="w-[50%]">제목</li>
          <li className="w-[30%]">등록일</li>
        </ul>
        <div className="w-full h-[2px] bg-black mt-2"></div>
      </div>
      {noticeList.map((notice: Notice, index) => (
        <div className="py-3" key={notice.id}>
          <ul className="flex items-center pl-2 pt-2">
            <li className="w-[20%]">{index + 1}.</li>
            <li className="w-[50%]">{notice.title}</li>
            <li className="w-[30%]">2024.01.26</li>
          </ul>
        </div>
      ))}
    </div>
  );
}
