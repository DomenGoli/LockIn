import Note from "../features/diary/Note";
import Plan from "../features/diary/Plan";
import StopWatch from "../features/timers/StopWatch";
import { useAppSelector } from "../hooks";
import PlanButton from "./PlanButton";

function Sidebar() {
    const { plan } = useAppSelector((store) => store.dayObject);

    return (
        <div className="grid h-full grid-rows-[11rem_1fr_auto]">
            <div>
                <StopWatch mode="timer" />
            </div>
            <div>
                <div className="pl-[1rem]">

                {/* <PlanButton text={plan} /> */}
                </div>
                <Plan />
            </div>
            <div>
                <Note />
            </div>
        </div>
    );
}

export default Sidebar;
