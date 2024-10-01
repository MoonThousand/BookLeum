import Image from "next/image";
import React from "react";

interface Props {
  title: string;
  author: string;
}

export default function NewListDetail({ title, author }: Props) {
  return (
    <div className="flex flex-col items-center">
      <Image src="/book.png" width={150} height={100} alt="new book" />
      <p className="font-semibold">{title}</p>
      <p>{author} 지음</p>
    </div>
  );
}
