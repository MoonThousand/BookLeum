import React from "react";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  className?: string;
  placeholder?: string;
}

export default function Input({
  label,
  value,
  onChange,
  onFocus,
  className,
  placeholder,
}: Props) {
  return (
    <div className="mb-4">
      <label className="block font-bold mb-1 text-[0.8rem]">{label}</label>
      <input
        type={
          label === "Password" ||
          label === "비밀번호" ||
          label === "비밀번호 재입력"
            ? "password"
            : label === "생년월일" || label === "전화번호"
            ? "number"
            : "text"
        }
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        className={`w-[25rem] h-[40px] px-4 py-2 border border-gray-300 rounded-md ${className}`}
        placeholder={`${placeholder}`}
      />
    </div>
  );
}
