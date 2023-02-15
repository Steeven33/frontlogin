import { SignInButton } from "./SignInButton"
import React, { useState } from "react";


export const Register = ()=>{
    var usuario = "";
    var contrasenia = "";
    
    
    
    const [data, setData] = useState(false);
    function login(){
    var url = "https://localhost:7157/api/Usuario/Get?nombre=" + usuario  + "&contrasenia=" + contrasenia;
    const result = fetch(url, {
        method: 'GET',
        headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      }
    }).then(res => res.json()).then(info => {
        setData(info);
        console.log(data);
    });

    }
    return(
        <div>
            {data ? <p>logueo exitoso</p>: <p>no logueado</p>}
            <div>
                <h1>Login page</h1>
                    <div>
                        <div className="col-sm-10 offset-sm-0">
                            <input type="text" placeholder="usuario" onChange={(e)=>(usuario = e.target.value)} className="from-control"></input><br/>
                            <input type="password" placeholder="contraseña" onChange={(e)=>(contrasenia = e.target.value)}className="from-control"></input><br/>
                            <button onClick={login} className="btn btn-primary">Login</button><br/>
                                <div className="container">
                                    <SignInButton />
                                </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}
export default Register


