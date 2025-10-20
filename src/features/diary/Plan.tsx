
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect, useState } from "react";
import { savePlanToLocalStorage } from "../days/day_input/dayObjectSlice";

function Plan() {
    // const {plan} = useAppSelector(store => store.dayObject)
    const {plan, date} = useAppSelector(store => store.diary)
    const {isPlanOpen} = useAppSelector(store => store.diary)
    const [value, setValue] = useState(() => plan)


    const dispatch = useAppDispatch();


    function handleSavingPlan() {
        dispatch(savePlanToLocalStorage(value));
    }

    
    useEffect(function(){
        setValue(plan)
    },[plan])
    
    if(!isPlanOpen) return null
    
    return (
        <div className="flex flex-col justify-center items-center">
            {/* <p>{date ? date : "Danes"}</p> */}
            <textarea
                className="w-[300px] h-[300px] bg-stone-100 text-black p-1"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={handleSavingPlan}
                disabled={date ? true : false}
                
            />
        </div>
    );
}

export default Plan;