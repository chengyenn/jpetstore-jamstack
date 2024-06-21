// product data
import Header from "@/app/components/Header";
import Content from "@/app/components/Content";
import AllProduct from "@/app/catalog/categories/[id]/components/AllProduct";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import categories from "/public/category.json";
import productData from "/public/product.json";

export function generateStaticParams() {
  return categories.map((category) => {
    id: category.catid;
  });
}

export default function Category({ params }) {
  if (!params.id) return <></>;

  const eachProductData = productData.filter(
    (product) => product.category === params.id
  );

  return (
    <div>
      <Header />
      <Content>
        <div id="BackLink">
          <Link href="/catalog">Return to Main Menu</Link>
        </div>

        <AllProduct eachProductData={eachProductData} id={params.id} />
      </Content>
      <Footer />
    </div>
  );
}
