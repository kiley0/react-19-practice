import React from "react";

const fetchOrders: Promise<
  Array<{ id: number; title: string; completed: boolean }>
> = fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
  res.json()
);

export function Orders() {
  return (
    <>
      <h2>All Orders</h2>
      <React.Suspense fallback={<p>Loading...</p>}>
        <OrdersList />
      </React.Suspense>
    </>
  );
}

function OrdersList() {
  const orders = React.use(fetchOrders);

  return (
    <ol>
      {orders.map((o) => (
        <li
          key={o.id}
          style={{ textDecoration: o.completed ? "line-through" : "none" }}
        >
          Order for {o.title}
        </li>
      ))}
    </ol>
  );
}
