import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import { deleteDayApi } from "../../../service/apiDays";

///////////////////////// TYPES /////////////////////////////////////////////
type ActivityType = {
    name: string;
    inputMode: "input" | "select";
    target: string;
    input: string;
    unit: string;
    id: string;
    overUnder: string;
    width: number;
};

type InitialStateType = {
    date: string;
    actsArray: ActivityType[];
    note: string;
    plan: string;
};

type InputsType = {
    name: string;
    input: string;
    width: number;
};
////////////////////////////////////////////////////////////////////////////

//// Loada data iz local storage
function loadLocalStoredData() {
    const storedValue = localStorage.getItem("dayObject");
    return storedValue ? JSON.parse(storedValue) : {};
}

///////////////////////// Reducer //////////////////////////////////////////
const today = new Date();

const initialState: InitialStateType = {
    date: `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`,
    actsArray: loadLocalStoredData().actsArray || [],
    note: loadLocalStoredData().note || "",
    plan: loadLocalStoredData().plan || "",
};
const dayObjectSlice = createSlice({
    name: "dayObject",
    initialState,
    reducers: {
        addActivity(state, action) {
            state.actsArray.push(action.payload);
            localStorage.setItem("dayObject", JSON.stringify({ ...state }));
        },
        deleteActivity(state, action) {
            state.actsArray = state.actsArray.filter(
                (activity) => activity.id !== action.payload
            );
            localStorage.setItem("dayObject", JSON.stringify({ ...state }));
        },
        updateActivity(state, action) {
            state.actsArray.map(act => {
                if(act.id === action.payload.id) {
                    act.name = action.payload.name;
                    act.inputMode = action.payload.inputMode
                    act.target = action.payload.target
                    act.unit = action.payload.unit
                    act.overUnder = action.payload.overUnder
                }
            });
            localStorage.setItem("dayObject", JSON.stringify({ ...state }));
        },

        saveInputLocalStorage: {
            prepare(name, input, width) {
                return { payload: { name, input, width } };
            },
            reducer(state, action: PayloadAction<InputsType>) {
                state.actsArray.map((activity) => {
                    if (activity.name === action.payload.name) {
                        activity.input = action.payload.input;
                        activity.width = action.payload.width;
                    }
                });
                localStorage.setItem("dayObject", JSON.stringify({ ...state }));
            },
        },
        saveDay(state) {
            state.actsArray.map((act) => {
                act.input = act.inputMode === "input" ? "0" : "Ne";
                
            });
            state.note = ""
            localStorage.setItem("dayObject", JSON.stringify({ ...state }));
        },
        deleteDay(state) {
            return state;
        },
        saveNoteToLocalStorage(state, action){
            state.note = action.payload
            localStorage.setItem("dayObject", JSON.stringify({...state}))
        },
        savePlanToLocalStorage(state, action) {
            state.plan = action.payload
            localStorage.setItem("dayObject", JSON.stringify({...state}))
        }
    },
});

// export function saveDay(date: string, actsArray: ActivityType[], rating: number, note: string, plan: string) {
//     return async function (dispatch: (argo: object) => void) {
//         dispatch({ type: "dayObject/saveDay" });
        
//         const newDay = {
//             date,
//             actsArray,
//             rating,
//             note,
//             plan,
//         };
//         // createDayApi(newDay);

//     };
// }

// export function deleteDay(id: string) {
//     return async function () {
//         deleteDayApi(id);

//         // dispatch({type: "activities/deleteDay"})
//     };
// }

export default dayObjectSlice.reducer;
export const {saveDay, addActivity, deleteActivity, saveInputLocalStorage, updateActivity, saveNoteToLocalStorage, savePlanToLocalStorage } =
    dayObjectSlice.actions;

// const activitiesSlice = createSlice({
//     name: "activities",
//     initialState,
//     reducers: {
//         addActivity(state, action) {
//             state.actsArray.push(action.payload)
//             localStorage.setItem("activities", JSON.stringify([...state.activitiesArray]))
//         },
//         deleteActivity(state, action) {
//             state.activitiesArray = state.activitiesArray.filter((activity) => activity.name !== action.payload)
//             localStorage.setItem("activities", JSON.stringify([...state.activitiesArray]))
//         },
//         collectInputDay: {
//             prepare(name, input) {
//                 return { payload: { name, input } };
//             },
//             reducer(state, action: PayloadAction<InputsType>) {
//                 state.activitiesArray.map(activity => {
//                     if(activity.name === action.payload.name) {
//                         activity.input = action.payload.input
//                     }
//                 });
//                 localStorage.setItem("activities", JSON.stringify([...state.activitiesArray]))
//             }
//         },
//         sendDayInputs(state) {
//             state.activitiesArray.map(act => {act.input = act.inputMode === "input" ? "0" : "Ne"})
//             // localStorage.setItem("activities", JSON.stringify({...state, [...state.activitiesArray]}))
//         },
//         deleteDay(state) {
//             return state
//         }
//     }

// });
