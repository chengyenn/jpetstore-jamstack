// product data
"use client";
import Header from "@/app/components/Header";
import Content from "@/app/components/Content";
import EachItem from "@/app/catalog/items/[id]/components/EachItem";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import { useEffect, useState } from "react";
import productData from "/public/product.json";
import itemData from "/public/item.json";
import inventoryData from "/public/inventory.json";

export default function Item({ params }) {
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
        <div id="BackLink">
          <Link href={`/catalog/products/${eachItem.productid}`}>
            Return to <span>{eachItem.productid}</span>
          </Link>
        </div>

        <EachItem
          productObj={eachProduct}
          itemObj={eachItem}
          inventoryQty={quantity}
        />
      </Content>
      <Footer />
    </div>
  );
}
