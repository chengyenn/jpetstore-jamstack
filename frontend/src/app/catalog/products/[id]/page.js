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

export default function Product({ params }) {
  const [eachProduct, setEachProduct] = useState({});
  const [eachItem, setEachItem] = useState([]);

  useEffect(
    function () {
      const eachProductData = productData.filter(
        (product) => product.productid === params.id
      );
      setEachProduct(eachProductData[0]);
      const eachItemData = itemData.filter(
        (item) => item.productid === params.id
      );
      setEachItem(eachItemData);
    },
    [params.id]
  );
  if (!params.id) return <></>;

  return (
    <div>
      <Header />
      <Content>
        <BackLink productObj={eachProduct} />
        <EachProduct
          id={params.id}
          productObj={eachProduct}
          itemArr={eachItem}
        />
      </Content>
      <Footer />
    </div>
  );
}

function BackLink({ productObj }) {
  return (
    <div id="BackLink">
      <Link href={`/catalog/categories/${productObj.category}`}>
        Return to <span>{productObj.category}</span>
      </Link>
    </div>
  );
}

function EachProduct({ id, productObj, itemArr }) {
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
          {itemArr.map((item) => (
            <tr key={item.itemid}>
              <td>
                <Link href={`/catalog/items/${item.itemid}`}>
                  {item.itemid}
                </Link>
              </td>
              <td>{productObj.productid}</td>
              <td>
                {item.attr1} {productObj.name}
              </td>
              <td>
                {item.listprice.toString().match(/\.\d$/)
                  ? `$${item.listprice}0`
                  : `$${item.listprice}`}
              </td>
              <td>
                <Link href="" className="Button">
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
