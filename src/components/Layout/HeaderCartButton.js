import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css';
import { useContext } from "react";
import CartContext from "../../store/cart-context";
import { useState, useEffect } from "react";

const HeaderCartButton=(props)=>{
    const [numberOfItems, setNumberOfItems] = useState(0);

    useEffect(() => {
        // Make an API request to your database to fetch cart data
        fetch('https://medical-50953-default-rtdb.europe-west1.firebasedatabase.app/cart.json') // Replace with your actual database URL
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch cart data');
                }
                return response.json();
            })
            .then((data) => {
                // Calculate the total number of items in the cart
                let totalItems = 0;
                for (const itemId in data.items) {
                    totalItems += data.items[itemId].amount;
                }
                setNumberOfItems(totalItems);
            })
            .catch((error) => {
                console.error('Error fetching cart data:', error);
            });
    }, []);

    return (
        <button className={classes.button} onClick={props.onClick}>
            <span className={classes.icon}>
                <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfItems}</span>
        </button>
    )
}

export default HeaderCartButton;