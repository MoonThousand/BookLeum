"use client";

import { useDispatch, useSelector } from "react-redux";

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
    <div className="flex items-center mt-4">
      <div className=" flex-grow w-[33%]">
        <ul className="flex justify-evenly">
          <li>베스트 셀러</li>
          <li>신간 리스트</li>
          <li>Event</li>
          <li>공지사항</li>
        </ul>
      </div>
      <div className=" mx-auto w-[34%] flex justify-center">
        <p className="font-bold text-[3rem]">
          <Link href="/">Book Leum</Link>
        </p>
      </div>
      {!isLoggedIn ? (
        <div className=" flex-grow w-[33%] flex justify-end">
          <button className="bg-gray-200 p-2 rounded-lg mr-4 hover:cursor-pointer hover:bg-gray-100">
            <Link href="/Login/login">Log in</Link>
          </button>
          <button className="bg-black text-white p-2 rounded-lg hover:cursor-pointer hover:bg-gray-100">
            <Link href="/Login/signup">Sign up</Link>
          </button>
        </div>
      ) : (
        <div className=" flex-grow w-[33%] flex justify-end">
          <button
            onClick={handleLogout}
            className="bg-black text-white p-2 rounded-lg hover:cursor-pointer hover:bg-gray-100"
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
