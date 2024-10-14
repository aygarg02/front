import React from "react";
import { useSelector } from "react-redux"; // Import useSelector

import Parent from './Parent';
import Login from '../Diag/Login';

function Show() {
    // Access the Redux state
    const { isLoggedIn, patientId, name, email } = useSelector((state) => state.auth);

    return (
        <>
            {isLoggedIn?(
                <Parent/>


            ):(
                <Login/>
            )}
        </>
    );
}

export default Show;
