// "use client";
import CommonLayout, {
  Header,
  Content,
  Footer,
} from "../../../commonLayout/page";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Category({ params }) {
  // const router = useRouter();
  // const { id } = router.query;

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
  return (
    <div id="Catalog">
      <h2>{title}</h2>
    </div>
  );
}
