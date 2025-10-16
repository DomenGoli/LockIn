import { useDispatch } from "react-redux";
import Button from "./Button";
import { toggleOpenPlan } from "../features/diary/diarySlice";
import { HiChatBubbleBottomCenterText } from "react-icons/hi2";

function PlanButton({ text, dayId = "0", date }: { text: string; dayId?: string, date?:string }) {
    const dispatch = useDispatch();
    
    function handlePlan() {
        dispatch(toggleOpenPlan(text, dayId, date));
    }

    return (
        <div>
            <Button onClick={handlePlan}>
                {/* <span className="flex">Belezka */}
                {dayId === "0" ? "Danasnji Plan" : <HiChatBubbleBottomCenterText />}
                {/* {data ? <HiChatBubbleBottomCenterText /> : ""}</span> */}
            </Button>
        </div>
    );
}

export default PlanButton;