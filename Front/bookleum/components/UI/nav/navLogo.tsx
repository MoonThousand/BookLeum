import Link from "next/link";
import React from "react";

export default function NavLogo() {
  return (
    <div className=" mx-auto w-[34%] flex justify-center">
      <div className="font-bold text-[2.7rem]">
        <Link href="/">
          <div className="drop-shadow-[0_0.8px_0.8px_rgba(0,0,0,0.5)] font-TTL">
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
        </Link>
      </div>
    </div>
  );
}
