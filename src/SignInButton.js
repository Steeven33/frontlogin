import { useMsal } from '@azure/msal-react';

export const SignInButton = () => {
    const { instance } = useMsal();

    const handleSignIn = () =>{
        instance.loginRedirect({
            scopes: ['user.read']
        });
        
    }
    return (
        <>
        <div className='cursor'>
            <label style={{color: '#17202A'}}><strong>Continuar con: </strong></label><br/><br/>
            <img width={150} src="/Img/Microsoft365.svg" alt="" onClick={handleSignIn} />
        </div>
        </>
        
    )
};