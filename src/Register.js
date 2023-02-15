import { SignInButton } from "./SignInButton"
export const Register = ()=>{
    var usuario = "";
    var contrasenia = "";
    async function login(){
    var url = "https://localhost:7157/api/Usuario/Get?nombre=" + usuario  + "&contrasenia=" + contrasenia;
    let result = await fetch(url, {
        method: 'GET',
        headers: {
        'content-type': 'application/json',
        'Accept': 'application/json'
      }
    });
    console.log(result.json());
    }
    return(
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
    )
}
export default Register


