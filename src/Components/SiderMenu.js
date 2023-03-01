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
    var url = "/api/menu";
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

    }, [])

    console.log(menu);

    return(
        <>
            <ContextExternos.Provider value={{ userExterno: context.userExterno, userConfival: context.userConfival, twoFA: context.twoFA, tokenSave: context.tokenSave}}>
                <Menu 
                    onClick={({ key }) => { navigate(key) }}
                    defaultSelectedKeys={[window.location.pathname]}
                    items={[
                        { label: "Documentos", key: "/documentos", icon: <DatabaseOutlined />, 
                        children: [
                            { label: "Revisión", key: "/revision"},
                        ]
                    },
                    { label: "Operaciones", key: "/operaciones", icon:<AreaChartOutlined />,
                    children:[
                        {label: "Oportunidades", key: "/oportunidades"},
                        {label: "Casos", key: "/casos"},
                    ]
                    },
                    { label: "Administracion", key: "/administracion", icon: <ToolOutlined />,
                    children: [
                        {label: "Regimen", key: "/regimen"},
                        {label: "Articulo", key: "/articulo"},
                        {label: "Medios de control", key: "/mediosControl"},
                        {label: "Actuacion", key: "/actuacion"},
                        {label: "Verbo", key: "/verbo"},
                        {label: "Tipo corporacion", key: "/topoCorporacion"},
                        {label: "Corporacion", key: "/corporacion"},
                        {label: "Tipo de providencia", key: "/tipoProvidencia"},
                        {label: "Usuarios", key: "/usuarios"},
                    ]
                    },
                    { label: "Configuracion", key: "/configuracion", icon: <KeyOutlined />}    
                    ]}>
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