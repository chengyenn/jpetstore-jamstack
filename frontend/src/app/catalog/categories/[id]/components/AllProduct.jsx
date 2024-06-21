import Link from "next/link";

export default function AllProduct({ eachProductData, id }) {
  const title = id.charAt(0) + id.slice(1).toLowerCase();

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
          {eachProductData.map((product) => (
            <tr key={product.productid}>
              <td>
                <Link href={`/catalog/products/${product.productid}`}>
                  {product.productid}
                </Link>
              </td>
              <td>{product.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
