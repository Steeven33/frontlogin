import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Icons from "react-icons/fa";
import "./Navbar.css";
import { navItems } from "./navItems";
import DocumentosDropDown from "./DocumentosDropDown";

function Navbar(){
    const [dropdown, setDropdown] = useState(false);
    return(
    <>
    <nav className="navbar">
        <Link to="/" className="navbar-logo">
            Valuez BPM <Icons.FaCheckCircle />
        </Link>
        <ul className="nav-items">
            { navItems.map((item) => {
                if (item.title === "Documentos"){
                    return(
                    <li key={item.id} className={item.cName}
                    onMouseEnter = {() => setDropdown(true)}
                    onMouseLeave = {() => setDropdown(false)}>
                    <Link to={item.path}>{item.title}</Link>
                    {dropdown && <DocumentosDropDown />}
                    </li>
                    );
                }
                return(
                    <li key={item.id} className={item.cName}>
                        <Link to={item.path}>{item.title}</Link>
                    </li>
                )
            })}
        </ul>
    </nav>
    </>
    )
}

export default Navbar;