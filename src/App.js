import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import { useState } from "react";
import CartProvider from "./store/cart-provider";

function App() {

  const [showCart, setShowCart]=useState(false);

  const enableCart=()=>{
    setShowCart(true);
  }
  const disableCart=()=>{
    setShowCart(false);
  }

  return (
    <CartProvider>
      {showCart&&<Cart onClose={disableCart}/>}
      <Header onShow={enableCart}/>
      <main>
        <Meals/>
      </main>
    </CartProvider>
  );
}

export default App;
