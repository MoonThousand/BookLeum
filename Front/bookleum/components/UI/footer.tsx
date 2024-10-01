import React from "react";

export default function Footer() {
  return (
    <footer className="mx-auto flex w-[90%] justify-around items-center h-48 mt-16 border-t border-gray-400">
      <div className="w-[50% pl-4">
        <p className="font-bold text-[1.7rem]">Book Leum</p>
        <p className="text-[1.1rem]">developer : Dejong1706, 의현이</p>
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
