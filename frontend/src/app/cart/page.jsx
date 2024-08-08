"use client";
import Header from "@/app/components/Header";
import Content from "@/app/components/Content";
import Footer from "@/app/components/Footer";
import CartItem from "@/app/cart/components/CartItem";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Cart() {
  const [isCart, setIsCart] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    // cartList is a array
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length > 0) {
      console.log("cart:", cart);
      setCartList(cart);
      setIsCart(true);

      // initial sub total
      setSubTotal(
        cart.reduce((acc, item) => acc + item.listprice * item.quantity, 0)
      );
    }
  }, []);

  function handleRemoveItem(thisItem) {
    // remove item in cart
    const updateCartList = cartList.filter(
      (item) => item.itemid !== thisItem.itemid
    );
    setCartList(updateCartList);
    // local storage delete remove item
    localStorage.setItem("cart", JSON.stringify(updateCartList));
    if (updateCartList.length === 0) setIsCart(false);

    updateTotalArrandCost(updateCartList);
  }

  function handleSubTotal(thisQuantity, thisid) {
    // update quantity in cart
    const updateCarList = cartList.map((item) =>
      item.itemid === thisid ? { ...item, quantity: thisQuantity } : item
    );
    setCartList(updateCarList);
    localStorage.setItem("cart", JSON.stringify(updateCarList));

    updateTotalArrandCost(updateCarList);
  }

  // update subTotal
  function updateTotalArrandCost(updateCartList) {
    const updatSubTotal = updateCartList.reduce(
      (acc, item) => acc + item.listprice * item.quantity,
      0
    );
    setSubTotal(updatSubTotal);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!localStorage.getItem("username")) {
      alert("Please login first.");
      setTimeout(() => {
        location.href = "/login";
      }, 1000);
    } else {
      // update last cartList to local storage
      if (cartList.length !== 0) {
        localStorage.setItem("cart", JSON.stringify(cartList));
        window.location.href = "/order/orderBasicForm";
      } else {
        alert("Your cart is empty.");
      }
    }
  }

  return (
    <div>
      <Header />
      <Content>
        <div id="BackLink">
          <Link href="/catalog">Return to Main Menu</Link>
        </div>
        <div id="Catalog">
          <div id="Cart">
            <h2>Shopping Cart</h2>
            <form onSubmit={handleSubmit}>
              <table>
                <thead>
                  <tr>
                    <th>Item ID</th>
                    <th>Product ID</th>
                    <th>Description</th>
                    <th>In Stock?</th>
                    <th>Quantity</th>
                    <th>List Price</th>
                    <th>Total Cost</th>
                    <th>&nbsp;</th>
                  </tr>
                </thead>
                <tbody>
                  {!isCart ? (
                    <tr>
                      <td colSpan="8">
                        <b>Your cart is empty.</b>
                      </td>
                    </tr>
                  ) : (
                    <>
                      {cartList.map((item, index) => (
                        <CartItem
                          key={index}
                          itemObj={item}
                          onRemoveItem={handleRemoveItem}
                          onSubTotal={handleSubTotal}
                        />
                      ))}
                      <tr>
                        <td colSpan="7">
                          Sub Total:
                          <span>{` $${subTotal.toFixed(2)}`}</span>
                        </td>
                        <td>&nbsp;</td>
                      </tr>
                    </>
                  )}
                </tbody>
              </table>
              {isCart && (
                <input
                  type="submit"
                  value="Proceed to Checkout"
                  className="Button"
                />
              )}
            </form>
          </div>
          <div id="MyList">
            <div>
              <p>
                Pet Favorites <br />
                Shop for more of your favorite pets here.
              </p>
            </div>
          </div>
          <div id="Separator">&nbsp;</div>
        </div>
      </Content>
      <Footer />
    </div>
  );
}
