import React from "react";

interface Props {
  title: string;
  content: string;
}

export default function BookDetailContent({ title, content }: Props) {
  return (
    <div className="bg-yellow-300 flex w-[90%] mx-auto h-64 mt-12">
      <div className="w-[40%] flex justify-center items-center text-[2rem]">
        {title}
      </div>
      <div className="w-[60%] flex flex-col justify-center">
        <p className="flex items-center">{content}</p>
      </div>
    </div>
  );
}
