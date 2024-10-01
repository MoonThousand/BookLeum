"use client";

import React, { useState } from "react";

import Address from "@/components/UI/signup/address";
import Input from "@/components/UI/login/Input";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const [passwordError, setPasswordError] = useState(false);
  const [idCheck, setIdCheck] = useState(false);
  const router = useRouter();

  const handleAdress = (addr: string) => {
    setAddress(addr);
  };

  const validateBirthDate = (birthDate: string) => {
    if (!/^\d{8}$/.test(birthDate)) {
      return false;
    }

    const year = parseInt(birthDate.slice(0, 4), 10);
    const month = parseInt(birthDate.slice(4, 6), 10);
    const day = parseInt(birthDate.slice(6), 10);

    const date = new Date(year, month - 1, day);

    if (
      date.getFullYear() !== year ||
      date.getMonth() + 1 !== month ||
      date.getDate() !== day
    ) {
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formattedBirthDate = `${birthDate.slice(0, 4)}-${birthDate.slice(
      4,
      6
    )}-${birthDate.slice(6)}`;

    const fullAddress = `${address} ${detailAddress}`;

    if (
      !userId ||
      !password ||
      !passwordCheck ||
      !email ||
      !name ||
      !phone ||
      !address ||
      !birthDate
    ) {
      alert("빈 칸을 입력해주세요");
      return;
    }

    if (!idCheck) {
      alert("아이디 중복검사를 진행해주세요");
      return;
    }

    if (password !== passwordCheck) {
      setPasswordError(true);
      alert("비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
      return;
    } else {
      setPasswordError(false);
    }

    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!validateEmail(email)) {
      alert("유효하지 않은 이메일 형식입니다.");
      return;
    }

    const validatePhone = (phone: string) => {
      const phoneRegex = /^\d{11}$/;
      return phoneRegex.test(phone);
    };

    if (!validatePhone(phone)) {
      alert("전화번호는 11자리여야 합니다.");
      return;
    }

    if (!validateBirthDate(birthDate)) {
      alert("유효하지 않은 생년월일입니다.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/join/new`,
        {
          userId,
          password,
          email,
          name,
          phone,
          address: fullAddress,
          birthDate: formattedBirthDate,
        }
      );

      if (response.status === 200) {
        router.push("/");
        console.log("회원가입 성공");
      } else {
        console.error("회원가입 실패 - 서버 응답이 200이 아님");
        alert("회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원가입 실패", error);
      alert("회원가입에 실패했습니다. 다시 시도해주세요");
    }
  };

  const handleIdCheck = async () => {
    if (userId === "") {
      alert("아이디를 입력해주세요");
    } else {
      try {
        const response = await axios.get(
          `http://220.120.143.96:7070/join/check/userid/${userId}`
        );

        if (response.status === 200) {
          alert("사용할 수 있는 아이디입니다.");
          setIdCheck(true);
        } else {
          alert("이미 존재하는 아이디입니다");
        }
      } catch (error) {
        console.error("아이디 전송 실패", error);
        alert("이미 존재하는 아이디입니다. 다시 시도해주세요.");
      }
    }
  };

  const handleFocus = () => {
    setPasswordError(false); // 포커스 시 오류 상태 초기화
  };

  return (
    <div className="w-[70%] mx-auto mt-8">
      <div className="flex flex-col">
        <span className="font-bold text-[1.5rem]">회원 가입</span>
        <div className="w-full h-[4px] bg-black mt-2"></div>
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="mt-4">
          <div className="flex items-center w-full">
            <Input
              label="아이디"
              value={userId}
              onChange={(value) => {
                setUserId(value);
                setIdCheck(false);
              }}
              placeholder="아이디를 입력해주세요"
            />
            <button
              onClick={handleIdCheck}
              className={`bg-gray ml-2 px-4 py-2 border border-[#C7C8CC] text-[#C7C8CC] rounded-md hover:cursor-pointer hover:border-[#9fa0a6] hover:text-[#9fa0a6]`}
            >
              중복 확인
            </button>
          </div>
          <div className="flex items-center w-full">
            <Input
              label="비밀번호"
              value={password}
              onChange={setPassword}
              placeholder="비밀번호를 입력해주세요"
            />
          </div>
          <div className="flex items-center w-full">
            <Input
              label="비밀번호 재입력"
              value={passwordCheck}
              onChange={setPasswordCheck}
              onFocus={handleFocus}
              className={`${passwordError ? "border-[#EF5A6F]" : ""}`}
              placeholder="비밀번호를 다시 입력해주세요"
            />
          </div>
          <div className="flex items-center w-full">
            <Input
              label="이메일"
              value={email}
              onChange={setEmail}
              placeholder="이메일을 입력해주세요"
            />
          </div>
        </div>
        <div className="mt-14">
          <div className="flex items-center w-full">
            <Input
              label="이름"
              value={name}
              onChange={setName}
              placeholder="이름을 입력해주세요"
            />
          </div>
          <div className="flex items-center w-full">
            <Input
              label="전화번호"
              value={phone}
              onChange={setPhone}
              placeholder="전화번호를 입력해주세요 ex)01012345678"
            />
          </div>
          <div className="flex flex-col w-full">
            <Address handleAdress={handleAdress} />
            <Input
              label="상세주소"
              value={detailAddress}
              onChange={setDetailAddress}
              placeholder="상세 주소"
            />
          </div>
          <div className="flex items-center w-full">
            <Input
              label="생년월일"
              value={birthDate}
              onChange={setBirthDate}
              placeholder="생년월일을 입력해주세요 ex)19890122"
            />
          </div>
        </div>
        <div className="w-full flex justify-center mb-8">
          <button
            className="mt-8 p-2 bg-black text-white w-[70%] border border-gray-400 rounded-md hover:bg-[#252323]"
            onClick={handleSubmit}
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
}
