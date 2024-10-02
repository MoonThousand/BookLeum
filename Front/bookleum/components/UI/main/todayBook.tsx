import Image from "next/image";
import Link from "next/link";
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
    <div className="w-[80%] my-16">
      <div className="font-bold text-[2.3rem] my-4">
        <p>Today Book</p>
      </div>
      <div className="flex justify-around w-full">
        <div className="w-[40%] flex justify-center items-center">
          <Link href={`/Other/book/${isbn13}`}>
            <Image src={cover} width={200} height={100} alt="today book" />
          </Link>
        </div>
        <div className="px-12 w-[60%] flex flex-col justify-center">
          <p className="mb-4 font-bold text-[1.3rem]">{title}</p>
          <p className="mb-4 text-[1.2rem]">{author}</p>
          <p className="mb-4">{description}</p>
          <div className="flex justify-end">
            <Link href={`/Other/book/${isbn13}`}>
              <button className="bg-green-300 w-32 h-12">살펴보기</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
