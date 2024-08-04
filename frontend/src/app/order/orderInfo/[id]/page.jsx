"use client";
import Header from "@/app/components/Header";
import Content from "@/app/components/Content";
import Footer from "@/app/components/Footer";
import OrderInfoTable from "@/app/order/orderInfo/[id]/components/OrderInfoTable";
import Link from "next/link";
import { useEffect, useState } from "react";
import moment from "moment";

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

export default function OrderInfo({ params }) {
  const [thisOrderInfo, setThisOrderInfo] = useState({});
  // params.id === order id
  if (!params.id) return <></>;

  useEffect(() => {
    async function fetchOrderInfo() {
      const thisUser = localStorage.getItem("username");
      const res = await fetch(
        `${apiDomain}/my/orders/${params.id}?username=${thisUser}`
      );
      if (res.ok) {
        const result = await res.json();
        const formatDate = moment(result.orderDate).format(
          "YYYY/MM/DD HH:mm:ss"
        );
        console.log("formatDate:", formatDate);
        console.log("Get Order Info Result:", result);
        setThisOrderInfo({
          ...result,
          orderDate: formatDate,
        });
      } else {
        const result = await res.json();
        console.error("Get Order Info Error:", result.error);
      }
    }
    fetchOrderInfo();
  }, []);

  return (
    <div>
      <Header />
      <Content>
        <div id="BackLink">
          <Link href="/catalog">Return to Main Menu</Link>
        </div>
        <div id="Catalog">
          <OrderInfoTable thisOrderInfo={thisOrderInfo} />
        </div>
      </Content>
      <Footer />
    </div>
  );
}
