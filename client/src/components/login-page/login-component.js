import { styles } from './login-component-styles';
import { useState } from 'react';
import {Redirect} from "../service/Redirect";
import { useNavigate } from "react-router-dom";
import { HomeComponent } from '../home-page/home-component';
import { Navigate } from 'react-router-dom';

export function LoginComponent(props) {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const tdry = () => {
        localStorage.setItem('auth', "true");
        navigate('/home', {state:{email: email, password: password}});
    }
    const handleRegisterPageButton = () => {
        navigate('/register', {replace:true});
    }
    const login = async () => {
        const userData = {email: email, password: password};
        const response = await fetch('http://localhost:5000/api/user/login', {
            method: 'POST',
            params: JSON.stringify(userData) 
          });
          response.then((response) => response.json())
          .then((data) => {
            localStorage.setItem('auth', response.cookies)
            navigate('/home', {state: data})
            })
        .catch((error) => {
            alert(error);
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
            </div>
        </div>

    );
}