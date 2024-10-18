"use client";

import React, { useEffect, useState } from "react";

import Loading from "../UI/loding";
import MyNan from "./MyNan";
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
  const [isLoading, setIsLoading] = useState(true);

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
          console.log(orderData);
          setOrderCheckData(orderData);
        } else {
          console.error("데이터를 불러오지 못했습니다.");
        }
      } catch (error: any) {
        if (error.response) {
          if (error.response.status === 400) {
            console.log("주문내역이 비어있습니다.");
          }
        } else {
          console.error("서버 에러:", error);
          alert("서버 에러 발생");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (userId !== undefined) {
      fetchData();
    }
  }, [userId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {orderCheckData.length > 0 ? (
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
      ) : (
        <MyNan title="주문내역이 비어있어요🥹" />
      )}
    </>
  );
}
