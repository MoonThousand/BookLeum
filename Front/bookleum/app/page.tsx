"use client";

import { useEffect, useState } from "react";

import NewList from "@/components/main/newList";
import SearchBar from "@/components/UI/searchbar";
import TodayBook from "@/components/main/todayBook";
import axios from "axios";
import { useRouter } from "next/navigation";

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
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/open/list-product/bestseller/5/book/2024/9/2/mid`
        );
        if (response.status === 200) {
          const bookData = response.data.item;
          const todayBookData = bookData[0];
          const modifiedCoverUrl = todayBookData.cover.replace(
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
            const newCoverUrl = book.cover.replace("/coversum/", "/cover500/");
            return {
              author: book.author,
              title: book.title,
              isbn13: book.isbn13,
              cover: newCoverUrl,
            };
          });

          setNewListBooks(modifiedNewList);
        } else {
          console.error("데이터를 불러오지 못했습니다.");
        }
      } catch (error) {
        console.error("서버 에러:", error);
        alert("서버 에러 발생");
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      console.log("검색어:", searchTerm);
      router.push(`/Other/search/${searchTerm}`);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col items-center mx-auto">
      <div className="relative w-full h-[500px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/background2.jpg")',
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white font-Jeju">
          <h1 className="text-4xl font-bold mb-6">환영합니다!</h1>
          <p className="text-lg mb-2">
            신작 도서와 베스트셀러 그 외에 다양한 책들까지!
          </p>
          <p className="text-lg mb-6">여기에서 원하시는 책을 검색하세요.</p>

          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleKeyDown={handleKeyDown}
          />
        </div>
      </div>
      <div className="mt-10 w-[80%] flex justify-center"></div>
      <TodayBook
        author={todayBook.author}
        description={todayBook.description}
        isbn13={todayBook.isbn13}
        title={todayBook.title}
        cover={todayBook.cover}
      />
      <NewList books={newListBooks} />
    </div>
  );
}
