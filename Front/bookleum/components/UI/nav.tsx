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
        <ul className="flex justify-evenly">
          <li>베스트 셀러</li>
          <li>신간 리스트</li>
          <li>Event</li>
          <li>공지사항</li>
        </ul>
      </div>
      <div className=" mx-auto w-[34%] flex justify-center">
        <div className="font-bold text-[2.7rem]">
          <Link href="/">
            <div className="drop-shadow-[0_0.8px_0.8px_rgba(0,0,0,0.5)]">
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
          <button className="bg-[#F1F1F1] px-4 py-2 rounded-full mr-4 hover:cursor-pointer hover:bg-[#eeeded] w-32 flex items-center justify-center">
            <Link href="/Login/login" className="flex items-center">
              <div className="flex justify-center items-center bg-white rounded-full p-1 w-8 h-8 mr-2">
                <IoIosUnlock className="text-gray-600" />
              </div>
              <p className="font-medium text-gray-700">Log in</p>
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
