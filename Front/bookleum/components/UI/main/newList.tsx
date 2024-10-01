import NewListDetail from "./newListDetail";
import React from "react";

export default function NewList() {
  return (
    <div className="w-[80%] mt-8">
      <div className="font-bold text-[2rem] my-4 py-2">
        <p>신간 리스트</p>
      </div>
      <div className="flex justify-around">
        <NewListDetail title="불편한 편의점" author="김호연" />
        <NewListDetail title="불편한 편의점" author="김호연" />
        <NewListDetail title="불편한 편의점" author="김호연" />
      </div>
    </div>
  );
}
