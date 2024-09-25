"use client";

import React, { useState } from "react";

import Input from "@/components/UI/login/Input";
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
    // if (!email.includes("@")) {
    //   alert("이메일을 다시 확인해주세요.");
    //   return;
    // }

    // if (!/(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])/g.test(password)) {
    //   alert("비밀번호가 틀립니다.");
    //   return;
    // }

    try {
      const response = await axios.post(
        `http://220.120.143.96:7070/login`,
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
        alert("로그인에 실패했습니다.");
      }
    } catch (error) {
      console.error("로그인 실패", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className="w-[60%] mx-auto mt-8">
      <div>
        <span className="font-bold text-[1.5rem]">로그인</span>
        <div className="w-full h-[4px] bg-black mt-2"></div>
      </div>

      <div className="flex flex-col items-center mt-4">
        <Input label="ID" value={userId} onChange={setId} />
        <Input label="Password" value={password} onChange={setPassword} />
      </div>

      <div className="w-[70%] mx-auto flex flex-col items-center justify-center mt-4">
        <button
          onClick={handleLogin}
          className="mt-4 p-2 bg-black text-white rounded w-full border border-gray-400"
        >
          Log In
        </button>
        <button className="mt-4 p-2 bg-gray-200 rounded w-full border border-gray-400">
          Sign Up
        </button>
      </div>
    </div>
  );
}
