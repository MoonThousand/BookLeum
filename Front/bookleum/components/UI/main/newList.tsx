import NewListDetail from "./newListDetail";
import React from "react";

interface Book {
  title: string;
  author: string;
  cover: string;
  itemId: string;
}

interface Props {
  books: Book[];
}

export default function NewList({ books }: Props) {
  return (
    <div className="w-[80%] mt-8">
      <div className="font-bold text-[2rem] my-4 py-2">
        <p>베스트 셀러</p>
      </div>
      <div className="flex justify-around">
        {books.map((book: Book) => (
          <NewListDetail
            key={book.itemId}
            title={book.title}
            author={book.author}
            cover={book.cover}
            itemId={book.itemId}
          />
        ))}
      </div>
    </div>
  );
}
