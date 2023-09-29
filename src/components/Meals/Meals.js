import MealsSummary from "./MealsSummary";
import AvailabeMeals from "./AvailableMeals";
import { useState } from "react";

const Meals=()=>{
    const [medicineData, setMedicineData] = useState(null);

    const formData=(data)=>{
            const medicineData={
                ...data,
                id: Math.random.toString()
            }
            setMedicineData(medicineData);
    }
    return (
        <>
            <MealsSummary onSaveData={formData}/>
            <AvailabeMeals passedData={medicineData}/>
        </>
    )
}

export default Meals;