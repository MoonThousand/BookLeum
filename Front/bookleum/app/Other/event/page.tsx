"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import axios from "axios";

interface Event {
  title: string;
  id: number;
  author: string;
  createdDate: string;
}

export default function Event() {
  const [eventList, setEventList] = useState<Event[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/main/event/list`
        );
        if (response.status === 200) {
          console.log(response.data);
          const eventData = response.data.map((event: Event) => {
            return {
              author: event.author,
              title: event.title,
              id: event.id,
              createdDate: event.createdDate,
            };
          });
          setEventList(eventData);
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("ko-KR", options).replace(/ /g, ""); // 공백 제거
  };

  return (
    <div className="w-[80%] mx-auto mt-12">
      <div className="flex justify-center mb-8">
        <Image src="/eventLogo.png" width={800} height={100} alt="today book" />
      </div>
      <div>
        <ul className="flex items-center pl-2 pt-2 font-bold">
          <li className="w-[25%]">글쓴이</li>
          <li className="w-[55%]">제목</li>
          <li className="w-[25%]">등록일</li>
        </ul>
        <div className="w-full h-[2px] bg-black mt-2"></div>
      </div>
      {eventList.map((event: Event) => (
        <div className="py-3" key={event.id}>
          <Link href={`/Other/event/${event.id}`}>
            <ul className="flex items-center pl-2 pt-2">
              <li className="w-[25%]">{event.author}</li>
              <li className="w-[55%]">{event.title}</li>
              <li className="w-[25%]">{formatDate(event.createdDate)}</li>
            </ul>
          </Link>
        </div>
      ))}
    </div>
  );
}
