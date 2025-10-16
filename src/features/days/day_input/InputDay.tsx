import InputDayHeader from "./InputDayHeader";
import { useAppSelector } from "../../../hooks";
import TileList from "../TileList";

export default function InputDay() {
        const { actsArray } = useAppSelector((store) => store.dayObject);



    return (
        <div className="grid bg-[var(--day)]">
            <InputDayHeader />
            <TileList tileMode={"input"} actsArray={actsArray} />
        </div>
    );
}
