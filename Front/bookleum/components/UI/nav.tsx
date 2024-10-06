"use client";

import { useDispatch, useSelector } from "react-redux";

import { IoIosUnlock } from "react-icons/io";
import Link from "next/link";
import React from "react";
import { RootState } from "@/redux/store";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { userLogout } from "@/redux/slices/authSlice";

export default function Nav() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    dispatch(userLogout());
    router.push("/");
  };

  return (
    <div className="flex items-center shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] px-6 h-20">
      <div className=" flex-grow w-[33%]">
        <ul className="flex justify-evenly font-Score font-semibold">
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
      <div className=" mx-auto w-[34%] flex justify-center">
        <div className="font-bold text-[2.7rem]">
          <Link href="/">
            <div className="drop-shadow-[0_0.8px_0.8px_rgba(0,0,0,0.5)] font-Score">
              <span className="text-[#88B04B]">Book</span>
              <span
                style={{
                  background:
                    "linear-gradient(to right, #A4C49E, #9b8e61, #2e6b53)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                }}
              >
                Leum
              </span>
            </div>
          </Link>
        </div>
      </div>
      {!isLoggedIn ? (
        <div className=" flex-grow w-[33%] flex justify-end">
          <button className="bg-[#ddebda] px-4 py-2 rounded-full mr-4 hover:cursor-pointer hover:bg-[#d7e7d4] w-32 flex items-center justify-center">
            <Link href="/Login/login" className="flex items-center">
              <div className="flex justify-center items-center bg-white rounded-full p-1 w-8 h-8 mr-2">
                <IoIosUnlock className="text-[#A4C49E]" />
              </div>
              <p className="font-bold text-gray-400 font-Score">로그인</p>
            </Link>
          </button>
        </div>
      ) : (
        <div className=" flex-grow w-[33%] flex justify-end">
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      )}
    </div>
  );
}
