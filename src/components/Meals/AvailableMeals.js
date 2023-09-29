import classes from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import { useState } from 'react';
import { useEffect } from 'react';

const AvailabeMeals=(props)=>{
  const [meals, setMeals] = useState([]);
  
  useEffect(() => {
    fetch('https://medical-50953-default-rtdb.europe-west1.firebasedatabase.app/cart.json') 
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch meal data');
        }
        return response.json();
      })
      .then((data) => {
        const loadedMeals = [];
        for (const mealId in data) {
          loadedMeals.push({
            id: mealId,
            name: data[mealId].name,
            description: data[mealId].description,
            price: data[mealId].price,
          });
        }
        setMeals(loadedMeals);
      })
      .catch((error) => {
        console.error('Error fetching meal data:', error);
      });
  }, []);
    return (<section className={classes.meals}>
        <Card>
            <ul>
                {meals.map(meal => <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price}/>)}
            </ul>
        </Card>
    </section>)
};

export default AvailabeMeals;