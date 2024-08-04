import OrderItemTable from "@/app/order/orderInfo/[id]/components/OrderItemTable";

export default function OrderInfoTable({ thisOrderInfo }) {
  return (
    <table>
      <thead>
        <tr>
          <th align="center" colSpan="2">
            Order #<span id="orderId">{thisOrderInfo.orderId}</span>
            <span>&nbsp;</span>
            <span>{thisOrderInfo.orderDate}</span>
          </th>
        </tr>
        <tr>
          <th colSpan="2">Payment Details</th>
        </tr>
      </thead>
      <tbody>
        <OrderTableRow title="Card Type:" content={thisOrderInfo.cardType} />
        <OrderTableRow
          title="Card Number:"
          content={thisOrderInfo.creditCard}
        />
        <OrderTableRow
          title="Expiry Date (MM/YYYY):"
          content={thisOrderInfo.expiryDate}
        />
        <tr>
          <th colSpan="2">Shipping Address</th>
        </tr>
        <OrderTableRow
          title="First name:"
          content={thisOrderInfo.shipToFirstName}
        />
        <OrderTableRow
          title="Last name:"
          content={thisOrderInfo.shipToLastName}
        />
        <OrderTableRow
          title="Address 1:"
          content={thisOrderInfo.shipAddress1}
        />
        <OrderTableRow
          title="Address 2:"
          content={thisOrderInfo.shipAddress2}
        />
        <OrderTableRow title="City:" content={thisOrderInfo.shipCity} />
        <OrderTableRow title="State:" content={thisOrderInfo.shipState} />
        <OrderTableRow title="Zip:" content={thisOrderInfo.shipZip} />
        <OrderTableRow title="Country:" content={thisOrderInfo.shipCountry} />
        <OrderTableRow title="Courier:" content={thisOrderInfo.courier} />
        <tr>
          <td colSpan="2">
            Status: <span>{thisOrderInfo.status}</span>
          </td>
        </tr>
        <tr>
          <td colSpan="2">
            <OrderItemTable
              itemsArr={thisOrderInfo.lines || []}
              orderTotalPrice={thisOrderInfo.totalPrice || 0}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function OrderTableRow({ title, content }) {
  return (
    <tr>
      <td>{title}</td>
      <td>
        <span>{content}</span>
        {title === "Card Number:" && " * Fake number!"}
      </td>
    </tr>
  );
}
