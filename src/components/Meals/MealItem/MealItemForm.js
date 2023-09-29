import classes from './MealItemForm.module.css';
import Input from '../../UI/Input';
import { useRef, useState } from 'react';

const MealItemForm=(props)=>{

    const [amountIsValid, setAmountIsValid]=useState(true);
    const amountRef=useRef();

    const submitting=(e)=>{
        e.preventDefault();
        console.log('Clicked')
        const enteredAmount= amountRef.current.value;
        const enteredAmountNumber=+enteredAmount;

        if(enteredAmount.trim().length===0 || enteredAmountNumber<1 || enteredAmountNumber>5){
            setAmountIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmountNumber);
    }

    return (
        <form className={classes.form} onSubmit={submitting}>
            <Input ref={amountRef} label="Item Quantity" input={{
                id: 'amount',
                type: 'number',
                min: '1',
                max: '5',
                step: '1',
                defaultValue: '1',
            }} />
            <button type='submit'>Add Item</button>
            {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
        </form>
    )
}

export default MealItemForm;