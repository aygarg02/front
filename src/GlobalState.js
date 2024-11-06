import { configureStore, createSlice } from '@reduxjs/toolkit';

// Define the link as a constant
const defaultLink = 'https://zgsn772h-8080.inc1.devtunnels.ms';

// Load the authentication state from localStorage
const storedLoginData = localStorage.getItem('loginData');
const initialAuthState = storedLoginData
  ? JSON.parse(storedLoginData)
  : {
      isLoggedIn: false,
      patientId: null,
      name: '',
      email: '',
      link: defaultLink, // Add link to the initial state
  };

// Create a slice for the authentication state
const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.patientId = action.payload.patientId;
            state.name = action.payload.name;
            state.email = action.payload.email;

            // Save login data to localStorage
            localStorage.setItem('loginData', JSON.stringify({
                isLoggedIn: true,
                patientId: action.payload.patientId,
                name: action.payload.name,
                email: action.payload.email,
                link: defaultLink,
            }));
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.patientId = null;
            state.name = '';
            state.email = '';

            // Remove login data from localStorage
            localStorage.removeItem('loginData');
        },
    },
});

// Create the Redux store
const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
    },
});

// Export actions, store, and the link selector
export const { login, logout } = authSlice.actions;
export const selectLink = (state) => state.auth.link;
export default store;
