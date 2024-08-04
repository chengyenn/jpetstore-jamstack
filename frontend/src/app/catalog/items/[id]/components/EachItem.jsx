"use client";
import Link from "next/link";
import Image from "next/image";
import addItemtoCart from "@/app/catalog/function/addItemtoCart";

export default function EachItem({ itemObj, productObj, inventoryQty }) {
  const matchResult = productObj.descn.match(/src="([^"]+)"[^>]*>([^<]+)/);
  const imageUrl = matchResult ? matchResult[1] : ""; // 圖片Url
  const description = matchResult ? matchResult[2] : ""; // item description

  // add item to cart
  function handleAddtoCart(thisItem) {
    addItemtoCart(thisItem, productObj, inventoryQty);
  }

  return (
    <div id="Catalog">
      <table>
        <thead>
          <tr>
            <td>
              <Image src={imageUrl} alt="itemImg" width="125" height="125" />
              <span>{description}</span>
            </td>
          </tr>
          <tr>
            <td>
              <b>
                <span>{itemObj.itemid}</span>
              </b>
            </td>
          </tr>
          <tr>
            <td>
              <b>
                <span style={{ fontSize: "18px" }}>
                  {itemObj.attr1} {productObj.name}
                </span>
              </b>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{productObj.name}</td>
          </tr>
          <tr>
            <td>
              {inventoryQty > 0 ? `${inventoryQty} in stock.` : "out of stock"}
            </td>
          </tr>
          <tr>
            <td>
              {itemObj.listprice.toString().match(/\.\d$/)
                ? `$${itemObj.listprice}0`
                : `$${itemObj.listprice}`}
            </td>
          </tr>
          {inventoryQty > 0 && (
            <tr>
              <td>
                <Link
                  href="/cart"
                  className="Button"
                  onClick={() => handleAddtoCart(itemObj)}
                >
                  Add to Cart
                </Link>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
