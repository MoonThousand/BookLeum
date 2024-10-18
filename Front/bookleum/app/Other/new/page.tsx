"use client";

import React, { useEffect, useState } from "react";

import ListBookDetailDiv from "@/components/book/listBookDetailDiv";
import Loding from "@/components/UI/loding";
import axios from "axios";

interface Book {
  author: string;
  description: string;
  isbn13: string;
  title: string;
  cover: string;
  priceSales: string;
  priceStandard: string;
}

export default function NewBook() {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState<Book[]>([]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/open/list-product/itemNewAll/50/book/2024/9/2/mid`
      );

      if (response.status === 200) {
        console.log("데이터 받아오기 성공");
        const bookData = response.data.item.map((book: Book) => {
          const originalCoverUrl = book.cover;
          const modifiedCoverUrl = originalCoverUrl.replace(
            "/coversum/",
            "/cover500/"
          );

          return {
            author: book.author,
            description: book.description,
            isbn13: book.isbn13,
            title: book.title,
            cover: modifiedCoverUrl,
            priceSales: book.priceSales,
            priceStandard: book.priceStandard,
          };
        });

        setBooks(bookData);
      } else {
        console.error("데이터 불러오기 실패");
      }
    } catch (error) {
      console.error("서버 에러", error);
      alert("서버 에러 발생");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-[80%] mx-auto mt-12 font-TTL">
      <div>
        <p className="font-bold text-[2rem]">신간 리스트</p>
        <div className="w-full h-[30px] bg-gradient-to-r from-blue-400 to-blue-500 mt-2"></div>
        <div className="mt-4 flex space-x-4 justify-end"></div>
      </div>

      {!loading ? (
        <div>
          {books.map((book: Book, index) => (
            <ListBookDetailDiv
              key={`${book.isbn13}-${index}`}
              author={book.author}
              description={book.description}
              isbn13={book.isbn13}
              title={book.title}
              cover={book.cover}
              priceSales={book.priceSales}
              priceStandard={book.priceStandard}
              index={index + 1}
              type="new"
            />
          ))}
        </div>
      ) : (
        <Loding />
      )}
    </div>
  );
}
