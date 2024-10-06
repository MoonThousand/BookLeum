import React from "react";
import { TbTriangleInvertedFilled } from "react-icons/tb";

interface SideMenuProps {
  notice: number;
  setNotice: (notice: number) => void;
}

export default function SideMenu({ notice, setNotice }: SideMenuProps) {
  return (
    <div className="flex flex-col">
      <p className="font-medium text-[1.5rem] mb-2">고객센터</p>
      <div className="flex flex-col w-[180px]">
        <button
          className={`border-t border-r border-l border-gray-600 py-3 flex items-center cursor-pointer ${
            notice === 1 ? "bg-gray-100" : ""
          } hover:bg-gray-200`}
          onClick={() => setNotice(1)}
        >
          <p className="w-[80%] pl-4">공지사항</p>
          <TbTriangleInvertedFilled
            className={`w-[20%] text-gray-400 hover:text-gray-600 ${
              notice === 1 ? "text-gray-600" : "text-gray-400"
            }`}
          />
        </button>
        <button
          className={`border-t border-r border-l border-gray-600 py-3 flex items-center cursor-pointer ${
            notice === 2 ? "bg-gray-100" : ""
          } hover:bg-gray-200`}
          onClick={() => setNotice(2)}
        >
          <p className="w-[80%] pl-4 text-gray-700 hover:text-black">
            자주하는 질문
          </p>
          <TbTriangleInvertedFilled
            className={`w-[20%] text-gray-400 hover:text-gray-600 ${
              notice === 2 ? "text-gray-600" : "text-gray-400"
            }`}
          />
        </button>
        <button
          className={`border border-gray-600 py-3 flex items-center cursor-pointer ${
            notice === 3 ? "bg-gray-100" : ""
          } hover:bg-gray-200`}
          onClick={() => setNotice(3)}
        >
          <p className="w-[80%] pl-4 text-gray-700 hover:text-black">1:1문의</p>
          <TbTriangleInvertedFilled
            className={`w-[20%] text-gray-400 hover:text-gray-600 ${
              notice === 3 ? "text-gray-600" : "text-gray-400"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
