"use client";

import React, { useEffect, useState } from "react";

import ListBookDetailDiv from "@/components/book/listBookDetailDiv";
import Loading from "@/components/UI/loding";
import SearchBar from "@/components/UI/searcBar";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

interface Book {
  author: string;
  description: string;
  isbn13: string;
  title: string;
  cover: string;
  priceSales: string;
  priceStandard: string;
}

export default function SearchPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const searchTarget = decodeURIComponent(
    pathname.substring(pathname.lastIndexOf("/") + 1)
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/api/open/search-product/keyword/${searchTarget}/30/book/midd`
        );

        if (response.status === 200) {
          console.log(response);
          setLoading(false);
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
          console.error("실패");
        }
      } catch (error) {
        console.error("실패", error);
        alert("서버에러.");
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
    <div className="w-[80%] mx-auto">
      <div className="mt-4 flex justify-end">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleKeyDown={handleKeyDown}
        />
      </div>

      {loading && <Loading />}
      {!loading && (
        <>
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
        </>
      )}
    </div>
  );
}
