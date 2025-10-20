import Tile from "./Tile";
// import { Outlet } from "react-router";
import React from "react";

// type ActivitiesObjectType = {
//     name: string;
//     input: string;
//     target: string;
// };
type DayObjectType = {
    name: string;
    input: string;
    inputMode: string;
    target: string;
    unit: string;
    overUnder: string;
    id: string;
    width: number;
};

function TileList({
    tileMode,
    actsArray = [],
}: // previousDay
{
    tileMode: "input" | "display";
    actsArray: Array<DayObjectType>;
    // previousDay: object
}): React.JSX.Element {
    // state za Inputs

    // Ni aktivnosti

    if (tileMode === "input" && actsArray.length === 0)
        return (
            <div className="flex gap-4">
                <p>Zacni z dodajanjem aktivnosti.</p>
                {/* <Outlet /> */}
            </div>
        );

    return (
        <div className="flex gap-5">
            <div className="flex gap-0.5 h-14">
                {actsArray.map((act) => (
                    <Tile tileMode={tileMode} act={act} key={act.id} />
                ))}
                {/* {tileMode === "input" && <Outlet />} */}
            </div>
        </div>
    );
}

export default TileList;
