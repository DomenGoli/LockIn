import Button from "../../../ui/Button";
// import { useAppDispatch } from "../../../hooks";
// import { deleteDay } from "../day_input/dayObjectSlice";
import { Form } from "react-router";
import NoteButton from "../../../ui/NoteButton";
import { HiOutlineTrash } from "react-icons/hi2";
import PlanButton from "../../../ui/PlanButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteDayApi } from "../../../service/apiDays";
import toast from "react-hot-toast";

type DayObjectType = {
    date: string;
    actsArray: [];
    id: string;
    note: string;
    plan: string;
    rating: string;
};

function DayHeader({ day }: { day: DayObjectType }) {
    // const dispatch = useAppDispatch();

    const queryClient = useQueryClient();
    const { mutate, isPending: deleting } = useMutation({
        mutationFn: deleteDayApi,
        onSuccess: () => {
            toast.success("Dan je bil uspesno zbrisan!");
            queryClient.invalidateQueries({
                queryKey: ["days"],
            });
        },
    });

    function handleDelete() {
        if (window.confirm("Izbriši dan?")) {
            mutate(day.id);
            // dispatch(deleteDay(day.id));
        }
    }

    return (
        <div className="flex">
            <div className="flex flex-row gap-3 p-1">
                <p>{day.date}</p>
                <label>{`Ocena dneva: ${
                    day.rating ? day.rating : "N/A"
                }`}</label>
                {/* {day.plan ? (
                    <PlanButton
                        text={day?.plan}
                        dayId={day.id}
                        date={day?.date}
                    />
                ) : null} */}
                <div className="grid grid-cols-2 gap-4">
                    {day.note || day.plan ? (
                        <NoteButton
                            data={day?.note}
                            planData={day.plan}
                            dayId={day.id}
                            date={day?.date}
                        />
                    ) : <div/>}

                    <Form onSubmit={handleDelete}>
                        <Button>
                            <HiOutlineTrash />
                        </Button>
                    </Form>
                </div>
                    {deleting && <p>Brišemo...</p>}
            </div>
        </div>
    );
}

export default DayHeader;
