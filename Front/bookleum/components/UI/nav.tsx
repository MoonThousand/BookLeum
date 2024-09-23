import React from "react";

export default function Nav() {
  return (
    <div className="flex bg-red-300 items-center w-full">
      <div className="bg-orange-300 flex-grow w-[33%]">
        <ul className="flex">
          <li>베스트 셀러</li>
          <li>신간 리스트</li>
          <li>Event</li>
          <li>공지사항</li>
        </ul>
      </div>
      <div className="bg-yellow-300 mx-auto w-[34%] flex justify-center">
        <p>LOGO</p>
      </div>
      <div className="bg-green-300 flex-grow w-[33%]">
        <button>Log in</button>
        <button>sign up</button>
      </div>
    </div>
  );
}
