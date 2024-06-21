// product data
import Header from "@/app/components/Header";
import Content from "@/app/components/Content";
import AllItem from "@/app/catalog/products/[id]/components/AllItem";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import productData from "/public/product.json";
import itemData from "/public/item.json";

export function generateStaticParams() {
  return productData.map((product) => {
    id: product.productid;
  });
}

export default function Product({ params }) {
  if (!params.id) return <></>;

  // filter 會是 array，find 會是 object
  const whichCategory = productData.find(
    (product) => product.productid === params.id
  );
  const eachItemData = itemData.filter((item) => item.productid === params.id);

  return (
    <div>
      <Header />
      <Content>
        <div id="BackLink">
          <Link href={`/catalog/categories/${whichCategory.category}`}>
            Return to <span>{whichCategory.category}</span>
          </Link>
        </div>

        <AllItem productObj={whichCategory} itemsData={eachItemData} />
      </Content>
      <Footer />
    </div>
  );
}
