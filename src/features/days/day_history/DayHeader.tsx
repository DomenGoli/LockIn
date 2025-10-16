import Button from "../../../ui/Button";
import { useAppDispatch } from "../../../hooks";
import { deleteDay } from "../day_input/dayObjectSlice";
import { Form } from "react-router";
import NoteButton from "../../../ui/NoteButton";
import { HiOutlineTrash } from "react-icons/hi2";
import PlanButton from "../../../ui/PlanButton";

type DayObjectType = {
    date: string;
    actsArray: [];
    id: string;
    note: string;
    plan: string;
    rating: string
};

function DayHeader({ day }: { day: DayObjectType }) {
    const dispatch = useAppDispatch();

    function handleDelete() {
        if (window.confirm("Izbriši dan?")) {
            dispatch(deleteDay(day.id));
        }
    }

    return (
        <div className="flex justify-between">
            <div className="flex flex-row gap-3 p-1">
                <p>{day.date}</p>
                <label>{`Ocena dneva: ${
                    day.rating ? day.rating : "N/A"
                }`}</label>
                {/* <NoteButton data={day?.note} dayId={day.id} date={day?.date} /> */}
            {day.note ? <NoteButton data={day?.note} dayId={day.id} date={day?.date}/> : null}
            {day.plan ? <PlanButton text={day?.plan} dayId={day.id} date={day?.date}/> : null}
            </div>
            <Form action="/" method="delete">
                <Button onClick={handleDelete}>
                    <HiOutlineTrash />
                </Button>
            </Form>
        </div>
    );
}

export default DayHeader;
