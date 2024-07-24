"use client";
import Link from "next/link";
import { useState } from "react";

export default function AllItem({ productObj, itemsData, inventoryData }) {
  // add item to cart
  function handleAddtoCart(thisItem) {
    const des = thisItem.attr1 + " " + productObj.name;
    const stock = inventoryData.find(
      (inventory) => inventory.itemid === thisItem.itemid
    ).qty;
    const newCartItem = {
      itemid: thisItem.itemid,
      productid: productObj.productid,
      description: des,
      inStock: stock > 0 ? "true" : "false",
      quantity: 1,
      listprice: thisItem.listprice,
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(newCartItem);
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  return (
    <div id="Catalog">
      <h2>{productObj.name}</h2>
      <table>
        <thead>
          <tr>
            <th>Item ID</th>
            <th>Product ID</th>
            <th>Description</th>
            <th>List Price</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {itemsData.map((item) => (
            <tr key={item.itemid}>
              <td>
                <Link href={`/catalog/items/${item.itemid}`}>
                  {item.itemid}
                </Link>
              </td>
              <td>{productObj.productid}</td>
              <td>
                <span>{item.attr1}</span>
                <span>{item.attr2}</span>
                <span>{item.attr3}</span>
                <span>{item.attr4}</span>
                <span>{item.attr5}</span>
                <span>&nbsp;</span>
                <span>{productObj.name}</span>
              </td>
              <td>{item.listprice.toFixed(2)}</td>
              <td>
                <Link
                  href="/cart"
                  className="Button"
                  onClick={() => handleAddtoCart(item)}
                >
                  Add to Cart
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
