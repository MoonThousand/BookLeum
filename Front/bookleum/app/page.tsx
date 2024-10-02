"use client";

import { useEffect, useState } from "react";

import Image from "next/image";
import Loding from "@/components/UI/loding";
import NewList from "@/components/main/newList";
import TodayBook from "@/components/main/todayBook";
import axios from "axios";

interface Book {
  title: string;
  author: string;
  cover: string;
  isbn13: string;
}

export default function Home() {
  const [todayBook, setTodayBook] = useState({
    author: "",
    description: "",
    isbn13: "",
    title: "",
    cover: "",
  });

  const [newListBooks, setNewListBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/list-product/bestseller/5/book/2024/9/2/mid`
        );

        if (response.status === 200) {
          setLoading(false);
          console.log("데이터 받아오기 성공");
          console.log(response.data);

          const bookData = response.data.item;

          const todayBookData = bookData[0];
          const originalCoverUrl = todayBookData.cover;

          const modifiedCoverUrl = originalCoverUrl.replace(
            "/coversum/",
            "/cover500/"
          );

          setTodayBook({
            author: todayBookData.author,
            description: todayBookData.description,
            isbn13: todayBookData.isbn13,
            title: todayBookData.title,
            cover: modifiedCoverUrl,
          });

          const modifiedNewList = bookData.slice(1, 4).map((book: Book) => {
            const originalCover = book.cover;
            const newCoverUrl = originalCover.replace(
              "/coversum/",
              "/cover500/"
            );

            return {
              author: book.author,
              title: book.title,
              isbn13: book.isbn13,
              cover: newCoverUrl,
            };
          });

          setNewListBooks(modifiedNewList);
        } else {
          console.error("실패");
        }
      } catch (error) {
        console.error("실패", error);
        alert("서버에러.");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center mx-auto">
      {!loading && (
        <>
          <div className="mt-20 w-[80%] flex justify-center">
            <Image
              src="/logo.png"
              width={1000}
              height={200}
              alt="main logo Image"
            />
          </div>
          <TodayBook
            author={todayBook.author}
            description={todayBook.description}
            isbn13={todayBook.isbn13}
            title={todayBook.title}
            cover={todayBook.cover}
          />
          <NewList books={newListBooks} />
        </>
      )}
      {loading && <Loding />}
    </div>
  );
}
