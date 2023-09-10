import { useState } from "react";
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import ShowCartContext from "./Components/Store/Context";
import CartProvider from "./Components/Store/CartProvider";

function App() {
  const [showCart, setShowCast] = useState(false);

  const showCartHandler = () => {
    setShowCast(true);
  }

  const hideCartHandler = () => {
    setShowCast(false)
  }

  return (
    <CartProvider>
    <ShowCartContext.Provider value={{
      showCart: showCartHandler,
      hideCart: hideCartHandler
    }}>
    <div className="App">
      {showCart && <Cart />}
      <Header />
      <Meals />
    </div>
    </ShowCartContext.Provider>
    </CartProvider>
  );
}

export default App;
