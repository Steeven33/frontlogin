import React, { useState, useContext } from "react";
import Sidebar from "./Sidebar";
import ContextExternos from "../Context/ContextExternos";
import { BsFillShieldLockFill } from "react-icons/bs";
import OtpInput from "otp-input-react";

const Inicio = () => {

const [otpvalid, setOtpvalid] = useState(false);
const [otp, setOtp] = useState(false);

const context = useContext(ContextExternos)

    return(
        <>
            {otpvalid === false ? 
            <div style={{ backgroundColor:"#17202A", display: "flex", height: '100vh',alignItems: 'center', justifyContent: 'center' }}>
                <div>
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
                                autoFocus></OtpInput>
                        </div>
                    </div>

                </div>
            </div>
            : <Sidebar />}
        </>
    )
}

export default Inicio