import { FiSearch } from "react-icons/fi";
import React from "react";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function SearchBar({
  searchTerm,
  setSearchTerm,
  handleKeyDown,
}: SearchBarProps) {
  return (
    <div className="relative w-[30rem]">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <FiSearch className="text-black" />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="검색어를 입력하세요"
        className="w-full pl-12 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
      />
    </div>
  );
}
