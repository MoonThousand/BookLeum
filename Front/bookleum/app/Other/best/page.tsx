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

export default function Best() {
  const [loading, setLoading] = useState(true);
  const [books, setBooks] = useState<Book[]>([]);
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(9);
  const [week, setWeek] = useState(1);

  const years = Array.from({ length: 2025 - 2000 }, (_, i) => 2000 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const weeks = Array.from({ length: 4 }, (_, i) => i + 1);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/list-product/bestseller/50/book/${year}/${month}/${week}/mid`
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
    <div className="w-[80%] mx-auto mt-12">
      <div>
        <p className="font-bold text-[2rem]">베스트 셀러</p>
        <div className="w-full h-[30px] bg-gradient-to-r from-lime-500 to-lime-600 mt-2"></div>
        <div className="mt-4 flex space-x-4 justify-end">
          <select
            value={year}
            onChange={(e) => setYear(Number(e.target.value))}
            className="border border-gray-500 rounded-md p-2"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}년
              </option>
            ))}
          </select>
          <select
            value={month}
            onChange={(e) => setMonth(Number(e.target.value))}
            className="border border-gray-500 rounded-md p-2"
          >
            {months.map((m) => (
              <option key={m} value={m}>
                {m}월
              </option>
            ))}
          </select>

          <select
            value={week}
            onChange={(e) => setWeek(Number(e.target.value))}
            className="border border-gray-500 rounded-md p-2"
          >
            {weeks.map((w) => (
              <option key={w} value={w}>
                {w}주차
              </option>
            ))}
          </select>

          <button
            onClick={fetchData}
            className="bg-gray-700  text-white py-2 px-4 rounded-md border border-gray-800"
          >
            조회
          </button>
        </div>
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
            />
          ))}
        </div>
      ) : (
        <Loding />
      )}
    </div>
  );
}
