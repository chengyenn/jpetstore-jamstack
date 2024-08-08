export default function addItemtoCart(thisItem, productObj, inventoryQty) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let itemExists = false;

  const updatedCart = cart.map((item) => {
    if (item.itemid === thisItem.itemid) {
      itemExists = true;
      if (item.quantity + 1 <= inventoryQty) {
        return { ...item, quantity: item.quantity + 1 };
      }
    }
    return item;
  });
  if (!itemExists) {
    const des = thisItem.attr1 + " " + productObj.name;
    const newCartItem = {
      itemid: thisItem.itemid,
      productid: productObj.productid,
      description: des,
      inStock: inventoryQty > 0 ? "true" : "false",
      quantity: 1,
      listprice: thisItem.listprice,
    };
    updatedCart.push(newCartItem);
  }

  localStorage.setItem("cart", JSON.stringify(updatedCart));
}
