import React, { useState } from "react";
import { documentosDropDown } from "./navItems"
import { Link } from "react-router-dom";
import "./DocumentosDropDown.css";

function DocumentosDropDown() {
    const[dropdown, setDropdown ] = useState(false);
    return(
        <>
            <ul className={dropdown ? "documentos-submenu clicked" : "documentos-submenu"} onClick={() => setDropdown(!dropdown)}>
                {documentosDropDown.map((item) => {
                    return(
                        <li key={item.id}>
                            <Link to={item.path} className={item.cName}
                            onClick={() => setDropdown(false)}>
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