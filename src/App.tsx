import { OrderProvider } from "./OrderContext";
import { OrderForm } from "./OrderForm";
import { Orders } from "./Orders";
import { YourOrder } from "./YourOrder";

function App() {
  return (
    <OrderProvider>
      <h1>Mac's Sandwiches</h1>
      <OrderForm />
      <YourOrder />
      <Orders />
    </OrderProvider>
  );
}

export default App;
