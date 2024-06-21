import Link from "next/link";

export default function EachItem({ itemObj, productObj, inventoryQty }) {
  // if (!itemObj || Object.keys(itemObj).length === 0) {
  //   return null;
  // }

  const matchResult = productObj.descn.match(/src="([^"]+)"[^>]*>([^<]+)/);
  const imageUrl = matchResult ? matchResult[1] : ""; // 圖片Url
  const description = matchResult ? matchResult[2] : ""; // item description

  return (
    <div id="Catalog">
      <table>
        <thead>
          <tr>
            <td>
              <img src={imageUrl} alt="itemImg" />
              <span>{description}</span>
            </td>
          </tr>
          <tr>
            <td>
              <b>
                <span>{itemObj.itemid}</span>
              </b>
            </td>
          </tr>
          <tr>
            <td>
              <b>
                <span style={{ fontSize: "18px" }}>
                  {itemObj.attr1} {productObj.name}
                </span>
              </b>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{productObj.name}</td>
          </tr>
          <tr>
            <td>
              {inventoryQty > 0 ? `${inventoryQty} in stock.` : "out of stock"}
            </td>
          </tr>
          <tr>
            <td>
              {itemObj.listprice.toString().match(/\.\d$/)
                ? `$${itemObj.listprice}0`
                : `$${itemObj.listprice}`}
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
