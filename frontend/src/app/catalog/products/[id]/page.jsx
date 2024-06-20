// product data
"use client";
import Header from "@/app/components/Header";
import Content from "@/app/components/Content";
import AllItem from "@/app/catalog/products/[id]/components/AllItem";
import Footer from "@/app/components/Footer";
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
        <div id="BackLink">
          <Link href={`/catalog/categories/${eachProduct.category}`}>
            Return to <span>{eachProduct.category}</span>
          </Link>
        </div>

        <AllItem productObj={eachProduct} itemArr={eachItem} />
      </Content>
      <Footer />
    </div>
  );
}
