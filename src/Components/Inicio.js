import React, { useState, useContext } from "react";
import Sidebar from "./Sidebar";
import ContextExternos from "../Context/ContextExternos";
import { BsFillShieldLockFill } from "react-icons/bs";
import OtpInput from "otp-input-react";
import { Button } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import { auth } from "../firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

const Inicio = () => {

    const [otpvalid, setOtpvalid] = useState(false);
    const [otp, setOtp] = useState(false);
    const [loading, setLoading] = useState(false);
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    var telefono = "+573194383257";
    const context = useContext(ContextExternos);
    const [btn, setBtn] = useState(false);

    function onCaptchaVerifier(){
        if(!window.recaptchaVerifier){
            window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
                'size': 'invisible',
                'callback': (response) => {
                  onSignup()
                },
                'expired-callback': () => {
                }
            }, auth);
        }
    }

    function onSignup(){
        setBtn(true)
        setLoading(true)
        onCaptchaVerifier()
        const appVerifier = window.recaptchaVerifier
        signInWithPhoneNumber(auth, telefono, appVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            setLoading(false);
            toast.success('Codigo OTP enviado exitosamente')
        }).catch((error) => {
            console.log(error);
            setLoading(false)
        });
    }

    function onOTPVerify(){
        setLoading(true);
        window.confirmationResult.confirm(otp).then(async(res) => {
            console.log(res);
            setOtpvalid(true);
            setLoading(false);
        }).catch((err) => {
            console.log(err);
            setLoading(false);
            toast.success('Codigo OTP erroneo')
        })
    }

    function SignOut(){
        sessionStorage.clear();
        window.location.reload();
    }

    return(
        <>
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
                                    <span style={{fontWeight: 'bold'}} onClick={onSignup}>Solicitar OTP</span>
                                    </Button>
                                }
                                <hr/>
                                <Button type="primary" block style={{background: '#E74C3C', alignItems: 'center', justifyContent: 'center', height: '7hv', fontWeight: 'bold'}} onClick={SignOut}>Cancelar</Button>
                            </div>
                        </div>

                    </div>
                </div>
            : <Sidebar />}
        </>
    )
}

export default Inicio