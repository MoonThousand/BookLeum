import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  title: string;
  author: string;
  cover: string;
  isbn13: string;
}

export default function NewListDetail({ title, author, cover, isbn13 }: Props) {
  return (
    <div className="flex flex-col items-center">
      <Link href={`/Other/book/${isbn13}?type=normal`}>
        <Image src={cover} width={170} height={100} alt="new book" />
      </Link>
      <p className="font-semibold my-4">{title}</p>
      <p>{author} 지음</p>
    </div>
  );
}
