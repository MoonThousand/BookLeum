import BookDetailContent from "@/components/UI/main/bookDetailContent";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import React from "react";
import ReviewDetail from "@/components/UI/main/reviewDetail";

export default function BookDetail() {
  return (
    <div className="w-[90%] mx-auto mt-16">
      <div className="flex justify-around items-center">
        <Image src="/book.png" width={250} height={100} alt="main logo Image" />
        <div>
          <p className="my-2 text-[2rem]">흔한남매17</p>
          <p className="text-[1.1rem]">
            저자 : 흔한남매 17 | 출판사 : 토네이도 | 출판일 20204-09-19
          </p>
          <div className="w-full h-[2px] bg-gray-400 my-6"></div>
          <p className="text-[1.1rem]">판매가 : 12000원</p>
          <p className="my-3 text-[1.1rem]">배송료 : 3000원</p>
          <p className="flex items-center">
            <FaStar className="text-[#FF4E88] text-[2rem]" />
            <b className="text-[1.2rem] ml-4">3.9</b>
          </p>
          <div className="w-full h-[2px] bg-gray-400 my-6"></div>
        </div>
      </div>
      <BookDetailContent
        title="책 소개"
        content="고국을 떠나 70년 만에 필리핀의 한 작은 섬에서 발견된 쑤니 할머니의
            젊은 시절을 담은 이야기이다. 작가는 우리나라가 일본에 주권을 빼앗긴
            채 가난하고 핍박받던 시절을 맨몸으로 버텨 낸 우리 어머니의 어머니,
            아버지의 아버지들의 이야기를 남기고자 집필을 시작했다."
      />
      <BookDetailContent
        title="목차"
        content="01화 흔한남매의 단소 불기 도전!02화 첨벙첨벙 신나는 물놀이알쏭달쏭
            다른 그림 찾기03화 남매와 자매의 자존심 싸움04화 으뜸이가 잠든
            사이꼬불꼬불 미로 찾기05화 만약 게임이 학교 공부라면?06화 수수께끼
            악몽에서 탈출하라!풀면 풀수록 웃음 터지는 개그 난센스 퀴즈"
      />
      <BookDetailContent
        title="작가 소개"
        content=" SBS 코미디 프로그램 ‘웃찾사’에서 만난 으뜸이와 다운이는 어떻게 하면
            더 많은 사람들에게 웃음을 줄 수 있을까 고민하던 중 유튜브 코미디
            콘텐츠를 만들게 되었어요. 그리고 어느덧 많은 사람들에게 사랑받는
            인기 크리에이터가 되었지요. 흔한남매는 지금도 여러분에게 웃음을 주기
            위해 계속 노력하고 있답니다."
      />

      <ReviewDetail />
    </div>
  );
}
