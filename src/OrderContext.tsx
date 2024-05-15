import React from "react";
import { wait } from "./utils";
import type { Order } from "./OrderForm";

export const OrderContext = React.createContext<{
  order: Order | null;
  updateOrder(newOrder: Order): Promise<{ success: boolean }>;
}>({
  order: null,
  updateOrder: () => new Promise((resolve) => resolve({ success: true })),
});

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [order, setOrder] = React.useState<Order | null>(null);

  const updateOrder = async (newOrder: Order) => {
    // simulate a server call to save the order
    await wait(3);
    setOrder(newOrder);
    return { success: true };
  };

  return (
    <OrderContext.Provider value={{ order, updateOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
