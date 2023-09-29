import { useState } from 'react';
import classes from './MealItem.module.css';
import MealItemForm from './MealItemForm';

const MealItem = (props) => {
  const [isLoading, setIsLoading] = useState(false);

  const price = `₹${props.price}`;

  const addToCartHandler = async (amount) => {
    setIsLoading(true);

    try {
      const response = await fetch('https://medical-50953-default-rtdb.europe-west1.firebasedatabase.app/cartItem.json', {
        method: 'POST',
        body: JSON.stringify({
          id: props.id,
          name: props.name,
          amount: amount,
          price: props.price,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to add item to the cart.');
      }

      setIsLoading(false);
    } catch (error) {
      console.error('Error adding item to the cart:', error);
      setIsLoading(false);
    }
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.description}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} isLoading={isLoading} />
      </div>
    </li>
  );
};

export default MealItem;
