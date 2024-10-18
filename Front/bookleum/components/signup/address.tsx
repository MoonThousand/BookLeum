"use client";

import React, { useState } from "react";
import type { Address } from "react-daum-postcode";
import DaumPostcode from "react-daum-postcode";

interface Props {
  handleAdress: (addr: string) => void;
}

export default function Address({ handleAdress }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [address, setAddress] = useState("");

  const handleComplete = (data: Address) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setAddress(fullAddress);
    handleAdress(fullAddress);
    setIsOpen(false);
  };

  console.log(address);

  const togglePostcode = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-4">
      <label className="block font-bold mb-1 text-[0.8rem]">주소</label>
      <div className="flex items-center">
        <input
          type="text"
          value={address}
          placeholder="주소를 입력하세요"
          readOnly
          className="px-4 py-2 border border-gray-300 rounded-md w-[25rem] h-[40px]"
        />
        <button
          onClick={togglePostcode}
          className="ml-2 px-4 py-2 border border-[#C7C8CC] text-[#C7C8CC] rounded-md hover:cursor-pointer hover:border-[#9fa0a6] hover:text-[#9fa0a6]"
        >
          주소 검색
        </button>
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="w-[35%] relative">
              <div className="w-full flex justify-end">
                <button
                  onClick={togglePostcode}
                  className=" bg-black text-white px-4 py-1 rounded-md z-50 hover:bg-[#252323]"
                >
                  X
                </button>
              </div>

              <div className="bg-white p-4 rounded-md shadow-lg">
                <DaumPostcode
                  onComplete={handleComplete}
                  autoClose={false}
                  defaultQuery=""
                  style={{ width: "100%", height: "500px" }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
