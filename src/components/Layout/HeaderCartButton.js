import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css';
import { useState, useEffect } from "react";

const HeaderCartButton = (props) => {
    const [numberOfItems, setNumberOfItems] = useState(0);

    useEffect(() => {
        fetch('https://medical-50953-default-rtdb.europe-west1.firebasedatabase.app/cartItem.json') 
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch cart data');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Fetched data:', data);
                let totalItems = 0;
                for (const itemId in data) {
                    totalItems += data[itemId].amount;
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
