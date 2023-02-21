import React from "react";
import {Menu} from "antd"
import { Route, Routes, useNavigate } from "react-router-dom";
import {
    DatabaseOutlined,
    AreaChartOutlined,
    ToolOutlined,
    KeyOutlined,
} from "@ant-design/icons/lib/icons";

const Sidebar = () => {
    return(
        <>
            <div>
                <Header />
                    <div style={{display: "flex", flexDirection: 'row'}}>
                        <SiderMenu />
                        <Content />
                    </div>
                <Footer />
            </div>
        </>
    )
    
}

function Header(){
    return(
        <>
            <div>Header</div>
        </>
    )
}

function Footer(){
    return(
        <>
            <div>Footer</div>
        </>
    )
}

function SiderMenu(){
    const navigate = useNavigate()
    return(
        <>
            <Menu 
            onClick={({ key }) => { navigate(key) }}
            items={[
                { label: "Documentos", key: "/documentos", icon: <DatabaseOutlined /> },
                { label: "Operaciones", key: "/operaciones", icon:<AreaChartOutlined />},
                { label: "Administracion", key: "/administracion", icon: <ToolOutlined />},
                { label: "Configuracion", key: "/configuracion", icon: <KeyOutlined />}    
                ]}>
            </Menu>
        </>
    )
}

function Content(){
    return(
        <Routes>
            <Route path="/documentos" element={<div>Documentos</div>}></Route>
            <Route path="/operaciones" element={<div>Operaciones</div>}></Route>
            <Route path="/administracion" element={<div>Administracion</div>}></Route>
            <Route path="/configuracion" element={<div>Configuracion</div>}></Route>
        </Routes>
    )
}

export default Sidebar