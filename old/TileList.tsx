import { useAppSelector } from "../../hooks";
import Tile from "./Tile";
import { Outlet } from "react-router";
import React from "react";

type ActivitiesObjectType = {
    name: string;
    input: string;
    target: string
};

function TileList({
    isApiData,
    dayActivities = [],
    // previousDay
}: {
    isApiData: boolean;
    dayActivities?: ActivitiesObjectType[];
    // previousDay: object
}): React.JSX.Element {
    // state za Inputs
    const { activitiesArray } = useAppSelector((store) => store.dayObject);


    
    // Presentational za zgodovino, DayList
    if (isApiData)
        return (
            <div className="flex gap-0.5 h-14">
                {dayActivities.map((activity, i) => (
                    <Tile
                        name={activity.name}
                        mode="display"
                        data={activity.input}
                        key={i}
                        target={activity.target}
                        activity={activity}
                        // previousDay={previousDay}
                    />
                ))}
            </div>
        );

    // Ni aktivnosti
    if (activitiesArray.length === 0)
        return (
            <div className="flex gap-4">
                <p>Zacni z dodajanjem aktivnosti.</p>
                <Outlet />
            </div>
        );

    // TileList za InputDay
    return (
        <div className="flex gap-0.5 h-14">
            {activitiesArray.map((activity, i) => (
                <Tile
                    name={activity.name}
                    mode={activity.inputMode}
                    key={i}
                    target={activity.target}
                />
            ))}
            <Outlet />
        </div>
    );
}

export default TileList;
