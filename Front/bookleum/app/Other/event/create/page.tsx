import React from "react";

export default function page() {
  return (
    <div className="w-[80%] mx-auto mt-12 font-TTL">
      <div>
        <p className="font-bold text-[2rem]">🍂가을 문구 작성</p>
        <div className="w-full h-[3px] bg-[#ef9a4a] mt-2"></div>
      </div>
      <div className="w-[90%] mx-auto mt-6">
        <div className="mb-4">
          <input
            placeholder="제목을 입력해주세요"
            className="border-2 border-gray-500 w-full py-2 px-1 rounded-md"
          />
        </div>
        <textarea
          placeholder="내용을 입력해주세요"
          className="border-2 border-gray-500 w-full py-2 px-1 h-[300px] rounded-md"
        />
      </div>
      <div className="w-[90%] mx-auto flex justify-end mt-6">
        <button className="py-2 px-4 bg-[#ef9a4a] text-white rounded-md hover:bg-[#e58e3d]">
          작성
        </button>
      </div>
    </div>
  );
}
