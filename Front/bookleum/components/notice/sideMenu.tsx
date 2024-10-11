import React from "react";
import { TbTriangleInvertedFilled } from "react-icons/tb";

interface SideMenuProps {
  select: number;
  setSelect: (notice: number) => void;
  mainTitle: string;
  subTitle: string;
  subTitle2: string;
  subTitle3: string;
  subTitle4?: string;
  type: string;
}

export default function SideMenu({
  select,
  setSelect,
  mainTitle,
  subTitle,
  subTitle2,
  subTitle3,
  subTitle4,
  type,
}: SideMenuProps) {
  return (
    <div className="flex flex-col">
      <p className="font-medium text-[1.5rem] mb-2">{mainTitle}</p>
      <div className="flex flex-col w-[180px]">
        <button
          className={`border-t border-r border-l border-gray-600 py-3 flex items-center cursor-pointer ${
            select === 1 ? "bg-gray-100" : ""
          } hover:bg-gray-200`}
          onClick={() => setSelect(1)}
        >
          <p className="w-[80%] pl-4">{subTitle}</p>
          <TbTriangleInvertedFilled
            className={`w-[20%] text-gray-400 hover:text-gray-600 ${
              select === 1 ? "text-gray-600" : "text-gray-400"
            }`}
          />
        </button>
        <button
          className={`border-t border-r border-l border-gray-600 py-3 flex items-center cursor-pointer ${
            select === 2 ? "bg-gray-100" : ""
          } hover:bg-gray-200`}
          onClick={() => setSelect(2)}
        >
          <p className="w-[80%] pl-4 text-gray-700 hover:text-black">
            {subTitle2}
          </p>
          <TbTriangleInvertedFilled
            className={`w-[20%] text-gray-400 hover:text-gray-600 ${
              select === 2 ? "text-gray-600" : "text-gray-400"
            }`}
          />
        </button>
        <button
          className={`border-t border-r border-l ${
            type === "notice" ? "border-b" : ""
          } border-gray-600 py-3 flex items-center cursor-pointer ${
            select === 3 ? "bg-gray-100" : ""
          } hover:bg-gray-200`}
          onClick={() => setSelect(3)}
        >
          <p className="w-[80%] pl-4 text-gray-700 hover:text-black">
            {subTitle3}
          </p>
          <TbTriangleInvertedFilled
            className={`w-[20%] text-gray-400 hover:text-gray-600 ${
              select === 3 ? "text-gray-600" : "text-gray-400"
            }`}
          />
        </button>
        {type !== "notice" && (
          <button
            className={`border border-gray-600 py-3 flex items-center cursor-pointer ${
              select === 4 ? "bg-gray-100" : ""
            } hover:bg-gray-200`}
            onClick={() => setSelect(4)}
          >
            <p className="w-[80%] pl-4 text-gray-700 hover:text-black">
              {subTitle4}
            </p>
            <TbTriangleInvertedFilled
              className={`w-[20%] text-gray-400 hover:text-gray-600 ${
                select === 4 ? "text-gray-600" : "text-gray-400"
              }`}
            />
          </button>
        )}
      </div>
    </div>
  );
}
