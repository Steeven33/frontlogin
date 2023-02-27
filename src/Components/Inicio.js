import React, { useState, useContext } from "react";
import Sidebar from "./Sidebar";
import ContextExternos from "../Context/ContextExternos";
import { BsFillShieldLockFill } from "react-icons/bs";
import OtpInput from "otp-input-react";
import { Button } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { toast, Toaster } from "react-hot-toast";

const Inicio = () => {

    const [otpvalid, setOtpvalid] = useState(false);
    const [otp, setOtp] = useState(false);
    const [loading, setLoading] = useState(false);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    const context = useContext(ContextExternos);
    const [btn, setBtn] = useState(false);
    const [code2FA2, setCode2FA2] = useState(null);
    const [twoFA, setTwoFA] = useState(null);
    let currentAccountE = sessionStorage.getItem('username')

 
    function onSignup(){
        setBtn(true);
        setLoading(true);
        var twoFA = Math.floor(100000 + Math.random() * 900000);
        setCode2FA2(twoFA);
        if(window.Email){
            window.Email.send({
                Host : "smtp.elasticemail.com",
                Username : "automatizacion@confival.com",
                Password : "846BD6632A7FBDE0B0E1DDCEE4D50A6F39BC",
                To : "stev-medina@hotmail.com",
                From : "steeven415@gmail.com",
                Subject : "Inicio sesion Valuez BPM",
                Body : "El codigo 2FA para su inicio de sesion es: " + twoFA + "."
            }).then(()=> {
                toast.success('Codigo 2FA enviado exitosamente');
                setLoading(false);
            }).catch((error) => {
                console.log(error);
            })
        }
    }
    
    function onOTPVerify(){
        setLoading(true);
        console.log(otp);
        console.log(code2FA2)
        if(otp.toString() === code2FA2.toString()){
            setOtpvalid(true);
            setLoading(false);
            setTwoFA(true);
        }else{
            setBtn(false);
            toast.success('Codigo 2FA erroneo');
        }
        setLoading(false);
    }

    function SignOut(){
        sessionStorage.clear();
        window.location.reload();
    }

    return(
        <>
        <ContextExternos.Provider value={{ twoFASuccess: twoFA, userExterno: currentAccountE, userConfival: "" }}>
            {otpvalid === false ? 
                <div style={{ backgroundColor:"#17202A", display: "flex", height: '100vh',alignItems: 'center', justifyContent: 'center' }}>
                    <div>
                        <Toaster toastOptions={{duration: 4000}} />
                        <div id="recaptcha-container"></div>
                        <div style={{color: "#FDFEFE", textAlign: 'center', alignItems: 'center'}}>
                            <h1>Bienvenido a Valuez BPM <br />{context.userExterno}</h1>
                        </div>
                        <div>
                            <h1 style={{color: '#FDFEFE', alignItems: 'center',  textAlign: 'center'}}><BsFillShieldLockFill /></h1><br />
                        </div>
                        <div style={{color:'#FDFEFE', alignItems: 'center',  textAlign: 'center', justifyContent: 'center', display: "flex"}}>
                            <div className="label">
                                Ingrese su codigo OTP
                                <OtpInput 
                                    value={otp}
                                    onChange={setOtp}
                                    OTPLength={6} 
                                    otpType="number" 
                                    display={false} 
                                    autoFocus>
                                </OtpInput>
                                <br/>
                                {btn ?
                                    <Button type="primary" block style={{background: '#2ECC71', alignItems: 'center', justifyContent: 'center', height: '14hv'}}>
                                    {
                                        loading && <Spin indicator={antIcon} />
                                    }
                                    <span style={{fontWeight: 'bold'}} onClick={onOTPVerify}>Verificar OTP</span>
                                    </Button> 
                                    :
                                    <Button type="primary" block style={{background: '#2ECC71', alignItems: 'center', justifyContent: 'center', height: '7hv'}}>
                                    {
                                        loading && <Spin indicator={antIcon} />
                                    }
                                    <span style={{fontWeight: 'bold'}} onClick={onSignup}>Solicitar 2FA</span>
                                    </Button>
                                }
                                <hr/>
                                <Button type="primary" block style={{background: '#E74C3C', alignItems: 'center', justifyContent: 'center', height: '7hv', fontWeight: 'bold'}} onClick={SignOut}>Cancelar</Button>
                            </div>
                        </div>

                    </div>
                    
                </div>
            : <Sidebar />}
            </ContextExternos.Provider>
        </>
    )
}

export default Inicio