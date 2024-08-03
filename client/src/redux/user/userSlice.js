import { createSlice } from "@reduxjs/toolkit";

//create initial state(global) for us ,,,  like loading false, error false
const initialState = {
    currentUser: null,
    error: null,
    loading: false
};

//using the initial state
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {  //action is the data when we get from the database
            state.currentUser = action.payload;  //this is the data we get
            state.loading = false;
            state.error = null; //may be we get error from previous attempt , so here error is null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

//export these
export const { signInStart, signInSuccess, signInFailure } = userSlice.actions;
export default userSlice.reducer;