import NewListDetail from "./newListDetail";
import React from "react";

interface Book {
  title: string;
  author: string;
  cover: string;
  isbn13: string;
}

interface Props {
  books: Book[];
}

export default function NewList({ books }: Props) {
  return (
    <div className="w-[80%] my-8 font-TTL">
      <div className="flex font-bold text-[2rem] my-4 py-2">
        <div className="w-6 h-10 bg-orange-500 mr-2"></div>
        <p>베스트 셀러</p>
      </div>
      <div className="flex justify-around">
        {books.map((book: Book) => (
          <NewListDetail
            key={book.isbn13}
            title={book.title}
            author={book.author}
            cover={book.cover}
            isbn13={book.isbn13}
          />
        ))}
      </div>
    </div>
  );
}
