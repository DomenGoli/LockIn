
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect, useState } from "react";
import { savePlanToLocalStorage } from "../days/day_input/dayObjectSlice";

function Plan() {
    // const {plan} = useAppSelector(store => store.dayObject)
    const {plan, date, dayId} = useAppSelector(store => store.diary)
    const {isNoteOpen} = useAppSelector(store => store.diary)
    const [value, setValue] = useState(() => plan)


    const dispatch = useAppDispatch();


    function handleSavingPlan() {
        dispatch(savePlanToLocalStorage(value));
    }

    
    useEffect(function(){
        setValue(plan)
    },[plan])
    
    if(!isNoteOpen) return null
    
    return (
        <div className="flex flex-col justify-center items-center">
            <p>Plan: {dayId === "0" ? "Danes" : date}</p>
            <textarea
                className="w-[300px] h-[300px] bg-stone-100 text-black p-1"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={handleSavingPlan}
                disabled={dayId === "0" ? false : true}
                
            />
        </div>
    );
}

export default Plan;