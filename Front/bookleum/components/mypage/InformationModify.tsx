"use client";

import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { deleteCookie, getCookie } from "cookies-next";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { userLogout } from "@/redux/slices/authSlice";

export default function InformationModify() {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    id: "",
    address: "",
    phone: "",
    email: "",
    birth: "",
    password: "",
  });
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const id = getCookie("userId") as string | undefined;
    if (id) {
      setUserId(id);
    }
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/history/read/${userId}`
        );
        if (response.status === 200) {
          console.log(response);
          const userInfoData = response.data;
          setUserData({
            name: userInfoData.name,
            id: userInfoData.userId,
            address: userInfoData.address,
            phone: userInfoData.phone,
            email: userInfoData.email,
            birth: userInfoData.birthDate,
            password: userInfoData.password,
          });
        } else {
          console.error("데이터를 불러오지 못했습니다.");
        }
      } catch (error) {
        console.error("서버 에러:", error);
        alert("서버 에러 발생");
      }
    };

    if (userId !== undefined) {
      fetchData();
    }
  }, [userId]);

  const handleOldPasswordCheck = async () => {
    if (passwordCheck) {
      alert("이미 비밀번호가 확인되었습니다");
      return;
    }

    if (oldPassword === "") {
      alert("비밀번호를 입력해주세요");
    } else {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/history/check-password`,
          {
            userId: userData.id,
            password: oldPassword,
          }
        );
        if (response.status === 200) {
          console.log("비밀번호 확인성공");
          alert("비밀번호가 확인되었습니다.");
          setPasswordCheck(true);
        } else {
          console.log("비밀번호가 틀립니다");
          alert("비밀번호가 틀립니다");
        }
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response) {
          if (error.response.status === 401) {
            console.log("비밀번호가 틀립니다");
            alert("비밀번호가 틀립니다");
          } else {
            console.log(error, "서버에러");
          }
        } else {
          console.error("알 수 없는 에러:", error);
          alert("서버 에러 발생");
        }
      }
    }
  };

  const handlePasswordChange = async () => {
    if (!passwordCheck) {
      alert("기존 비밀번호를 확인해주세요");
      return;
    }

    if (newPassword === "") {
      alert("새로운 비밀번호를 입력해주세요");
      return;
    } else if (newPassword.length < 4) {
      alert("비밀번호는 4자리 이상 입력해주세요");
      return;
    }

    if (passwordCheck) {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/history/change-password`,
          {
            userId: userData.id,
            oldPassword,
            newPassword,
          }
        );
        if (response.status === 200) {
          console.log("비밀번호 변경성공");
          alert("비밀번호가 변경되었습니다.");
          deleteCookie("accessToken");
          deleteCookie("refreshToken");
          deleteCookie("userId");
          dispatch(userLogout());
          router.push("/");
        } else {
          console.log("비밀번호 변경실패");
          alert("비밀번호 변경실패.");
        }
      } catch (error) {
        console.log(error, "서버에러");
      }
    } else {
      alert("기존 비밀번호를 확인해주세요");
    }
  };

  return (
    <div className="w-[80%] mx-auto ml-8">
      <div>
        <p className="font-bold text-[2rem]">내 정보</p>
        <div className="w-full h-[2px] bg-black mt-2"></div>
      </div>
      <div className="w-full pl-6 py-8 text-[1.2rem] flex justify-between">
        <ul className="font-bold w-full">
          <li className="mb-6 flex justify-between">
            <p className="w-[30%]">ID</p>
            <p className="w-[70%]">{userData.id}</p>
          </li>
          <li className="mb-6 flex justify-between">
            <p className="w-[30%]">이름</p>
            <p className="w-[70%]">{userData.name}</p>
          </li>
          <li className="mb-6 flex justify-between">
            <p className="w-[30%]">이메일</p>
            <p className="w-[70%]">{userData.email}</p>
          </li>
          <li className="mb-6 flex justify-between">
            <p className="w-[30%]">기존 비밀번호</p>
            <span className="w-[70%]">
              <input
                className="border border-gray-300"
                onChange={(e) => setOldPassword(e.target.value)}
                type="password"
              />
              <button
                className="py-1 px-3 border border-gray-500 rounded-md ml-4 hover:bg-gray-50"
                onClick={handleOldPasswordCheck}
              >
                확인
              </button>
            </span>
          </li>
          <li className="mb-6 flex justify-between">
            <p className="w-[30%]">새 비밀번호</p>
            <span className="w-[70%]">
              <input
                className="border border-gray-300"
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
              />
              <button
                className="py-1 px-3 bg-gray-500 text-white rounded-md ml-4 hover:bg-gray-600"
                onClick={handlePasswordChange}
              >
                변경
              </button>
            </span>
          </li>
          <li className="mb-6 flex justify-between">
            <p className="w-[30%]">전화 번호</p>
            <p className="w-[70%]">{userData.phone}</p>
          </li>
          <li className="mb-6 flex justify-between">
            <p className="w-[30%]">주소</p>
            <p className="w-[70%]">{userData.address}</p>
          </li>
          <li className="mb-6 flex justify-between">
            <p className="w-[30%]">생년월일</p>
            <p className="w-[70%]">{userData.birth}</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
