import { useDispatch } from "react-redux";
import Button from "./Button";
import { toggleOpenDiary } from "../features/diary/diarySlice";
import { HiChatBubbleBottomCenterText } from "react-icons/hi2";
import { LuNotebookPen } from "react-icons/lu";

function NoteButton({ data, planData, dayId = "0", date }: { data: string; planData:string; dayId?: string, date?:string }) {
    const dispatch = useDispatch();
    
    function handleNote() {
        dispatch(toggleOpenDiary(data, planData, dayId, date));
    }

    return (
        <div>
            <Button onClick={handleNote}>
                {/* <span className="flex">Belezka */}
                {dayId === "0" ? "Belezka" : <LuNotebookPen />}
                {/* {data ? <HiChatBubbleBottomCenterText /> : ""}</span> */}
            </Button>
        </div>
    );
}

export default NoteButton;
