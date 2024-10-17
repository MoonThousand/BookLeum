import React from "react";

interface Props {
  price: number;
  tip: number;
}

export default function PurchaseSummation({ price, tip }: Props) {
  return (
    <div className="w-[50%] mt-8 bg-gray-100 py-4 px-6 flex flex-col justify-evenly border-2 border-gray-400">
      <p className="text-[1.4rem] mb-4 pl-4 font-bold">결제 금액</p>
      <div className="w-full h-[2px] bg-black mt-2"></div>
      <span className="flex justify-between">
        <p className="text-[1.3rem] mb-4 pl-4">주문 금액</p>
        <p className="pr-4 text-[1.3rem] font-bold">{`${price}원`}</p>
      </span>
      <span className="flex justify-between">
        <p className="text-[1.3rem] mb-4 pl-4">배송비</p>
        <p className="pr-4 text-[1.3rem] font-bold">{`${tip}원`}</p>
      </span>
      <div className="w-full h-[2px] bg-black mt-2"></div>
      <span className="flex justify-between">
        <p className="text-[1.3rem] mb-4 pl-4">총 결제 금액</p>
        <p className="pr-4 text-[1.3rem] font-bold">{`${price + tip}원`}</p>
      </span>
    </div>
  );
}
