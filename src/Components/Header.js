import React, { useContext} from "react";
import {
    UserOutlined,
} from "@ant-design/icons/lib/icons";
import ContextExternos from "../Context/ContextExternos";
import {Row, Col} from "antd"
import { SignOutButton } from "./SignOutButton";
import { Button } from 'antd';

const Header = () => {
    const context = useContext(ContextExternos)
    var usuarioLogin = "";
    if(context.userConfival === ""){
        var stage = context.userExterno.toString();
        usuarioLogin = stage.replace('2FA', '');
    }else{
        usuarioLogin = context.userConfival
    }
    
    function SignOut(){
        sessionStorage.clear();
        window.location.reload();
    }
    
    return(
        <>
            <Row style={{textAlign: 'center', height: 60, backgroundColor: '#17202A', color: '#FDFEFE'}}>
                <Col style={{alignItems: 'center', display: "flex", justifyContent: 'center'}}  span={7} >
                    <p>logo</p>
                </Col>
                <Col style={{alignItems: 'center', display: "flex", justifyContent: 'center'}} span={9}>
                    <h6><UserOutlined /></h6> <h4>Bienvenido, {usuarioLogin} </h4> 
                </Col>
                <Col style={{alignItems: 'center', display: "flex", justifyContent: 'end'}} span={7}>
                    {context.userConfival === "" ? <Button type="primary" style={{ background: '#E74C3C', borderColor: '#7B241C' }} onClick={SignOut}>Sign Out</Button> : <SignOutButton />}
                </Col>
            </Row>
        </>
    )
}

export default Header