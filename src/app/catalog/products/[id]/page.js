// product data
import fishData from "/public/fishData.json";
import dogsData from "/public/dogsData.json";
import reptilesData from "/public/reptilesData.json";
import catsData from "/public/catsData.json";
import birdsData from "/public/birdsData.json";
import CommonLayout, {
  Header,
  Content,
  Footer,
} from "../../../commonLayout/page";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Product({ params }) {
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
  const title = id.slice(0, 2);
  let category;
  title === "FI"
    ? (category = fishData)
    : title === "K9"
    ? (category = dogsData)
    : title === "RP"
    ? (category = reptilesData)
    : title === "FL"
    ? (category = catsData)
    : (category = birdsData);

  let product = category.find((el) => el.productid === id);

  return (
    <div id="Catalog">
      <h2>{product.name}</h2>
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
          {product.items.map((item) => (
            <tr key={item.itemid}>
              <td>
                <Link href="">{item.itemid}</Link>
              </td>
              <td>{product.productid}</td>
              <td>
                {item.attr1} {product.name}
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
