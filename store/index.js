import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./slices/quizReducer";
import quizmakerReducer from "./slices/quizmakerReducer";
import courseReducer from "./slices/courseReducer";

export const store = configureStore({
    reducer:
    {
        course: courseReducer,
        quizList: quizReducer,
        quizmaker: quizmakerReducer
    }
})