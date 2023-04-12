import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "user",
    initialState: {
        user: {
            token: "",
            id: "",
            user: [],
        }
    },
    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload;
        },
        logoutUser: (state) => {
            state.user = {
                token: "",
                id: "",
                user: [],
            };
        },
    }
});

export const { loginUser,  logoutUser } = authSlice.actions;

export default authSlice.reducer;
