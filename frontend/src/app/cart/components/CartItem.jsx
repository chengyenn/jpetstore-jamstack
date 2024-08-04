import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartItem({ itemObj, onRemoveItem, onSubTotal }) {
  const [quantity, setQuantity] = useState(itemObj.quantity);
  let totalCost = itemObj.listprice * quantity;

  useEffect(() => {
    onSubTotal(quantity, totalCost, itemObj.itemid);
  }, [quantity]);

  return (
    <tr>
      <td>
        <Link href={`/catalog/items/${itemObj.itemid}`}>
          <span>{itemObj.itemid}</span>
        </Link>
      </td>
      <td>
        <span>{itemObj.productid}</span>
      </td>
      <td>
        <span>{itemObj.description}</span>
      </td>
      <td>
        <span>{itemObj.inStock}</span>
      </td>
      <td>
        <input
          type="number"
          min={1}
          max={itemObj.inStock}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </td>
      <td>
        <span>{`$${itemObj.listprice.toFixed(2)}`}</span>
      </td>
      <td>
        <span>{`$${totalCost.toFixed(2)}`}</span>
      </td>
      <td>
        <Link
          href="/cart"
          className="button"
          onClick={() => onRemoveItem(itemObj)}
        >
          Remove
        </Link>
      </td>
    </tr>
  );
}
