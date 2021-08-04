import React from 'react';
import {GoogleLogin} from 'react-google-login';
import { useDispatch } from 'react-redux';
import { startLogin } from './../../actions/auth';

export const LoginScreen = () => {

    const dispatch = useDispatch();
    
    const responseGoogle = async({tokenId}) => {
        const data = {tokenId}
        
        dispatch(startLogin(data));
    }

    return (
        <div className="auth__background">
            <div className="auth__container">
                <h1>Ingresar a <br/>Norit</h1>
                <p>Google:</p>
                <GoogleLogin
                    clientId="48766205045-ibqba9mummust693ml6epm2k69ks6oa7.apps.googleusercontent.com"
                    buttonText="Iniciar Sesión"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
            </div>
        </div>
    )
}
