import React from "react";

interface Props {
  categoryName: string;
  isbn: string;
  pubDate: string;
  publisher: string;
}

export default function ReviewDetail({
  categoryName,
  isbn,
  pubDate,
  publisher,
}: Props) {
  return (
    <div className="flex w-[90%] mx-auto h-64 mt-12 shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-green-100">
      <div className="w-[35%] flex justify-center items-center text-[2rem]">
        세부 정보
      </div>
      <div className="w-[65%] flex flex-col justify-center px-8 text-[1.2rem]">
        <p className="flex items-center py-2">{`도서 카테고리 : ${categoryName}`}</p>
        <p className="flex items-center py-2">{`도서 고유번호 : ${isbn}`}</p>
        <p className="flex items-center py-2 ">{`출판사 : ${publisher}`}</p>
        <p className="flex items-center py-2">{`출판일 : ${pubDate}`}</p>
      </div>
    </div>
  );
}
