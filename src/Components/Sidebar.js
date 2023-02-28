import React, { useContext, useState, useEffect } from "react";
import {Menu} from "antd"
import { Route, Routes, useNavigate } from "react-router-dom";
import {
    DatabaseOutlined,
    AreaChartOutlined,
    ToolOutlined,
    KeyOutlined,
    UserOutlined,
} from "@ant-design/icons/lib/icons";
import ContextExternos from "../Context/ContextExternos";
import {Row, Col} from "antd"
import { SignOutButton } from "./SignOutButton";
import { Button } from 'antd';
import context from "react-bootstrap/esm/AccordionContext";
import Header from "./Header";


const Sidebar = () => {
    const context = useContext(ContextExternos);
    console.log(context);


    return(
        <>
            <ContextExternos.Provider value={{ userExterno: context.userExterno, userConfival: context.userConfival, twoFA: context.twoFA, tokenSave: context.tokenSave}}>
                <div style={{ display: "flex", flexDirection: 'column', flex: 1, height: '100vh' }}>
                    <div >
                        <Header />
                    </div>
                    <div style={{ backgroundColor: '#FDFEFE', display: "flex", flexDirection: 'row', flex: 1}}>
                        <SiderMenu />
                        <Content />
                    </div>
                    <div >
                        <Footer />
                    </div>
                </div>
            </ContextExternos.Provider>
        </>
    )
}

// function Header(){
//     const context = useContext(ContextExternos)
//     console.log(context);
//     var usuarioLogin = "";
//     if(context.userConfival === ""){
//         var stage = context.userExterno.toString();
//         usuarioLogin = stage.replace('2FA', '');
//     }else{
//         usuarioLogin = context.userConfival
//     }

//     function SignOut(){
//         sessionStorage.clear();
//         window.location.reload();
//     }
    
//     return(
//         <>
//             <Row style={{textAlign: 'center', height: 60, backgroundColor: '#17202A', color: '#FDFEFE'}}>
//                 <Col style={{alignItems: 'center', display: "flex", justifyContent: 'center'}}  span={7} >
//                     <p>logo</p>
//                 </Col>
//                 <Col style={{alignItems: 'center', display: "flex", justifyContent: 'center'}} span={9}>
//                     <h6><UserOutlined /></h6> <h4>Bienvenido, {usuarioLogin} </h4> 
//                 </Col>
//                 <Col style={{alignItems: 'center', display: "flex", justifyContent: 'end'}} span={7}>
//                     {context.userConfival === "" ? <Button type="primary" style={{ background: '#E74C3C', borderColor: '#7B241C' }} onClick={SignOut}>Sign Out</Button> : <SignOutButton />}
//                 </Col>
//             </Row>
//         </>
//     )
// }

function Footer(){
    return(
        <>
            <div style={{
                height: 60,
                backgroundColor: '#515A5A',
                color: '#17202A'
            }}>
                <Row>
                    <h5>Valuez BPM</h5>
                </Row>
                <Row>
                    <p>Gestion de proceso de negocio</p>
                </Row>
            </div>
        </>
    )
}

function SiderMenu(){
    const navigate = useNavigate()
    const [menu, setMenu] = useState([]);
    var url = "/api/menu";

    useEffect(() => {
        fetch(url, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'Authorization': 'bearer ' + context.tokenSave
            }
        }).then(res => res.json()).then(info => {
            setMenu(info)
            console.log(info);
        });
    }, []);
    // console.log(menu);

    return(
        <>
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
        </>
    )
}

function Content(){
    return(
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
    )
}

export default Sidebar