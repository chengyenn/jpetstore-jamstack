export default function addItemtoCart(thisItem, productObj, inventoryQty) {
  const des = thisItem.attr1 + " " + productObj.name;
  const newCartItem = {
    itemid: thisItem.itemid,
    productid: productObj.productid,
    description: des,
    inStock: inventoryQty > 0 ? "true" : "false",
    quantity: 1,
    listprice: thisItem.listprice,
  };

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(newCartItem);
  localStorage.setItem("cart", JSON.stringify(cart));
}
