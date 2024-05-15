import React from "react";
import { OrderContext } from "./OrderContext";

export function YourOrder() {
  const { order } = React.use(OrderContext);

  if (!order) {
    return null;
  }

  return (
    <>
      <h2>Your Order</h2>
      <p>
        Name: {order.customerName}
        <br />
        Cheese: {order.cheese}
        <br />
        Protein: {order.protein}
        <br />
        Bread: {order.bread}
      </p>
    </>
  );
}
