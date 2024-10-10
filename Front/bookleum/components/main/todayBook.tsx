import Image from "next/image";
import Link from "next/link";
import Loading from "../UI/loding";
import React from "react";

interface Props {
  author: string;
  description: string;
  isbn13: string;
  title: string;
  cover: string;
}

export default function TodayBook({
  author,
  description,
  isbn13,
  title,
  cover,
}: Props) {
  return (
    <div className="w-[80%] my-8 font-Score">
      <div className="flex items-center font-bold text-[2.3rem] my-4">
        <div className="w-6 h-10 bg-blue-500 mr-2"></div>
        <p>Today Book</p>
      </div>
      {cover !== "" && (
        <div className="flex justify-around w-full">
          <div className="w-[40%] flex justify-center items-center">
            <Link href={`/Other/book/${isbn13}`}>
              <Image src={cover} width={200} height={100} alt="today book" />
            </Link>
          </div>
          <div className="px-12 w-[60%] flex flex-col justify-center font-TTL">
            <p className="mb-4 font-bold text-[1.3rem]">{title}</p>
            <p className="mb-4 text-[1.2rem]">{author}</p>
            <p className="mb-4">{description}</p>
            <div className="flex justify-end mt-12">
              <Link href={`/Other/book/${isbn13}`}>
                <button className="bg-blue-600 text-white rounded-lg w-32 h-12">
                  살펴보기
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      {cover === "" && <Loading />}
    </div>
  );
}
