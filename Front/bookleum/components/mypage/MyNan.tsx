import React from "react";

interface Props {
  title: string;
}

export default function MyNan({ title }: Props) {
  return (
    <div className="w-[80%] mx-auto ml-8 font-TTL h-[300px] flex flex-col justify-center items-center">
      <p className="text-[1.5rem]">{`${title}`}</p>
    </div>
  );
}
