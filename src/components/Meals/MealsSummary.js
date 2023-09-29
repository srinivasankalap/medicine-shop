import classes from './MealsSummary.module.css';
import { useRef } from 'react';

const MealsSummary=(props)=>{
    const nameInputRef=useRef()
    const descInputRef=useRef()
    const priceInputRef=useRef()

    const submithandler=async(e)=>{
        e.preventDefault();
        const data={
            name: nameInputRef.current.value,
            description: descInputRef.current.value,
            price: priceInputRef.current.value
        }
        try {
            const response = await fetch('https://medical-50953-default-rtdb.europe-west1.firebasedatabase.app/cart.json', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to add medicine to the database.');
            }
            nameInputRef.current.value = '';
            descInputRef.current.value = '';
            priceInputRef.current.value = '';

            props.onSaveData(data);
        } catch (error) {
            console.error('Error adding medicine:', error);
        }
    }
    return(
        <section className={classes.summary}>
            <h2>Add Medicine</h2>
            <form onSubmit={submithandler}>
                <label htmlFor='name'>Medicine Name</label>
                <input type='name' id='name' ref={nameInputRef} />
                <label htmlFor='desc'>Medicine Description</label>
                <input type='text' id='desc' ref={descInputRef} />
                <label htmlFor='price'>Medicine Price</label>
                <input type='number' id='price' ref={priceInputRef} />
                <button type='submit'>Add Medicine</button>
            </form>
        </section>
    )
}

export default MealsSummary;