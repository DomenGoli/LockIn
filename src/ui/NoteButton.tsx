import { useDispatch } from "react-redux";
import Button from "./Button";
import { toggleOpenDiary } from "../features/diary/diarySlice";
import { HiChatBubbleBottomCenterText } from "react-icons/hi2";

function NoteButton({ data, dayId = "0", date }: { data: string; dayId?: string, date?:string }) {
    const dispatch = useDispatch();
    
    function handleNote() {
        dispatch(toggleOpenDiary(data, dayId, date));
    }

    return (
        <div>
            <Button onClick={handleNote}>
                {/* <span className="flex">Belezka */}
                {dayId === "0" ? "Belezka" : <HiChatBubbleBottomCenterText />}
                {/* {data ? <HiChatBubbleBottomCenterText /> : ""}</span> */}
            </Button>
        </div>
    );
}

export default NoteButton;
