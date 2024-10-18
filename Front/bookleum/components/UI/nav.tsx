"use client";

import React, { useEffect, useState } from "react";
import { deleteCookie, getCookie } from "cookies-next";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, userLogout } from "@/redux/slices/authSlice";

import { FaTree } from "react-icons/fa6";
import { IoIosLock } from "react-icons/io";
import { IoIosUnlock } from "react-icons/io";
import Link from "next/link";
import NavList from "./nav/navList";
import NavLogo from "./nav/navLogo";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

export default function Nav() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getCookie("accessToken") as string | undefined;
    if (token) {
      dispatch(userLogin());
    }
    setLoading(false);
  }, [dispatch]);

  const handleLogout = () => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    deleteCookie("userId");
    dispatch(userLogout());
    router.push("/");
  };

  if (loading) {
    return null;
  }

  return (
    <div className="flex items-center shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] px-6 h-20">
      <NavList />
      <NavLogo />
      {!isLoggedIn ? (
        <div className=" flex-grow w-[33%] flex justify-end">
          <button className="bg-[#ddebda] px-4 py-2 rounded-full mr-4 hover:cursor-pointer hover:bg-[#d7e7d4] w-32 flex items-center justify-center border border-[#b9d7b4]">
            <Link href="/Login/login" className="flex items-center">
              <div className="flex justify-center items-center bg-white rounded-full p-1 w-8 h-8 mr-2">
                <IoIosUnlock className="text-[#A4C49E]" />
              </div>
              <p className="font-bold text-gray-500 font-TTL">로그인</p>
            </Link>
          </button>
        </div>
      ) : (
        <div className=" flex-grow w-[33%] flex justify-end items-center">
          <Link href="/Mypage">
            <button className="mr-12 font-semibold font-TTL flex items-center">
              <FaTree className="mr-2 text-green-700" />
              {`마이페이지`}
            </button>
          </Link>
          <button
            className="bg-gray-200 px-4 py-2 rounded-full mr-4 hover:cursor-pointer hover:bg-gray-300 w-36 flex items-center justify-center border border-gray-300"
            onClick={handleLogout}
          >
            <div className="flex justify-center items-center bg-white rounded-full p-1 w-8 h-8 mr-2">
              <IoIosLock className="text-gray-500" />
            </div>
            <p className="font-bold text-gray-600 font-TTL">로그아웃</p>
          </button>
        </div>
      )}
    </div>
  );
}
