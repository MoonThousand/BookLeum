"use client";

import React, { useEffect, useState } from "react";

import OrderListDetail from "./OrderListDetail";
import axios from "axios";
import { getCookie } from "cookies-next";

interface OrderList {
  address: string;
  createdDate: string;
  memo: string;
  orderId: number;
  recipient: string;
  ordertitle: string;
  orderListLengh: number;
  responseOrderDetailsDTOS: Array[];
}

interface Array {
  title: string;
  price: number;
  author: string;
  isbn: string;
  cover: string;
}

export default function OrderList() {
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const [orderCheckData, setOrderCheckData] = useState<OrderList[]>([]);

  useEffect(() => {
    const id = getCookie("userId") as string | undefined;
    if (id) {
      setUserId(id);
    }
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/order/history/${userId}`
        );
        if (response.status === 200) {
          console.log(response);
          const orderData = response.data.map((order: OrderList) => {
            return {
              address: order.address,
              createdDate: order.createdDate,
              memo: order.memo,
              orderId: order.orderId,
              recipient: order.recipient,
              ordertitle: order.responseOrderDetailsDTOS[0].title,
              orderListLengh: order.responseOrderDetailsDTOS.length,
            };
          });
          setOrderCheckData(orderData);
        } else {
          console.error("데이터를 불러오지 못했습니다.");
        }
      } catch (error) {
        console.error("서버 에러:", error);
        alert("서버 에러 발생");
      }
    };

    if (userId !== undefined) {
      fetchData();
    }
  }, [userId]);

  return (
    <div className="w-[80%] mx-auto ml-8 font-TTL">
      <p className="font-bold text-[1.8rem]">주문 내역</p>
      {orderCheckData.map((order: OrderList, index) => (
        <OrderListDetail
          address={order.address}
          createdDate={order.createdDate}
          memo={order.memo}
          orderId={order.orderId}
          recipient={order.recipient}
          ordertitle={order.ordertitle}
          orderListLengh={order.orderListLengh}
          key={index}
        />
      ))}
    </div>
  );
}
