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

    var route = [];
    var x = lst.map((item) => {
        if(item.children !== undefined){
            var y = item.children.map((subitem)=>{
                route.push(subitem)
            })
        }
    })
    console.log(x);

    return(
        <>
            <ContextExternos.Provider value={{ userExterno: context.userExterno, userConfival: context.userConfival, twoFA: context.twoFA, tokenSave: context.tokenSave}}>
                <Menu 
                    onClick={({ key }) => { navigate(key) }}
                    defaultSelectedKeys={[window.location.pathname]}
                    items={lst}>
                </Menu>
                <Routes>
                    <Route path="/revision" element={<div>Revision</div>}></Route>
                    <Route path="/oportunidades" element={<div>Oportunidades</div>}></Route>
                    <Route path="/casos" element={<div>Casos</div>}></Route>
                    <Route path="/regimen" element={<div>Regimen</div>}></Route>
                    <Route path="/articulo" element={<div>Articulo</div>}></Route>
                    <Route path="/mediosControl" element={<div>Medios de control</div>}></Route>
                    <Route path="/actuacion" element={<div>Actuacion</div>}></Route>
                    <Route path="/verbo" element={<div>Verbo</div>}></Route>
                    <Route path="/topoCorporacion" element={<div>Tipo corporacion</div>}></Route>
                    <Route path="/corporacion" element={<div>Corporacion</div>}></Route>
                    <Route path="/tipoProvidencia" element={<div>Tipo de providencia</div>}></Route>
                    <Route path="/usuarios" element={<div>Usuarios</div>}></Route>
                    <Route path="/configuracion" element={<div>Configuracion</div>}></Route>
                </Routes>
            </ContextExternos.Provider>
        </>
    )
}

export default Sidermenu