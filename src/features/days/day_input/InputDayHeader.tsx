import { Form } from "react-router";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import Button from "../../../ui/Button";
// import { sendDayInputs } from "./daySlice";
import { saveDay } from "./dayObjectSlice";
import toast from "react-hot-toast";
import { useState } from "react";
import AddAct from "./AddAct";
import StarRating from "./StarRating";
// import Note from "../../diary/Note";
// import NoteCC from "../../diary/NoteCC";
// import { toggleOpenDiary } from "../../diary/diarySlice";
import NoteButton from "../../../ui/NoteButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDayApi } from "../../../service/apiDays";

const today = new Date();

function InputDayHeader() {
    // const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { actsArray, note, plan } = useAppSelector(
        (store) => store.dayObject
    );
    const [date, setDate] = useState(
        `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`
    );
    const [rating, setRating] = useState(0);

    const queryClient = useQueryClient();
    const { mutate, isPending: uploading } = useMutation({
        mutationFn: createDayApi,
        onSuccess: () => {
            toast.success("Dan je bil uspesno shranjen!");
            queryClient.invalidateQueries({
                queryKey: ["days"],
            });
        },
        onError: (err) => toast.error(err.message)
    });

    function handleSavingDay(e:React.FormEvent) {
        e.preventDefault();
        if (!rating) {
            toast.error("Oceni svoj dan!")
            return;
        }
        mutate({date, actsArray, rating, note, plan})
        // dispatch(saveDay(date, actsArray, rating, note, plan));
        dispatch(saveDay());
    }

    // function handleOpenAddActivity() {
    //     navigate("/add-activity");

    // }

    return (
        <div className="flex gap-3 p-1">
            <input
                className="w-[5rem]"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            ></input>
            <AddAct />
            <NoteButton planData={plan} data={note} />
            {/* <Form action="/" method="post"> */}
            <Form onSubmit={(e) => handleSavingDay(e)}>
                <Button>{uploading ? "Uploading" : "Shrani dan"}</Button>
            </Form>
            <label>Oceni svoj dan:</label>
            <StarRating
                maxRating={10}
                size={24}
                color="#d9d9d9"
                onSetRating={setRating}
            />
        </div>
    );
}

export default InputDayHeader;
