import React from "react";

export default function Footer() {
  return (
    <footer className="mx-auto flex w-[90%] justify-around items-center h-48 mt-16 border-t border-gray-400">
      <div className="w-[50%] pl-4">
        <div className="drop-shadow-[0_0.8px_0.8px_rgba(0,0,0,0.5)] font-bold text-[2rem] font-TTL">
          <span className="text-[#88B04B]">Book</span>
          <span
            style={{
              background:
                "linear-gradient(to right, #A4C49E, #9b8e61, #2e6b53)",
              WebkitBackgroundClip: "text",
              color: "transparent",
            }}
          >
            Leum
          </span>
        </div>
        <p className="text-[1.1rem] my-2">developer : Dejong1706, Euihyunee</p>
        <p>
          Our service allows users to search for book information using the
          Aladdin API
        </p>
      </div>
      <div className="w-[40%]">
        <ul className="flex justify-around font-semibold">
          <li>PRODUCTS</li>
          <li>BLOG</li>
          <li>SHOP</li>
          <li>CONTACTS</li>
        </ul>
      </div>
    </footer>
  );
}
