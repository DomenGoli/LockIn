import { configureStore } from "@reduxjs/toolkit";
import dayObjectReducer from "./features/days/day_input/dayObjectSlice";
import diaryReducer from "./features/diary/diarySlice"
// import dayReducer from './features/days/day_input/daySlice'

const store = configureStore({
    reducer: {
        dayObject: dayObjectReducer,
        diary: diaryReducer 
    },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
