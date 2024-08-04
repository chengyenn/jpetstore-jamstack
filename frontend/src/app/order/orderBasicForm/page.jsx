"use client";
import Header from "@/app/components/Header";
import Content from "@/app/components/Content";
import Footer from "@/app/components/Footer";
import { useEffect, useState } from "react";

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN;
const initialOrderInfo = {
  cardType: "Visa",
  creditCard: "",
  expiryDate: "",
  shipToFirstName: "",
  shipToLastName: "",
  shipAddress1: "",
  shipAddress2: "",
  shipCity: "",
  shipState: "",
  shipZip: "",
  shipCountry: "",
};

async function createOrder(orderReq) {
  const res = await fetch(`${apiDomain}/my/orders/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderReq),
  });
  console.log("Order Request JSON:", JSON.stringify(orderReq));

  if (res.ok) {
    const result = await res.json();
    console.log("Create Order Result:", result);
    return result;
  } else {
    const result = await res.json();
    console.error("Create Order Error:", result.error);
    throw new Error(result.error);
  }
}

export default function OrderBasicForm() {
  const [orderInfo, setOrderInfo] = useState(initialOrderInfo);

  useEffect(() => {
    async function fetchBillInfo() {
      console.log("Submit Cart List", JSON.parse(localStorage.getItem("cart")));
      const thisUser = localStorage.getItem("username");
      const res = await fetch(
        `${apiDomain}/my/orders/create?form&username=${thisUser}`
      );
      if (res.ok) {
        const result = await res.json();
        // console.log("Get Result:", result);
        const updateOrderInfo = {
          ...initialOrderInfo,
          shipToFirstName: result.firstName,
          shipToLastName: result.lastName,
          shipAddress1: result.address1,
          shipAddress2: result.address2,
          shipCity: result.city,
          shipState: result.state,
          shipZip: result.zip,
          shipCountry: result.country,
        };
        setOrderInfo(updateOrderInfo);
      } else {
        const result = await res.json();
        console.error("Error:", result.error);
      }
    }
    fetchBillInfo();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setOrderInfo({ ...orderInfo, [name]: value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Order Info:", orderInfo);
    console.log("Cart List", JSON.parse(localStorage.getItem("cart")));
    const confirm = window.confirm(
      `It's your shipping information: \n First Name: ${orderInfo.shipToFirstName} \n Last Name: ${orderInfo.shipToLastName} \n Address1: ${orderInfo.shipAddress1} \n Address2: ${orderInfo.shipAddress2} \n City: ${orderInfo.shipCity} \n State: ${orderInfo.shipState} \n Zip: ${orderInfo.shipZip} \n Country: ${orderInfo.shipCountry}`
    );
    if (confirm) {
      // 打 create order 的 api
      const thisUser = localStorage.getItem("username");
      const thisOrder = JSON.parse(localStorage.getItem("cart")).map(
        (item) => ({
          itemId: item.itemid,
          qty: item.quantity,
        })
      );
      const orderReq = {
        username: thisUser,
        items: thisOrder,
        inStock: true,
        ...orderInfo,
      };

      createOrder(orderReq)
        .then(() => {
          localStorage.setItem("cart", JSON.stringify([]));
          alert("Order created successfully!");
          // location.href = "";
        })
        .catch((error) => alert("Order created failed!"));
    }
  }

  return (
    <div>
      <Header />
      <Content>
        <div id="Catalog">
          <form onSubmit={handleSubmit}>
            <table>
              <thead>
                <tr>
                  <th colSpan="2">Payment Details</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Card Type:</td>
                  <td>
                    <select
                      name="cardType"
                      value={orderInfo.cardType}
                      onChange={handleChange}
                    >
                      <option value="Visa" key="visa">
                        Visa
                      </option>
                      <option value="MasterCard" key="masterCard">
                        MasterCard
                      </option>
                      <option value="AmericanExpress" key="americanExpress">
                        American Express
                      </option>
                    </select>
                  </td>
                </tr>
                <OrderInfo
                  title="Card Number:"
                  type="password"
                  name="creditCard"
                  value={orderInfo.cardNumber}
                  onChange={handleChange}
                />
                <OrderInfo
                  title="Expiry Date (MM/YYYY):"
                  name="expiryDate"
                  value={orderInfo.expiryDate}
                  onChange={handleChange}
                />
                <tr>
                  <th colSpan="2">Shipping Address</th>
                </tr>
                <OrderInfo
                  title="First name:"
                  name="shipToFirstName"
                  value={orderInfo.shipToFirstName}
                  onChange={handleChange}
                />
                <OrderInfo
                  title="Last name:"
                  name="shipToLastName"
                  value={orderInfo.shipToLastName}
                  onChange={handleChange}
                />
                <OrderInfo
                  title="Address 1:"
                  name="shipAddress1"
                  size="40"
                  value={orderInfo.shipAddress1}
                  onChange={handleChange}
                />
                <OrderInfo
                  title="Address 2:"
                  name="shipAddress2"
                  size="40"
                  value={orderInfo.shipAddress2}
                  onChange={handleChange}
                />
                <OrderInfo
                  title="City:"
                  name="shipCity"
                  size="40"
                  value={orderInfo.shipCity}
                  onChange={handleChange}
                />
                <OrderInfo
                  title="State:"
                  name="shipState"
                  size="4"
                  value={orderInfo.shipState}
                  onChange={handleChange}
                />
                <OrderInfo
                  title="Zip:"
                  name="shipZip"
                  size="10"
                  value={orderInfo.shipZip}
                  onChange={handleChange}
                />
                <OrderInfo
                  title="Country:"
                  name="shipCountry"
                  size="15"
                  value={orderInfo.shipCountry}
                  onChange={handleChange}
                />
              </tbody>
            </table>
            <input type="submit" name="continue" value="Continue" />
          </form>
        </div>
      </Content>
      <Footer />
    </div>
  );
}

function OrderInfo({ title, type, name, size, value, onChange }) {
  return (
    <tr>
      <td>{title}</td>
      <td>
        <input
          type={type ? type : "text"}
          name={name}
          size={size}
          value={value}
          onChange={onChange}
        />
        {title === "Card Number:" && " * Use a fake number !"}
      </td>
    </tr>
  );
}
