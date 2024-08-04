import Link from "next/link";

export default function OrderItemTable({ itemsArr, orderTotalPrice }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Item ID</th>
          <th>Description</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Total Cost</th>
        </tr>
      </thead>
      <tbody>
        {itemsArr.map((eachItem) => (
          <ItemRow key={eachItem.itemId} itemObj={eachItem} />
        ))}
        <tr>
          <th colSpan="5">
            Total: <span>{`$${orderTotalPrice.toFixed(2)}`}</span>
          </th>
        </tr>
      </tbody>
    </table>
  );
}

function ItemRow({ itemObj }) {
  return (
    <tr>
      <td>
        <Link href={`/catalog/items/${itemObj.item.itemId}`}>
          <span>{itemObj.item.itemId}</span>
        </Link>
      </td>
      <td>
        {itemObj ? (
          <div>
            <span>{itemObj.item.attribute1}</span>
            <span>{itemObj.item.attribute2}</span>
            <span>{itemObj.item.attribute3}</span>
            <span>{itemObj.item.attribute4}</span>
            <span>{itemObj.item.attribute5}</span>
            <span>&nbsp;</span>
            <span>{itemObj.item.product.name}</span>
          </div>
        ) : (
          <div>
            <i>description unavailable</i>
          </div>
        )}
      </td>
      <td>
        <span>{itemObj.quantity}</span>
      </td>
      <td>
        <span>{`$${itemObj.unitPrice.toFixed(2)}`}</span>
      </td>
      <td>
        <span>{`$${itemObj.total.toFixed(2)}`}</span>
      </td>
    </tr>
  );
}
