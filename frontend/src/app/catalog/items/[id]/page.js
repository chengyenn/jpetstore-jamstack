// product data
"use client";
import CommonLayout, {
  Header,
  Content,
  Footer,
} from "../../../commonLayout/page";
import Link from "next/link";
import { useEffect, useState } from "react";
import productData from "/public/product.json";
import itemData from "/public/item.json";
import inventoryData from "/public/inventory.json";

export default function Product({ params }) {
  const [eachProduct, setEachProduct] = useState({});
  const [eachItem, setEachItem] = useState({});
  const [quantity, setQuantity] = useState(0);

  useEffect(
    function () {
      const eachItemData = itemData.filter((item) => item.itemid === params.id);
      setEachItem(eachItemData[0]);

      const quantity = inventoryData.filter(
        (inventory) => inventory.itemid === params.id
      );
      setQuantity(quantity[0].qty);

      const eachProductData = productData.filter(
        (product) => product.productid === eachItemData[0].productid
      );
      setEachProduct(eachProductData[0]);
    },
    [params.id]
  );

  if (!params.id) return <></>;

  return (
    <div>
      <Header />
      <Content>
        <BackLink itemObj={eachItem} />
        <EachProduct
          productObj={eachProduct}
          itemObj={eachItem}
          inventoryQty={quantity}
        />
      </Content>
      <Footer />
    </div>
  );
}

function BackLink({ itemObj }) {
  return (
    <div id="BackLink">
      <Link href={`/catalog/products/${itemObj.productid}`}>
        Return to <span>{itemObj.productid}</span>
      </Link>
    </div>
  );
}

function EachProduct({ itemObj, productObj, inventoryQty }) {
  if (!itemObj || Object.keys(itemObj).length === 0) {
    return null;
  }

  const matchResult = productObj.descn.match(/src="([^"]+)"[^>]*>([^<]+)/);
  const imageUrl = matchResult ? matchResult[1] : ""; // 圖片Url
  const description = matchResult ? matchResult[2] : ""; // item description

  return (
    <div id="Catalog">
      <table>
        <thead>
          <tr>
            <td>
              <img src={imageUrl} alt="itemImg" />
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
              {inventoryQty} {inventoryQty > 0 ? "in stock." : "out of stock"}
            </td>
          </tr>
          <tr>
            <td>
              {itemObj.listprice.toString().match(/\.\d$/)
                ? `$${itemObj.listprice}0`
                : `$${itemObj.listprice}`}
            </td>
          </tr>
          <tr>
            <td>
              <Link href="" className="Button">
                Add to Cart
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
