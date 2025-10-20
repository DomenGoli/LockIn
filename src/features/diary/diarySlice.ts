import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type initialStateType = {
    isNoteOpen: boolean;
    isPlanOpen: boolean;
    note: string;
    dayId: string;
    date: string;
    plan: string;
};

const initialState: initialStateType = {
    isNoteOpen: false,
    isPlanOpen: false,
    note: "",
    dayId: "",
    date: "",
    plan: ""
};

// type PrepareType = {
//     note: string;
//     dayId: string;
//     date: string;
// }

type DiaryItemType = {
    note: string;
    dayId: string;
    date?: string;
}

type NoteItemType = {
    dayId: string;
    date?: string;
    text: string
}

const diarySlice = createSlice({
    name: "diary",
    initialState,
    reducers: {
        toggleOpenDiary: {
            prepare(note: string, dayId: string, date?: string) {
                return { payload: { note, dayId, date } };
            },
            reducer(state, action: PayloadAction<DiaryItemType>) {
                state.note = action.payload.note;
                if (state.isNoteOpen === false) {
                    state.isNoteOpen = true;
                    state.dayId = action.payload.dayId;
                    state.note = action.payload.note;
                    if(action.payload.date) state.date = action.payload.date;
                } else if (state.dayId === action.payload.dayId) {
                    state.isNoteOpen = false;
                    state.dayId = "";
                    state.note = "";
                    state.date = "";
                } else {
                    state.note = action.payload.note;
                    state.dayId = action.payload.dayId;
                    if(action.payload.date) state.date = action.payload.date;
                }
            },
        },
        // toggleOpenDiary(state, action) {
        //     console.log(action.payload);
        //     state.data = action.payload
        //     state.isOpen = !state.isOpen
        // }
        toggleOpenPlan: {
            prepare(text: string, dayId: string, date?: string) {
                return { payload: { text, dayId, date } };
            },
            reducer(state, action: PayloadAction<NoteItemType>) {
                if(state.isPlanOpen === false) {
                    state.isPlanOpen = true
                    state.plan = action.payload.text
                }else{
                    state.isPlanOpen = false
                    state.plan = ""
                }
            }
        },
    },
});

export default diarySlice.reducer;
export const { toggleOpenDiary, toggleOpenPlan } = diarySlice.actions;
