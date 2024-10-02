"use client";

import React, { useState } from "react";

import Input from "@/components/login/Input";
import Link from "next/link";
import axios from "axios";
import { setCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { userLogin } from "@/redux/slices/authSlice";

export default function LogIn() {
  const [userId, setId] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async () => {
    if (userId === "" || password === "") {
      alert("빈 칸을 채워주세요");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/login`,
        {
          userId,
          password,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const { access, refresh } = response.data;

        setCookie("accessToken", access, { maxAge: 60 * 60 * 1 });
        setCookie("refreshToken", refresh, { maxAge: 60 * 60 * 24 * 7 });

        dispatch(userLogin());
        router.push("/");
        console.log("로그인 성공");
      } else {
        console.error("로그인 실패 - 서버 응답이 200이 아님");
        alert("아이디 또는 비밀번호가 틀립니다.");
      }
    } catch (error) {
      console.error("로그인 실패", error);
      alert("아이디 또는 비밀번호가 틀립니다.");
    }
  };

  return (
    <div className="w-[60%] mx-auto mt-8">
      <div>
        <span className="font-bold text-[1.5rem]">로그인</span>
        <div className="w-full h-[2px] bg-[#9b8e61] mt-2"></div>
      </div>

      <div className="flex flex-col items-center mt-4">
        <Input label="ID" value={userId} onChange={setId} placeholder="ID" />
        <Input
          label="Password"
          value={password}
          onChange={setPassword}
          placeholder="Password"
        />
      </div>

      <div className="w-[70%] mx-auto flex flex-col items-center justify-center mt-4">
        <button
          onClick={handleLogin}
          className="mt-4 p-2 bg-[#98bc91] text-white rounded-md w-full border border-gray-400"
        >
          Log In
        </button>

        <button className="mt-4 p-2 bg-gray-200 rounded-md w-full border border-gray-400">
          <Link
            href="/Login/signup"
            className="w-full h-full flex items-center justify-center"
          >
            Sign Up
          </Link>
        </button>
      </div>
    </div>
  );
}
