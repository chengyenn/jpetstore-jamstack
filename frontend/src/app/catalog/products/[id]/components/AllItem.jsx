import Link from "next/link";

export default function AllItem({ productObj, itemsData }) {
  return (
    <div id="Catalog">
      <h2>{productObj.name}</h2>
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
          {itemsData.map((item) => (
            <tr key={item.itemid}>
              <td>
                <Link href={`/catalog/items/${item.itemid}`}>
                  {item.itemid}
                </Link>
              </td>
              <td>{productObj.productid}</td>
              <td>
                {item.attr1} {productObj.name}
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
