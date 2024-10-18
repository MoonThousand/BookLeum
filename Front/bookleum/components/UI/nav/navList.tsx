import Link from "next/link";
import React from "react";

export default function NavList() {
  return (
    <div className=" flex-grow w-[33%]">
      <ul className="flex justify-evenly font-TTL font-semibold">
        <li>
          <Link href="/Other/best">베스트 셀러</Link>
        </li>
        <li>
          <Link href="/Other/new">새로나온 책</Link>
        </li>
        <li>
          <Link href="/Other/event">이벤트</Link>
        </li>
        <li>
          <Link href="/Other/notice">공지사항</Link>
        </li>
      </ul>
    </div>
  );
}
