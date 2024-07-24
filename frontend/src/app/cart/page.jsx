"use client";
import Header from "@/app/components/Header";
import Content from "@/app/components/Content";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Cart() {
  const [isCart, setIsCart] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [eachTotalCost, setEachTotalCost] = useState([]);

  useEffect(() => {
    // cartList is a array
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      console.log("cart:", cart);
      setCartList(cart);
      setIsCart(true);

      // initial total cost for each item in cart
      const initialTotalCosts = cart.map((item) => ({
        itemTotalCost: item.listprice,
        id: item.itemid,
      }));
      setEachTotalCost(initialTotalCosts);

      // initial sub total
      setSubTotal(cart.reduce((acc, item) => acc + item.listprice, 0));
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
    updateCartList.length === 0 && setIsCart(false);

    // delete remove item in eachTotalCost
    const updatEachTotalCost = eachTotalCost.filter(
      (item) => item.id !== thisItem.itemid
    );
    updateTotalArrandCost(updatEachTotalCost);
  }

  function handleSubTotal(thisQuantity, thisTotalCost, thisid) {
    // update quantity in cart
    const updateCarList = cartList.map((item) =>
      item.itemid === thisid ? { ...item, quantity: thisQuantity } : item
    );
    setCartList(updateCarList);
    console.log("update quantity CarList:", updateCarList);

    // update total cost of quantityChanged item in eachTotalCost
    const updatEachTotalCost = eachTotalCost.map((item) =>
      item.id === thisid ? { ...item, itemTotalCost: thisTotalCost } : item
    );
    updateTotalArrandCost(updatEachTotalCost);
  }

  // update eachTotalCost and subTotal
  function updateTotalArrandCost(updatEachTotalCost) {
    setEachTotalCost(updatEachTotalCost);
    const updatSubTotal = updatEachTotalCost.reduce(
      (acc, item) => acc + item.itemTotalCost,
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
      localStorage.setItem("cart", JSON.stringify(cartList));
      console.log("Submit Cart List", JSON.parse(localStorage.getItem("cart")));
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

function CartItem({ itemObj, onRemoveItem, onSubTotal }) {
  const [quantity, setQuantity] = useState(itemObj.quantity);
  let totalCost = itemObj.listprice * quantity;

  useEffect(() => {
    onSubTotal(quantity, totalCost, itemObj.itemid);
  }, [quantity]);

  return (
    <tr>
      <td>
        <Link href="">
          <span>{itemObj.itemid}</span>
        </Link>
      </td>
      <td>
        <span>{itemObj.productid}</span>
      </td>
      <td>
        <span>{itemObj.description}</span>
      </td>
      <td>
        <span>{itemObj.inStock}</span>
      </td>
      <td>
        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </td>
      <td>
        <span>{`$${itemObj.listprice.toFixed(2)}`}</span>
      </td>
      <td>
        <span>{`$${totalCost.toFixed(2)}`}</span>
      </td>
      <td>
        <Link
          href="/cart"
          className="button"
          onClick={() => onRemoveItem(itemObj)}
        >
          Remove
        </Link>
      </td>
    </tr>
  );
}
