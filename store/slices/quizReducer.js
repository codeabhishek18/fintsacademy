const { createSlice } = require("@reduxjs/toolkit");

const slice = createSlice({
    name: 'quiz',
    initialState: 
    {
        list: []
    },
    reducers:
    {
        addAnswer(state, action)
        {
            const {index, answer} = action.payload
            if(state.list.length === index)
                state.list.push([answer])   
            else
                state.list[index] = [answer]
        },

        addMultipleAnswer(state, action)
        {

            const {index, answer} = action.payload;

            if(state.list.length === index)
            {
                state.list.push([answer])
            }
            else
            {
                if(state.list[index].includes(answer))
                {
                    const updateAnswers =  state.list[index].filter((ans)=> ans !== answer)
                    state.list[index] = updateAnswers;
                }
                else
                    state.list[index].push(answer)
            }
            
        },
    }
})

export const { addAnswer, addMultipleAnswer } = slice.actions;
export default slice.reducer;