import React from "react";
import { useSelector } from "react-redux"; // Import useSelector

import DR from './DR';
import Login from './Login';

function Show() {
    // Access the Redux state
    const { isLoggedIn, patientId, name, email } = useSelector((state) => state.auth);

    return (
        <>
            {isLoggedIn?(
                <DR/>


            ):(
                <Login/>
            )}
        </>
    );
}

export default Show;
