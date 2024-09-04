import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'user',
    initialState:
    {
        selectedCourse: []
    },
    reducers:
    {
        setCourseDeatils(state, action)
        {
            const {course} = action.payload;
            state.selectedCourse = course;
        }
    }
})

export const { setCourseDeatils } = slice.actions;
export default slice.reducer;