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
  let category;
  title === "Fish"
    ? (category = fishData)
    : title === "Dogs"
    ? (category = dogsData)
    : title === "Reptiles"
    ? (category = reptilesData)
    : title === "Cats"
    ? (category = catsData)
    : (category = birdsData);

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
          {category.map((product) => (
            <tr key={product.productid}>
              <td>
                <Link href="">{product.productid}</Link>
              </td>
              <td>{product.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* <table>
        <tr>
          <th>Product ID</th>
          <th>Name</th>
        </tr>

        {category.map((product) => (
          <tr key={product.productid}>
            <td>
              <a>{product.productid}</a>
            </td>
            <td>{product.name}</td>
          </tr>
        ))}
      </table> */}
    </div>
  );
}
