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
  billToFirstName: "",
  billToLastName: "",
  billAddress1: "",
  billAddress2: "",
  billCity: "",
  billState: "",
  billZip: "",
  billCountry: "",
};

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
        console.log("Get Result:", result);
        const updateOrderInfo = {
          ...initialOrderInfo,
          billToFirstName: result.firstName,
          billToLastName: result.lastName,
          billAddress1: result.address1,
          billAddress2: result.address2,
          billCity: result.city,
          billState: result.state,
          billZip: result.zip,
          billCountry: result.country,
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
                  <th colSpan="2">Billing Address</th>
                </tr>
                <OrderInfo
                  title="First name:"
                  name="billToFirstName"
                  value={orderInfo.billToFirstName}
                  onChange={handleChange}
                />
                <OrderInfo
                  title="Last name:"
                  name="billToLastName"
                  value={orderInfo.billToLastName}
                  onChange={handleChange}
                />
                <OrderInfo
                  title="Address 1:"
                  name="billAddress1"
                  size="40"
                  value={orderInfo.billAddress1}
                  onChange={handleChange}
                />
                <OrderInfo
                  title="Address 2:"
                  name="billAddress2"
                  size="40"
                  value={orderInfo.billAddress2}
                  onChange={handleChange}
                />
                <OrderInfo
                  title="City:"
                  name="billCity"
                  size="40"
                  value={orderInfo.billCity}
                  onChange={handleChange}
                />
                <OrderInfo
                  title="State:"
                  name="billState"
                  size="4"
                  value={orderInfo.billState}
                  onChange={handleChange}
                />
                <OrderInfo
                  title="Zip:"
                  name="billZip"
                  size="10"
                  value={orderInfo.billZip}
                  onChange={handleChange}
                />
                <OrderInfo
                  title="Country:"
                  name="billCountry"
                  size="15"
                  value={orderInfo.billCountry}
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
