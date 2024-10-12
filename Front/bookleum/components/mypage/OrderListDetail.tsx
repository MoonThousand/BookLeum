import React from "react";
import { formatDate } from "@/utils/formatDate";

interface OrderList {
  address: string;
  createdDate: string;
  memo: string;
  orderId: number;
  recipient: string;
  ordertitle: string;
  orderListLengh: number;
}

export default function OrderListDetail({
  address,
  createdDate,
  memo,
  orderId,
  recipient,
  ordertitle,
  orderListLengh,
}: OrderList) {
  return (
    <div className="font-TTL">
      <div className="w-full bg-gradient-to-r from-gray-800 to-gray-900 mt-2 flex justify-between items-center pr-4 py-2">
        <p className="font-semibold text-white pl-4">{`주문번호 : ${orderId}`}</p>
        <p className="font-semibold text-white">{`구매날짜 : ${formatDate(
          createdDate
        )}`}</p>
      </div>
      <div className="flex py-4 pl-8 justify-between mb-4 border-b border-black shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        <div className="flex flex-col w-full justify-between p-4 ">
          <div>
            <p className="font-Score font-bold text-[1.2rem]">
              {orderListLengh - 1 === 0
                ? `${ordertitle}`
                : `${ordertitle} 외 ${orderListLengh - 1}권`}
            </p>
            <p className="text-[1rem] my-3 font-Score font-bold">{`수령인 : ${recipient}`}</p>
            <p className="text-[0.9rem] font-Score font-bold mb-3">{`배송지: ${address}`}</p>
            <p className="text-[0.9rem] font-Score font-bold">{`메모: ${memo}`}</p>
          </div>
          <div className="flex flex-col justify-end items-end space-x-4 pr-2">
            <p className="text-green-500">배송 완료</p>
          </div>
        </div>
      </div>
    </div>
  );
}
