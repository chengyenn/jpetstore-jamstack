// product data

import CommonLayout, {
  Header,
  Content,
  Footer,
} from "../../../commonLayout/page";
import Link from "next/link";

export default function Product({ params }) {
  if (!params.id) return <></>;

  const title = params.id.slice(0, 2);
  // let category;
  // title === "FI"
  //   ? (category = fishData)
  //   : title === "K9"
  //   ? (category = dogsData)
  //   : title === "RP"
  //   ? (category = reptilesData)
  //   : title === "FL"
  //   ? (category = catsData)
  //   : (category = birdsData);

  const decodedId = decodeURIComponent(params.id); // %3D 是 URL 編碼的的 =，所以直接 split 會找不到 =
  const [pdtId, value] = decodedId.split("="); // pdtId 就會是該 item 所屬 product, value 就是該 item

  return (
    <div>
      <Header />
      <Content>
        <BackLink categoryData={category} idArr={[pdtId, value]} />
        <EachProduct
          id={params.id}
          categoryData={category}
          idArr={[pdtId, value]}
        />
      </Content>
      <Footer />
    </div>
  );
}

function BackLink({ idArr }) {
  return (
    <div id="BackLink">
      <Link href={`/catalog/products/${idArr[0]}`}>
        Return to <span>{idArr[0]}</span>
      </Link>
    </div>
  );
}

function EachProduct({ idArr, categoryData }) {
  let product = categoryData.find((el) => el.productid === idArr[0]);
  let item = product.items.find((el) => el.itemid === idArr[1]);
  return (
    <div id="Catalog">
      <table>
        <thead>
          <tr>
            <td>
              <img src={product.imgUrl} alt="itemImg" />
              <span>{product.desc}</span>
            </td>
          </tr>
          <tr>
            <td>
              <b>
                <span>{item.itemid}</span>
              </b>
            </td>
          </tr>
          <tr>
            <td>
              <b>
                <span style={{ fontSize: "18px" }}>
                  {item.attr1} {product.name}
                </span>
              </b>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{product.name}</td>
          </tr>
          <tr>
            <td>
              {item.qty} {item.qty > 0 ? "in stock." : "out of stock"}
            </td>
          </tr>
          <tr>
            <td>
              {item.listprice.toString().match(/\.\d$/)
                ? `$${item.listprice}0`
                : `$${item.listprice}`}
            </td>
          </tr>
          <tr>
            <td>
              <Link href="" className="Button">
                Add to Cart
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
