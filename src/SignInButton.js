import { useMsal } from '@azure/msal-react';
import { Button } from "antd";

export const SignInButton = () => {
    const { instance } = useMsal();

    const handleSignIn = () =>{
        instance.loginRedirect({
            scopes: ['user.read']
        });
        
    }
    return (
        <Button type="primary" style={{backgroundColor: '#2ECC71'}} onClick={handleSignIn}>Login with Microsoft</Button> 
        
    )
};