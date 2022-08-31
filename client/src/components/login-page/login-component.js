import { styles } from './login-component-styles';
import { useState } from 'react';
import {Redirect} from "../service/Redirect";
import { useNavigate } from "react-router-dom";
import { HomeComponent } from '../home-page/home-component';

export function LoginComponent(props) {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleRegisterPageButton = () => {
        navigate('/register', {replace:true});
    }   
     const login = () => {
        const userData = {"email": email, "password": password};
        const response = fetch('api/user/login', {

            method: 'POST',
             headers : {'Content-Type':'application/json',
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS',
               },
            body: JSON.stringify(userData) 
          });
          response.then((data) =>data.json())
          .then((token) => {
            localStorage.setItem('auth', token)
            navigate('/home', {replace: true})
            })
            .catch((error) => {
                alert("invalid email or password");
                });
        
    };

    return (
        <div style={styles.Page}>
            <h1 style={styles.Title}>Welcome Back!</h1>
            <div style={styles.userDetails}>
            <label>
                User email:
                <input style={styles.UserName} type="text" value={email} onChange={handleEmailChange}  />
            </label>
            <label>
                Password:
                <input style={styles.Password} type="text" value={password} onChange={handlePasswordChange}  />
            </label>

            <button style={styles.LoginButton} onClick={login}>Login</button>
            <button style={styles.LoginButton} onClick={handleRegisterPageButton}>Register Page</button>
                <div>
                    <label htmlFor="remember_me">
                        Remember me{" "}
                        <input
                            type="checkbox"
                            id="rememberMe"
                            onChange={(e) => setRememberMe(e.target.value)}
                        ></input>
                    </label>
                </div>
            </div>
        </div>

    );
}