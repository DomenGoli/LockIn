// import { useLoaderData } from "react-router";
import Day from "./Day";
import { getDaysApi } from "../../../service/apiDays";
import { useEffect, useRef } from "react";
import DayHeader from "./DayHeader";
import TileList from "../TileList";
import { useAppSelector } from "../../../hooks";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../../../ui/Spinner";

// type DayActivities = {
//     name: string;
//     inputMode: string;
//     target: string;
//     input: string
// };

type LoadedDataType = {
    date: string;
    actsArray: [];
    id: string;
    note: string;
    plan: string;
    rating: string;
};

function DaysList() {
    const {
        isLoading,
        data: days,
        error,
    } = useQuery({
        queryKey: ["days"],
        queryFn: getDaysApi,
    });

    // const days = useLoaderData<LoadedDataType[]>(); // RR loader verzija, obsolete -> zbrisi
    const daysEndRef = useRef<HTMLDivElement>(null);
    function scrollToBottom() {
        if (!daysEndRef.current) return;
        daysEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    useEffect(scrollToBottom, [days]);

    // za filtriranje prikazovanja actov, sinhronizirano z inputDay
    const { actsArray } = useAppSelector((store) => store.dayObject);
    let existingActsIds: string[];
    if (actsArray) {
        existingActsIds = actsArray.map((act) => act.id);
    }


    if (isLoading)
        return (
            <div className="flex flex-col items-center justify-center">
                <Spinner />
                <p>Demo server je hostan v Oregon, USA</p>
                <p>Spin up = 50s</p>
            </div>
        );
    
    if(error) return (<p>{error.message}</p>)

    if (!days.length)
        return (
            <div className="flex items-center justify-center">
                Lista dni je prazna!
            </div>
        );

    return (
        <div className="flex flex-col overflow-scroll no-scrollbar bg-[var(--day)]">
            {days.map((day:LoadedDataType, i:number) => (
                // <Day day={day} key={i} previousDay={days[i-1]}/>
                <Day key={i}>
                    <DayHeader day={day} />
                    <TileList
                        // actsArray={day.actsArray}
                        actsArray={day.actsArray.filter((act: LoadedDataType) =>
                            existingActsIds.includes(act.id)
                        )}
                        tileMode="display"
                    />
                </Day>
            ))}
            <div ref={daysEndRef} />
        </div>
    );
}

export default DaysList;

// eslint-disable-next-line
export async function loader() {
    const days = await getDaysApi();
    return days;
}
