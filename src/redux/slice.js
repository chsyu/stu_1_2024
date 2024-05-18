import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    general: {
        name: "",
        email: "",
        pw: "",
        checkpw: ""
    },
    login: {
        hasLogin: false,
    },
    colorMode: "light",
    showActionSheet: false
};

const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setAccountInfo: (state, action) => {
            state.general = action.payload;
        },
        login: (state) => {
            state.login.hasLogin = true;
        },
        logout: (state) => {
            state.login.hasLogin = false;
        },
        toggleColorMode: (state) => {
            state.colorMode = state.colorMode === "light" ? "dark" : "light";
        },
        toggleActionSheet: (state) => {
            state.showActionSheet = state.showActionSheet === true ? false : true;
        },
    },
});

export const selectGeneral = (state) => state.account.general;
export const selectHasLogin = (state) => state.account.login.hasLogin;
export const selectColorMode = (state) => state.account.colorMode;
export const selectShowActionSheet = (state) => state.account.showActionSheet;

export const { setAccountInfo, login, logout, toggleColorMode, toggleActionSheet } = accountSlice.actions;

export default accountSlice.reducer;