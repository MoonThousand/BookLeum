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

    console.log(userId, password);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/login`,
        {
          userId,
          password,
        }
      );

      if (response.status === 200) {
        console.log(response);
        const { access, refresh, userId } = response.data;

        setCookie("accessToken", access, { maxAge: 60 * 60 * 1 });
        setCookie("refreshToken", refresh, { maxAge: 60 * 60 * 24 * 7 });
        setCookie("userId", userId, { maxAge: 60 * 60 * 1 });

        dispatch(userLogin());
        if (window.history.length > 1) {
          router.back();
        } else {
          router.push("/");
        }
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
    <div className="w-[60%] mx-auto mt-8 font-TTL">
      <div>
        <span className="font-bold text-[1.5rem]">로그인</span>
        <div className="w-full h-[2px] bg-gray-700 mt-2"></div>
      </div>

      <div className="flex flex-col items-center mt-8">
        <Input label="ID" value={userId} onChange={setId} placeholder="ID" />
        <Input
          label="Password"
          value={password}
          onChange={setPassword}
          placeholder="Password"
        />
      </div>

      <div className="w-[70%] mx-auto flex flex-col items-center justify-center mt-8">
        <button
          onClick={handleLogin}
          className="mt-4 p-2 bg-[#98bc91] text-white rounded-md w-[80%] border border-gray-400"
        >
          로그인
        </button>

        <button className="mt-4 p-2 bg-gray-200 rounded-md w-[80%] border border-gray-400">
          <Link
            href="/Login/signup"
            className="w-full h-full flex items-center justify-center"
          >
            회원가입
          </Link>
        </button>
      </div>
    </div>
  );
}
