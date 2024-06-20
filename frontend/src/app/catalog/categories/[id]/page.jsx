// product data
"use client";
import Header from "@/app/components/Header";
import Content from "@/app/components/Content";
import AllProduct from "@/app/catalog/categories/[id]/components/AllProduct";
import Footer from "@/app/components/Footer";
import Link from "next/link";

export default function Category({ params }) {
  if (!params.id) return <></>;

  return (
    <div>
      <Header />
      <Content>
        <div id="BackLink">
          <Link href="/catalog">Return to Main Menu</Link>
        </div>

        <AllProduct id={params.id} />
      </Content>
      <Footer />
    </div>
  );
}
