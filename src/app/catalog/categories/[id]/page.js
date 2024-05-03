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

export default function Category({ params }) {
  if (!params.id) return <></>;

  return (
    <div>
      <Header />
      <Content>
        <BackLink />
        <EachProduct id={params.id} />
      </Content>
      <Footer />
    </div>
  );
}

function BackLink() {
  return (
    <div id="BackLink">
      <Link href="/catalog">Return to Main Menu</Link>
    </div>
  );
}

function EachProduct({ id }) {
  const title = id.charAt(0) + id.slice(1).toLowerCase();
  const [eachProduct, setEachProduct] = useState([]);

  useEffect(
    function () {
      const eachProductData = productData.filter(
        (product) => product.category === id
      );
      setEachProduct(eachProductData);
    },
    [id]
  );

  return (
    <div id="Catalog">
      <h2>{title}</h2>
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {eachProduct.map((product) => (
            <tr key={product.productid}>
              <td>
                <Link href={`/catalog/products/${product.productid}`}>
                  {product.productid}
                </Link>
              </td>
              <td>{product.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
