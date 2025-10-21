
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect, useState } from "react";
import { saveNoteToLocalStorage } from "../days/day_input/dayObjectSlice";

function Note() {
    const {note, date, dayId} = useAppSelector(store => store.diary)
    const [value, setValue] = useState(() => note)
    const {isNoteOpen} = useAppSelector(store => store.diary)
    

    //Resitev za stale state
    useEffect(function() {
        setValue(note)
    }, [note])


    const dispatch = useAppDispatch();


    function handleSavingNote() {
        dispatch(saveNoteToLocalStorage(value));
    }

    if(!isNoteOpen) return null

    return (
        <div className="flex flex-col justify-center items-center pb-4">
            <p>Belezka: {dayId === "0" ? "Danes" : date}</p>
            <textarea
                className="w-[300px] h-[300px] bg-stone-100 text-black p-1"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={handleSavingNote}
                disabled={dayId === "0" ? false : true}
                defaultValue="Splaniraj dan!"
            />
        </div>
    );
}

export default Note;

