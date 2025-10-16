import { useEffect, useRef, useState } from "react";
import {
    saveInputLocalStorage
    
} from "./day_input/dayObjectSlice";
import { useAppDispatch } from "../../hooks";
// import icons from "../../ui/icons";
import UpdateAct from "./day_input/UpdateAct";

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

type TilePropsType = {
    tileMode: string;
    act: DayObjectType;
};

export default function Tile({
    tileMode,
    act,
}: // previousDay
TilePropsType) {
    const dispatch = useAppDispatch();
    // const { actsArray } = useAppSelector((store) => store.dayObject);
    const [input, setInput] = useState(() => act.input);
    const [width, setWidth] = useState(0);

    const ref = useRef<any | null>(null);
    // const tileWidth = actsArray.find((cur) => cur.name === act.name)?.width;
    // const [tileWidth, setTileWidth] = useState(60)
    // console.log(tileWidth);

    // useEffect(function() {
    //     // setTileWidth(actsArray.find((cur) => cur.name === act.name)?.width)
    //     setTileWidth(act.width)
    // }, [act.width])

    useEffect(function () {
        setWidth(ref.current ? ref.current.offsetWidth : 0);
    }, []);

    // const days =useLoaderData()
    // const referenceActivity = previousDay.activities.find(act => act.name === name)

    // function defaultInputValue() {
    //     return actsArray.find((act) => act.name === name)?.input;

    //     // if (mode === "input")
    //     //     return activities.find((info) => info.name === name)?.input
    //     //         ? activities.find((info) => info.name === name)?.input
    //     //         : "0";
    //     // if (mode === "select")
    //     //     return activities.find((info) => info.name === name)?.input
    //     //         ? activities.find((info) => info.name === name)?.input
    //     //         : "Ne";
    // }

    // function previousDayValue() {
    //     // find day by ID v loaderju
    //     // find aktivnost v Day by name

    //     // drug nacin
    //     previousDay.activities.find
    // }
    // useEffect(
    //     function () {
    //         setInput(input);
    //     },
    //     [act, input]
    // );

    //// Za stale state ob savingDay()
    useEffect(
        function () {
            setInput(act.input);
        },
        [act]
    );

    function handleSavingInput(): void {
        dispatch(saveInputLocalStorage(act.name, input, width));
    }

    function handleSavingSelect(e: string): void {
        setInput(e);
        dispatch(saveInputLocalStorage(act.name, e, width));
    }

    // /// Barve
    function tileColor() {
        switch (act.inputMode) {
            case "select":
                return input === "Da" ? "bg-[var(--green)]" : "bg-[var(--red)]";
            case "input":
                if (input === "0" || !input) return "bg-[var(--red)]";
                if (act.overUnder === "over")
                    return Number(input) >= Number(act.target)
                        ? "bg-[var(--green)]"
                        : "bg-[var(--red)]";
                else
                    return Number(input) < Number(act.target)
                        ? "bg-[var(--green)]"
                        : "bg-[var(--red)]";
        }
    }

    function getMinWidth() {
        if (tileMode === "display") {
            return `min-w-24`;
        } else return "min-w-22";
    }

    return (
        <div
            ref={ref}
            className={`grid ${getMinWidth()} px-1 text-black ${tileColor()}`}
        >
            <div className="flex items-center justify-between">
                {tileMode === "display" && (
                    <p className="text-center">{act.name}</p>
                )}

                {tileMode !== "display" && (
                    <UpdateAct actToUpdate={act} />
                    // <button
                    //     className="cursor-pointer"
                    //     onClick={handleDeleteActivity}
                    // >
                    //     {icons.settings}
                    // </button>
                )}
            </div>

            <div className="flex gap-1">
                {/* ////////////////  Presentational */}
                {tileMode === "display" && <span>{act.input}</span>}

                {/* ////////////////  Statefull za Input day */}
                {tileMode === "input" && act.inputMode === "input" && (
                    <span>
                        <input
                            type="number"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onBlur={handleSavingInput}
                            className="pl-0.5 bg-[var(--ozadje)] w-15 hover:border-[var(--ER-text)] border-black border-1 text-[var(--ER-text)]"
                        />

                        {/* {enota} */}
                    </span>
                )}

                {tileMode === "input" && act.inputMode === "select" && (
                    <select
                        value={input}
                        onChange={(e) => handleSavingSelect(e.target.value)}
                    >
                        {/* <option></option> */}
                        <option value="Da">Da</option>
                        <option value="Ne">Ne</option>
                    </select>
                )}

                {act.inputMode === "input" && <p>{act.unit}</p>}
            </div>
        </div>
    );
}
