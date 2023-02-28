import { SignInButton } from "./SignInButton"
import React, { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import ContextExternos from './Context/ContextExternos';
import Inicio from "./Components/Inicio";
import { Card, Space, Row, Button, Image } from "antd";
import Sidebar from "./Components/Sidebar";
import { BsPersonCircle, BsFillShieldLockFill } from "react-icons/bs";




export const Register = ()=>{

    // variables
    var usuario = "";
    var contrasenia = "";
    var id = "1fd17bc3-8370-4875-9e6b-7c7cf98e52b1";

    const [data, setData] = useState("");
    const { instance } = useMsal();
    const [userconfival, setUserconfival] = useState('');
    const [userexterno, setUserexterno] = useState('');
    const [valid2FA, setValid2FA] = useState(false);

    // mantiene el context de microsoft con login y de lo contrario mantiene el context ContextExternos
    useEffect(() => {
        const currentAccount = instance.getActiveAccount();
        let currentAccountE = sessionStorage.getItem('username')
        if(currentAccount){
            var nombreUsuario = currentAccount.username;
            setUserconfival(nombreUsuario);
        }else{
            var mantener = "ppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp";
            if(currentAccountE !== null ){
                if(currentAccountE.includes("2FA")){
                    setUserexterno(currentAccountE)
                    setValid2FA(true)

                }else{
                    setData(mantener)
                    setUserexterno(currentAccountE)
                }
            }
        }
    }, [instance]);

    console.log(valid2FA);
    
    // permiste iniciar sesion de externos
    function login(){
        setUserexterno(usuario);
        var url = "/api/cuentas/inicioSesion?secret=44c4ec5dec97a44efa4ade06f7eb4b27030ffc980c5d6960c333c4fa5581734f";
        const result = fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Accept': 'text/plain',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers' : 'Content-Type',
                'mode': 'no-cors',
                'referrerPolicy': 'no-referrer',
                'withCredentials': true,    
                'crossorigin': true  
            },
            body: JSON.stringify({
                "id": id,
                "email": usuario,
                "password": contrasenia
            })
        }).then(res => res.json()).then(info => {
            setData(info.token);
            if(info.token.length === 177 ){
                sessionStorage.setItem('username', usuario);
            }
        });
    }
    return(
        <ContextExternos.Provider value={{ userExterno: userexterno, userConfival: userconfival, twoFA: valid2FA}}>
            <>
                <div style={{backgroundColor: '#17202A', height: '100vh',alignItems: 'center', justifyContent: 'center'}}>
                    {data === undefined ? 
                            <div style={{backgroundColor: '#17202A'}}>
                            <div style={{alignItems: 'center', display: "flex", justifyContent: 'center'}}>
                                <Row>
                                    <Image width={400} src="/Img/ImgValuezBPM.png" alt="" />
                                </Row>
                            </div>
                            <div>
                                <Row style={{alignItems: 'center', display: "flex", justifyContent: 'center'}}>
                                    <h1 style={{ color: '#FDFEFE'}} >Bienvenido</h1>
                                </Row>
                                <Row style={{alignItems: 'center', display: "flex", justifyContent: 'center'}}>
                                    <p style={{ color: '#FDFEFE'}}>contraseña o usuario incorrecto</p>
                                </Row>
                            </div>
                            <div>
                                <Row style={{alignItems: 'center', display: "flex", justifyContent: 'center'}}>
                                    <Space direction="Vertical" size={16}>
                                        <Card 
                                            title="Inicio de sesion" 
                                            style={{width: 300, backgroundColor: '#D1D1D1'}}>
                                            <div className="form-group">
                                                <h6 style={{color: '#17202A'}}><BsPersonCircle /></h6><label style={{color: '#17202A'}}><strong>Usuario: </strong></label><br/>
                                                <input type="text" onChange={(e)=>(usuario = e.target.value)} className="from-control"></input>
                                            </div>
                                            <br/>
                                            <div className="form-group">
                                                <h6 style={{color: '#17202A'}}><BsFillShieldLockFill /></h6><label style={{color: '#17202A'}}><strong>Password: </strong></label><br/>
                                                <input type="password" onChange={(e)=>(contrasenia = e.target.value)}className="from-control"></input><br/>
                                            </div>
                                            <br/>
                                            <div className="form-group">
                                                <Button type="primary" style={{backgroundColor: '#5DADE2'}} onClick={login}>Login</Button><br/>
                                            </div>
                                            <br/>
                                            <hr />
                                            <SignInButton />
                                        </Card>
                                    </Space>
                                </Row>
                            </div>
                        </div>
                        : 
                        userconfival.length > 0 ? <Sidebar /> 
                        :
                        valid2FA === true ? <Sidebar /> 
                        : 
                        data === "" ?
                        <div style={{backgroundColor: '#17202A'}}>
                            <div style={{alignItems: 'center', display: "flex", justifyContent: 'center'}}>
                                <Row>
                                    <Image width={400} src="/Img/ImgValuezBPM.png" alt="" />
                                </Row>
                            </div>
                            <div>
                                <Row style={{alignItems: 'center', display: "flex", justifyContent: 'center'}}>
                                    <h1 style={{ color: '#FDFEFE'}} >Bienvenido</h1>
                                </Row>
                            </div>
                            <div>
                                <Row style={{alignItems: 'center', display: "flex", justifyContent: 'center'}}>
                                    <Space direction="Vertical" size={16}>
                                        <Card 
                                            title="Inicio de sesion" 
                                            style={{width: 300, backgroundColor: '#D1D1D1'}}>
                                            <div className="form-group">
                                                <h6 style={{color: '#17202A'}}><BsPersonCircle /></h6><label style={{color: '#17202A'}}><strong>Usuario: </strong></label><br/>
                                                <input type="text" onChange={(e)=>(usuario = e.target.value)} className="from-control"></input>
                                            </div>
                                            <br/>
                                            <div className="form-group">
                                                <h6 style={{color: '#17202A'}}><BsFillShieldLockFill /></h6><label style={{color: '#17202A'}}><strong>Password: </strong></label><br/>
                                                <input type="password" onChange={(e)=>(contrasenia = e.target.value)}className="from-control"></input><br/>
                                            </div>
                                            <br/>
                                            <div className="form-group">
                                                <Button type="primary" style={{backgroundColor: '#5DADE2'}} onClick={login}>Login</Button><br/>
                                            </div>
                                            <br/>
                                            <hr />
                                            <SignInButton />
                                        </Card>
                                    </Space>
                                </Row>
                            </div>
                        </div>
                        : 
                        data.length === 177  ? <Inicio />  
                        :
                        data = null 
                    }
                </div>
            </>
      </ContextExternos.Provider>
    )
}
export default Register


