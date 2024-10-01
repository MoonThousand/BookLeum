import Image from "next/image";
import NewList from "@/components/UI/main/newList";
import TodayBook from "@/components/UI/main/todayBook";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="mt-12 w-[80%]">
        <Image
          src="/logo.png"
          width={1000}
          height={200}
          alt="main logo Image"
        />
      </div>
      <TodayBook />
      <NewList />
    </div>
  );
}
