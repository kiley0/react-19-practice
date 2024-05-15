import React from "react";
import { OrderContext } from "./OrderContext";
import { z } from "zod";

export const orderSchema = z.object({
  customerName: z.string(),
  cheese: z.string(),
  protein: z.string(),
  bread: z.string(),
});

export type Order = z.infer<typeof orderSchema>;

export function OrderForm() {
  const { order, updateOrder } = React.use(OrderContext);
  const [optimisticOrder, setOptimisticOrder] = React.useOptimistic<Order>({
    customerName: "",
    cheese: "",
    protein: "",
    bread: "",
  });

  const [error, submitAction, isPending] = React.useActionState(
    async (previousState: any, formData: FormData) => {
      const customerName = formData.get("customerName");
      const cheese = formData.get("cheese");
      const protein = formData.get("protein");
      const bread = formData.get("bread");

      const data = orderSchema.parse({ customerName, cheese, protein, bread });

      setOptimisticOrder(data);

      const orderRes = await updateOrder({ ...data });

      return orderRes;
    },
    null
  );

  return (
    <form action={submitAction}>
      <div>
        <label htmlFor="customerName">Your Name</label>
        <input
          required
          type="text"
          name="customerName"
          defaultValue={order?.customerName || ""}
        />
      </div>
      <div>
        <label htmlFor="cheese">Select Cheese</label>
        <select required name="cheese">
          <option />
          <option>Provolone</option>
          <option>Swiss</option>
          <option>Cheddar</option>
        </select>
      </div>
      <div>
        <label htmlFor="protein">Select Protein</label>
        <select required name="protein">
          <option />
          <option>Turkey</option>
          <option>Ham</option>
          <option>Tofu</option>
        </select>
      </div>
      <div>
        <label htmlFor="bread">Select Bread</label>
        <select required name="bread">
          <option />
          <option>White</option>
          <option>Wheat</option>
          <option>Lettuce Wrap</option>
        </select>
      </div>
      <button type="submit" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit Order"}
      </button>
      {optimisticOrder.customerName && (
        <p>Submitting order for {optimisticOrder.customerName}...</p>
      )}
    </form>
  );
}
