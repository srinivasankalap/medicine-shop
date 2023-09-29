import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCart={
    items: [],
    totalAmount: 0
}

const cartReducer = async (state, action) => {
    if (action.type === 'ADD_ITEM') {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );
      const existingCartItem = state.items[existingCartItemIndex];
  
      const updatedAmount =
        state.totalAmount + action.item.price * action.item.amount;
  
      let updatedItems;
  
      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          amount: existingCartItem.amount + action.item.amount,
        };
  
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat(action.item);
      }
  
      await fetch(
        'https://medical-50953-default-rtdb.europe-west1.firebasedatabase.app/cartItem.json',
        {
          method: 'PATCH',
          body: JSON.stringify({
            [action.item.id]: {
              amount: existingCartItem
                ? existingCartItem.amount + action.item.amount
                : action.item.amount,
            },
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      return {
        items: updatedItems,
        totalAmount: updatedAmount,
      };
    }
  
    if (action.type === 'REMOVE_ITEM') {
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.id === action.id
      );
      const existingItem = state.items[existingCartItemIndex];
  
      const updatedAmount = state.totalAmount - existingItem.price;
  
      let updatedItems;
  
      if (existingItem.amount === 1) {
        updatedItems = state.items.filter((item) => item.id !== action.id);
      } else {
        const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }
  
      await fetch(
        `https://medical-50953-default-rtdb.europe-west1.firebasedatabase.app/cartItem/${action.id}.json`,
        {
          method: 'PATCH',
          body: JSON.stringify({
            amount: existingItem.amount - 1,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      return {
        items: updatedItems,
        totalAmount: updatedAmount,
      };
    }
  
    localStorage.setItem('cart', JSON.stringify(defaultCart));
    return defaultCart;
  };
  


const CartProvider=(props)=>{
    const [cartState, dispatchAction] = useReducer(cartReducer, defaultCart);

    const addItemCart=item=>{
        dispatchAction({type: 'ADD_ITEM', item: item});
    };

    const removeItemCart=id=>{
        dispatchAction({type: 'REMOVE_ITEM', id: id});
    }

    const cartContextHelper={
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemCart,
        removeItem: removeItemCart
    }

    return (<CartContext.Provider value={cartContextHelper}>
        {props.children}
    </CartContext.Provider>)
}

export default CartProvider;