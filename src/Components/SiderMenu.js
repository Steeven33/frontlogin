import React, { useState, useEffect, useContext } from "react";
import {Menu} from "antd"
import { Route, Routes, useNavigate } from "react-router-dom";
import {
    DatabaseOutlined,
    AreaChartOutlined,
    ToolOutlined,
    KeyOutlined,
} from "@ant-design/icons/lib/icons";
import ContextExternos from "../Context/ContextExternos";
import RouteDTO from "../DTO/RouteDTO";

export const Sidermenu = () => {

    const navigate = useNavigate()
    const [menu, setMenu] = useState([]);
    var url = "/api/menu?Pagina=1&RegistrosPorPagina=50";
    const context = useContext(ContextExternos);
    let token = sessionStorage.getItem('token');
    useEffect(()=>{
        fetch(url, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'bearer ' + token
            }
        }).then(res => res.json()).then(info => {
            setMenu(info)
        });
    }, []);
    console.log(menu)

    /// variale lst ordena el resultado de la API para pintar el menu en SiderMenu
    var lst = menu.map((item) =>{
        if(item.padreId === 0){
            var submenu = menu.map((subitem)=> {
                if(subitem.padreId === item.id){
                    return(
                        {label: subitem.nombre , key: "/" + subitem.nombre}
                    )
                }
            })
            submenu = submenu.filter(function(element){
                return element !== undefined;
            });
            if(submenu.length === 0){
                return(
                    {label: item.nombre, key: "/" + item.nombre}
                )
            }else{
                return(
                    {label: item.nombre, key: "/" + item.nombre, children: submenu}
                )
            }
        }
    })
    lst = lst.filter(function(element){
        return element !== undefined;
    });

    return(
        <>
            <ContextExternos.Provider value={{ userExterno: context.userExterno, userConfival: context.userConfival, twoFA: context.twoFA, tokenSave: context.tokenSave}}>
                <Menu 
                    onClick={({ key }) => { navigate(key) }}
                    defaultSelectedKeys={[window.location.pathname]}
                    items={lst}>
                </Menu>
                    {menu.map((item) => {
                        return <RouteDTO 
                        key={item.id}
                        nombre={item.nombre}
                        />
                    })}
            </ContextExternos.Provider>
        </>
    )
}

export default Sidermenu