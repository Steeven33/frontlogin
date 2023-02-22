import { useMsal } from "@azure/msal-react";
import { Button } from 'antd';

export const SignOutButton = () => {
    const { instance } = useMsal();

    const handleSignOut = () => {
        instance.logoutRedirect();
    };

    return(
        <Button type="primary" style={{ background: '#E74C3C', borderColor: '#7B241C' }} onClick={handleSignOut} >Sign out</Button>
    )
};