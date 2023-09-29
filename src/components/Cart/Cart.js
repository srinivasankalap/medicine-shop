import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import { useState, useEffect } from "react";
import CartItem from "./CartItem";

const Cart = (props) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetch('https://medical-50953-default-rtdb.europe-west1.firebasedatabase.app/cartItem.json') 
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch cart data');
        }
        return response.json();
      })
      .then((data) => {
        // Process the fetched cart data
        const loadedCartItems = [];
        let loadedTotalAmount = 0;

        for (const itemId in data) {
          const item = data[itemId];
          loadedCartItems.push({
            id: itemId,
            name: item.name,
            amount: item.amount,
            price: item.price,
          });
          loadedTotalAmount += item.amount * item.price;
        }

        setCartItems(loadedCartItems);
        setTotalAmount(loadedTotalAmount);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching cart data:', error);
        setIsLoading(false);
      });
  }, []);


  const cartItemRemove = (id) => {
    fetch(`https://medical-50953-default-rtdb.europe-west1.firebasedatabase.app/cartItem/${id}.json`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to remove item from the cart');
        }
        return response.json();
      })
      .then(() => {
        const updatedCartItems = cartItems.filter((item) => item.id !== id);
        const updatedTotalAmount = cartItems.reduce(
          (total, item) => total + item.price * item.amount,
          0
        );
        setCartItems(updatedCartItems);
        setTotalAmount(updatedTotalAmount);
      })
      .catch((error) => {
        console.error('Error removing item from the cart:', error);
      });
  };

  const cartItemAdd = (item) => {
    fetch(`https://medical-50953-default-rtdb.europe-west1.firebasedatabase.app/cartItem/${item.id}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: item.amount + 1,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add item to the cart');
        }
        return response.json();
      })
      .then(() => {
        const updatedCartItems = cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, amount: cartItem.amount + 1 }
            : cartItem
        );
        const updatedTotalAmount = cartItems.reduce(
          (total, cartItem) => total + cartItem.price * cartItem.amount,
          0
        );
        setCartItems(updatedCartItems);
        setTotalAmount(updatedTotalAmount);
      })
      .catch((error) => {
        console.error('Error adding item to the cart:', error);
      });
  };
  const cartItemsContent = (
    <ul className={classes["cart-items"]}>
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemove.bind(null, item.id)}
          onAdd={cartItemAdd.bind(null, item)}
        />
      ))}
    </ul>
  );

  console.log(cartItems);
  return (
    <Modal onClose={props.onClose}>
      {isLoading && <p>Loading...</p>}
      {!isLoading && cartItemsContent}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>₹{totalAmount.toFixed(2)}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {cartItems.length > 0 && (
          <button className={classes.button}>Order</button>
        )}
      </div>
    </Modal>
  );
};
export default Cart;
