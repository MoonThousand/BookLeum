"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { formatDate } from "@/utils/formatDate";

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

  return (
    <div className="w-full mx-auto font-TTL bg-[#FFF8E8]">
      <div className="flex justify-center mb-8 pt-12">
        <Image src="/eventLogo.png" width={800} height={100} alt="today book" />
      </div>
      <div className="w-[75%] mx-auto flex justify-end">
        <Link href="/Other/event/create">
          <button className="py-2 px-4 border-2 border-orange-300 bg-orange-300 rounded-lg hover:bg-orange-400">
            작성하기
          </button>
        </Link>
      </div>
      <div className="w-[95%] mx-auto py-12 rounded-md">
        <div className="w-[80%] mx-auto pb-4">
          <ul className="flex items-center px-4 pt-2 font-bold">
            <li className="w-[20%]">No.</li>
            <li className="w-[40%]">제목</li>
            <li className="w-[20%]">글쓴이</li>
            <li className="w-[20%]">등록일</li>
          </ul>
        </div>
        {eventList.map((event: Event, index) => (
          <div className="py-3 w-[80%] mx-auto bg-white px-4" key={event.id}>
            <Link href={`/Other/event/${event.id}`}>
              <ul className="flex items-center pl-2 pt-2 border-b border-gray-300 pb-4">
                <li className="w-[20%]">{index + 1}</li>
                <li className="w-[40%]">{event.title}</li>
                <li className="w-[20%]">
                  <p className="bg-orange-500 inline-block min-w-[80px] px-4 rounded-full text-white text-center">
                    {event.author}
                  </p>
                </li>
                <li className="w-[20%]">{formatDate(event.createdDate)}</li>
              </ul>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
