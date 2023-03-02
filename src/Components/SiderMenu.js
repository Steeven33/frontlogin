// imports
import React, { useState, useEffect, useContext } from "react";
import {Menu} from "antd"
import { Route, Routes, useNavigate } from "react-router-dom";
import ContextExternos from "../Context/ContextExternos";
import RouteDTO from "../DTO/RouteDTO";

// imports del menu
import Revision from "../ComponentsAPI.js/Revision"
import Oportunidades from "../ComponentsAPI.js/Oportunidades";
import Casos from "../ComponentsAPI.js/Casos";
import Articulo from "../ComponentsAPI.js/Articulo";
import MediosControl from "../ComponentsAPI.js/MediosControl";
import Actuacion from "../ComponentsAPI.js/Actuacion";
import Verbo from "../ComponentsAPI.js/Verbo";
import TipoCorporacion from "../ComponentsAPI.js/TipoCorporacion";
import Corporacion from "../ComponentsAPI.js/Corporacion";
import TipoProvidencia from "../ComponentsAPI.js/TipoProvidencia";
import Usuarios from "../ComponentsAPI.js/Usuarios";
import Regimen from "../ComponentsAPI.js/Regimen";
import Configuracion from "../ComponentsAPI.js/Configuracion";

export const Sidermenu = () => {

    // API -- /api/menu
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
                    {/* {menu.map((item) => {
                        return <RouteDTO 
                        key={item.id}
                        nombre={item.nombre}
                        />
                    })} */}
                <Routes>
                    <Route path={"/Revision"} element={<Revision />}></Route>
                    <Route path={"/Oportunidades"} element={<Oportunidades />}></Route>
                    <Route path={"/Casos"} element={<Casos />}></Route>
                    <Route path={"/Articulo"} element={<Articulo />}></Route>
                    <Route path={"/Medios de Control"} element={<MediosControl />}></Route>
                    <Route path={"/Actuacion"} element={<Actuacion />}></Route>
                    <Route path={"/Verbo"} element={<Verbo />}></Route>
                    <Route path={"/Tipo Corporacion"} element={<TipoCorporacion />}></Route>
                    <Route path={"/Corporacion"} element={<Corporacion />}></Route>
                    <Route path={"/Tipo de providencia"} element={<TipoProvidencia />}></Route>
                    <Route path={"/Usuarios"} element={<Usuarios />}></Route>
                    <Route path={"/Regimen"} element={<Regimen />}></Route>
                    <Route path={"/Configuracion"} element={<Configuracion />}></Route>
                </Routes>
            </ContextExternos.Provider>
        </>
    )
}

export default Sidermenu