"use client";

import React, { useEffect, useState } from "react";

import Link from "next/link";
import axios from "axios";
import { formatDate } from "@/utils/formatDate";

interface Question {
  questionId: number;
  title: string;
  createdDate: string;
}

export default function Question() {
  const [questionList, setQuestionList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/question/read`
        );
        if (response.status === 200) {
          console.log(response);
          const qustionData = response.data.map((qustion: Question) => {
            return {
              title: qustion.title,
              questionId: qustion.questionId,
              createdDate: qustion.createdDate,
            };
          });
          setQuestionList(qustionData);
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

  console.log(questionList);
  return (
    <div className="w-[70%] mx-auto min-h-[300px]">
      <div>
        <p className="pl-2 font-bold text-[2rem]">자주하는 질문</p>
        <div className="w-full h-[4px] bg-black mt-2"></div>
        <ul className="flex items-center pl-2 pt-2">
          <li className="w-[20%]">No.</li>
          <li className="w-[50%]">제목</li>
          <li className="w-[30%]">등록일</li>
        </ul>
        <div className="w-full h-[2px] bg-black mt-2"></div>
      </div>
      {questionList.map((question: Question, index) => (
        <div className="py-4" key={question.questionId}>
          <Link href={`/Other/notice/questionDetail/${question.questionId}`}>
            <ul className="flex items-center pl-2 pt-2">
              <li className="w-[20%]">{index + 1}.</li>
              <li className="w-[50%]">{question.title}</li>
              <li className="w-[30%]">{formatDate(question.createdDate)}</li>
            </ul>
          </Link>
        </div>
      ))}
    </div>
  );
}
