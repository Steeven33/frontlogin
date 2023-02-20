import React, { useState } from "react";
import { documentosDropDown } from "./navItems"
import { Link } from "react-router-dom";
// import "./DocumentosDropDown.css";

function DocumentosDropDown() {
    return(
        <>
            <ul className="documentos-submenu">
                {documentosDropDown.map((item) => {
                    return(
                        <li key={item.id}>
                            <Link to={item.path} className={item.cName}>
                            {item.title}
                            </Link>
                        </li>
                    );
                })}

            </ul>
        
        </>
    )
}

export default DocumentosDropDown;