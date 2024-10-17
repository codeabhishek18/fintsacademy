const { createSlice } = require("@reduxjs/toolkit");

const slice = createSlice({
    name: 'logger',
    initialState: 
    {
        isLogged: {}
    },
    reducers:
    {
        updateStatus(state, action)
        {
            const {status} = action.payload
            state.isLogged = status;
        }
    }
})

export const {updateStatus} = slice.actions
export default slice.reducer