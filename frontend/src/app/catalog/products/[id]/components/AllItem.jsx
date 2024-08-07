"use client";
import Link from "next/link";
import addItemtoCart from "@/app/catalog/function/addItemtoCart";

export default function AllItem({ productObj, itemsData, inventoryData }) {
  // add item to cart
  function handleAddtoCart(thisItem) {
    const inventoryQty = inventoryData.find(
      (inventory) => inventory.itemid === thisItem.itemid
    ).qty;
    addItemtoCart(thisItem, productObj, inventoryQty);
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
                {inventoryData.find(
                  (inventory) => inventory.itemid === item.itemid
                ).qty > 0 ? (
                  <Link
                    href="/cart"
                    className="Button"
                    onClick={() => handleAddtoCart(item)}
                  >
                    Add to Cart
                  </Link>
                ) : (
                  <span style={{ color: "red" }}>Out of Stock</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
