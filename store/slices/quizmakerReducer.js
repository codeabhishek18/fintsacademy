const { createSlice } = require("@reduxjs/toolkit");

const slice = createSlice({
    name: 'quizmaker',
    initialState: 
    {
        list: [{id:1}]
    },
    reducers:
    {
        updateQuestion(state, action)
        {
            const {index, question, options, multipleAnswers, answers } = action.payload;
            state.list[index] = {id: index, question, options, multipleAnswers, answers};
        },

        addQuestion(state, action)
        {
            const {index} = action.payload;
            state.list.push({id: index})
        }
    }
})

export const {addQuestion, updateQuestion} = slice.actions
export default slice.reducer