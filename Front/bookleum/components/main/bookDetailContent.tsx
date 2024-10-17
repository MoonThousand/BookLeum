import React from "react";

interface Props {
  title: string;
  content: string;
}

export default function BookDetailContent({ title, content }: Props) {
  return (
    <div className="flex w-[90%] mx-auto h-64 mt-12 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <div className="w-[35%] flex justify-center items-center text-[2rem]">
        {title}
      </div>
      <div className="w-[65%] flex flex-col justify-center px-8">
        <p className="flex items-center">{content}</p>
      </div>
    </div>
  );
}
