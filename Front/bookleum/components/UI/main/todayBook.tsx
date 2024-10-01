import Image from "next/image";
import React from "react";

export default function TodayBook() {
  return (
    <div className="w-[60%] mt-8">
      <div className="font-bold text-[2.3rem] my-4">
        <p>Today Book</p>
      </div>
      <div className="flex justify-between">
        <Image src="/book.png" width={200} height={100} alt="today book" />
        <div className="px-12">
          <p className="mb-4">언젠가 우리가 같은 별을 바라본다면</p>
          <p className="mb-4">작가 : 차인표</p>
          <p className="mb-4">
            고국을 떠나 70년 만에 필리핀의 한 작은 섬에서 발견된 쑤니 할머니의
            젊은 시절을 담은 이야기이다. 작가는 우리나라가 일본에 주권을 빼앗긴
            채 가난하고 핍박받던 시절을 맨몸으로 버텨 낸 우리 어머니의 어머니,
            아버지의 아버지들의 이야기를 남기고자 집필을 시작했다. A4 용지 스무
            장 분량으로 시작한 이야기는 10년의 집필 기간 동안 데이터 유실로
            의지가 꺾이기도 하고 모든 것을 원점에서 복기하기를 반복하는 등
            우여곡절을 겪은 후, 더욱 진정성과 사실에 근거한 서정적이고 아름다운
            소설로 완성되었다.
          </p>
        </div>
      </div>
    </div>
  );
}
