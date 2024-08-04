"use client";
import Header from "@/app/components/Header";
import Content from "@/app/components/Content";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import moment from "moment";
import { useEffect, useState } from "react";

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;

export default function UserOrders() {
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    const thisUser = localStorage.getItem("username");
    async function fetchOrders() {
      const res = await fetch(`${apiDomain}/my/orders?username=${thisUser}`);
      if (res.ok) {
        const result = await res.json();
        // console.log("get uder orders result:", result);
        setUserOrders(result);
      } else {
        const result = await res.json();
        console.error("get uder orders error:", result.error);
      }
    }
    fetchOrders();
  }, []);

  return (
    <div>
      <Header />
      <Content>
        <div id="Catalog">
          <h2>My Orders</h2>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {userOrders.length > 0 ? (
                userOrders.map((eachOrder) => (
                  <EachUserOrder
                    key={eachOrder.orderId}
                    orderId={eachOrder.orderId}
                    date={eachOrder.orderDate}
                    totalprice={eachOrder.totalPrice}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="3">Order not found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Content>
      <Footer />
    </div>
  );
}

function EachUserOrder({ orderId, date, totalprice }) {
  const formatDate = moment(date).format("YYYY/MM/DD HH:mm:ss");
  return (
    <tr>
      <td>
        <Link href={`/order/orderInfo/${orderId}`}>
          <span>{orderId}</span>
        </Link>
      </td>
      <td>
        <span>{formatDate}</span>
      </td>
      <td>
        <span>{`$${totalprice.toFixed(2)}`}</span>
      </td>
    </tr>
  );
}
