import React from "react";
import { useSelector } from "react-redux"; // Import useSelector

import Login from '../Diag/Login';

import Entry from "./Entry";

function Show() {
    // Access the Redux state
    const { isLoggedIn, patientId, name, email } = useSelector((state) => state.auth);

    return (
        <>
            {isLoggedIn?(
           
                

                <Entry/>
            ):(
                <Login/>
            )}
        </>
    );
}

export default Show;
