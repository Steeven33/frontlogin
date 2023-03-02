import React from "react";
import { Route, Routes } from "react-router-dom";

export const RouteDTO = (props) =>{
    return(
        <>
            <Routes>
                <Route path={"/" + props.nombre.toString().trim()} element={<div>{props.nombre}</div>}></Route>
            </Routes>
        </>
    )
}

export default RouteDTO