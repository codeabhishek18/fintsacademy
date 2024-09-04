const { createSlice } = require("@reduxjs/toolkit");

const slice = createSlice({
    name: 'quiz',
    initialState: 
    {
        list: []
    },
    reducers:
    {
        addAnswers(state, action)
        {
            const {selected, answer} = action.payload
            state.list.push({selected, answer})
        },

        updateAnswer(state, action)
        {
            const {index, selected, answer} = action.payload
            state.list[index] = {selected, answer};
        }
    }
})

export const { addAnswers, updateAnswer } = slice.actions;
export default slice.reducer;