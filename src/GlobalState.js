import { configureStore, createSlice } from '@reduxjs/toolkit';

// Create a slice for the authentication state
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false, // Boolean to indicate if the user is logged in
        patientId: null,   // ID of the patient (can be null if not set)
        name: '',          // Patient's name (initially an empty string)
        email: '',         // Patient's email (initially an empty string)
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.patientId = action.payload.patientId;
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.patientId = null;
            state.name = '';
            state.email = '';
        },
    },
});

// Create the Redux store
const store = configureStore({
    reducer: {
        auth: authSlice.reducer, // Use the auth reducer from the slice
    },
});

// Export actions and store
export const { login, logout } = authSlice.actions;
export default store;
