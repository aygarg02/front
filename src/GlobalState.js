import { configureStore, createSlice } from '@reduxjs/toolkit';

// Load the authentication state from localStorage
const storedLoginData = localStorage.getItem('loginData');
const initialAuthState = storedLoginData
  ? JSON.parse(storedLoginData) // If data exists in localStorage, use it
  : {
      isLoggedIn: false,  // Default: user is not logged in
      patientId: null,    // Default: no patientId
      name: '',           // Default: no name
      email: '',          // Default: no email
  };

// Create a slice for the authentication state
const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState, // Initialize state from localStorage or defaults
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
        auth: authSlice.reducer, // Use the auth reducer from the slice
    },
});

// Export actions and store
export const { login, logout } = authSlice.actions;
export default store;
