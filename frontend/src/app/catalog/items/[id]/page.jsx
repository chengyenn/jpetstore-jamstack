// product data
import Header from "@/app/components/Header";
import Content from "@/app/components/Content";
import EachItem from "@/app/catalog/items/[id]/components/EachItem";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import productData from "/public/product.json";
import itemData from "/public/item.json";
import inventoryData from "/public/inventory.json";

export function generateStaticParams() {
  return itemData.map((item) => {
    id: item.itemid;
  });
}

export default function Item({ params }) {
  if (!params.id) return <></>;

  const eachItem = itemData.find((item) => item.itemid === params.id);
  const whichProduct = productData.find(
    (product) => product.productid === eachItem.productid
  );
  const quantity = inventoryData.find(
    (inventory) => inventory.itemid === params.id
  ).qty;

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
          itemObj={eachItem}
          inventoryQty={quantity}
          productObj={whichProduct}
        />
      </Content>
      <Footer />
    </div>
  );
}
