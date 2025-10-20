import { useState } from "react";
import { useAppDispatch } from "../../../hooks";
import { addActivity, deleteActivity, updateActivity } from "./dayObjectSlice";
import Button from "../../../ui/Button";
import FormRow from "../../../ui/FormRow";

const input =
    "border-solid border-[1px] border-[var(--color-grey-300)] bg-[var(--color-grey-0)] p-[0.8rem_1.2rem] text-black";

type ActToUpdateType = {
    [id: string]: string;
}

function CreateUpdateActForm({
    actToUpdate = {},
    onCloseModal,
}: {
    actToUpdate?: ActToUpdateType;
    onCloseModal?: () => void;
}) {
    const isUpdateSession = Boolean(actToUpdate?.id);

    const dispatch = useAppDispatch();
    const [name, setName] = useState(setInitialState("name"));
    const [inputMode, setInputMode] = useState(
        setInitialState("inputMode", "input")
    );
    const [target, setTarget] = useState(setInitialState("target"));
    const [unit, setUnit] = useState(setInitialState("unit", "min"));
    // const navigate = useNavigate();
    const [overUnder, setOverUnder] = useState(
        setInitialState("overUnder", "over")
    );
    const id = crypto.randomUUID().slice(0, 8);

    function setInitialState(state: string, initial = "") {
        return isUpdateSession ? actToUpdate[state] : initial;
    }

    function handleBack() {
        // navigate("/");
        if(onCloseModal) onCloseModal();
        
    }

    function handleAddActivity() {
        if (!name || !inputMode) return;
        if (inputMode === "input" && !target) return;

        if (isUpdateSession) {
            dispatch(
                updateActivity({
                    name,
                    inputMode,
                    target,
                    unit,
                    overUnder,
                    id: actToUpdate.id,
                })
            );
            // onCloseModal();
        } else {
            dispatch(
                addActivity({
                    name,
                    inputMode,
                    target,
                    input: inputMode === "input" ? "0" : "Ne",
                    unit,
                    overUnder,
                    id,
                })
            );
            // navigate("/");
        }
        if(onCloseModal) onCloseModal();
    }

    function handleDeleteAct() {
        if (window.confirm("Izbriši aktivnost?")) {
            dispatch(deleteActivity(actToUpdate.id));
            if(onCloseModal) onCloseModal();
        }
    }

    return (
        <div className="flex flex-col gap-5">
            <div className="flex items-center justify-center">
                <label className="text-3xl">
                    {isUpdateSession ? "Uredi aktivnost" : "Dodaj aktivnost"}
                </label>
            </div>
            <div className="flex flex-col gap-[1.4rem]">
                <FormRow label="Ime aktivnosti">
                    <input
                        className="border-solid border-[1px] border-[var(--color-grey-300)] bg-[var(--color-grey-0)] p-[0.8rem_1.2rem] text-black"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </FormRow>

                <FormRow label="Vrsta">
                    <select
                        value={inputMode}
                        onChange={(e) => setInputMode(e.target.value)}
                        aria-placeholder="test"
                    >
                        {/* <option></option> */}
                        <option value={"input"}>Vnos</option>
                        <option value={"select"}>Ja/Ne</option>
                    </select>
                </FormRow>

                {inputMode === "input" && (
                    <>
                        <FormRow label="Cilj">
                            <input
                                type="number"
                                value={target}
                                onChange={(e) => setTarget(e.target.value)}
                                className={input}
                            />
                        </FormRow>

                        <FormRow label="Cilj: Vsaj / Največ">
                            <select
                                value={overUnder}
                                onChange={(e) => setOverUnder(e.target.value)}
                            >
                                <option value="over">Vsaj</option>
                                <option value="under">Največ</option>
                            </select>
                        </FormRow>

                        <FormRow label="Enota">
                            <input
                                value={unit}
                                onChange={(e) => setUnit(e.target.value)}
                                type="text"
                                className={input}
                            />
                        </FormRow>
                    </>
                )}
            </div>

            <div className="grid gap-4">
                <Button variation="form" onClick={handleAddActivity}>Shrani</Button>
                {isUpdateSession && (
                    <Button variation="form" onClick={handleDeleteAct}>Izbrisi aktivnost</Button>
                )}

                <Button variation="form" onClick={handleBack}>Zapri</Button>
            </div>
        </div>
        // <div className="">
        //     <div className="mx-3">
        //         <div className="flex gap-2">
        //             <label>Ime:</label>
        //             <input
        //                 className="bg-white w-39"
        //                 value={name}
        //                 onChange={(e) => setName(e.target.value)}
        //             />
        //         </div>
        //         <div className="flex gap-1.5">
        //             <label>Vrsta:</label>
        //             <select
        //                 value={inputMode}
        //                 onChange={(e) => setInputMode(e.target.value)}
        //                 aria-placeholder="test"
        //             >
        //                 {/* <option></option> */}
        //                 <option value={"input"}>Vnos</option>
        //                 <option value={"select"}>Ja/Ne</option>
        //             </select>

        //             {inputMode === "input" && (
        //                 <>
        //                     <label>Cilj: </label>
        //                     <input
        //                         type="number"
        //                         value={target}
        //                         onChange={(e) => setTarget(e.target.value)}
        //                         className="bg-white w-11"
        //                     ></input>
        //                 </>
        //             )}

        //             {inputMode === "input" && (
        //                 <>
        //                     <label>+/-</label>
        //                     <select
        //                         value={overUnder}
        //                         onChange={(e) => setOverUnder(e.target.value)}
        //                     >
        //                         <option value="over">Over</option>
        //                         <option value="under">Under</option>
        //                     </select>
        //                     <label>Enota</label>
        //                     <input
        //                         value={unit}
        //                         onChange={(e) => setUnit(e.target.value)}
        //                         type="text"
        //                         className="bg-white w-11"
        //                     ></input>
        //                 </>
        //             )}
        //         </div>
        //     </div>
        //     <div className="grid gap-0.5">
        //         <Button onClick={handleAddActivity}>Shrani</Button>
        //         <Button onClick={handleBack}>Zapri</Button>
        //     </div>
        // </div>
    );
}

export default CreateUpdateActForm;
