import { styles } from './login-component-styles';
import { useState } from 'react';
import {Redirect} from "../service/Redirect";
import { useNavigate } from "react-router-dom";
import { HomeComponent } from '../home-page/home-component';
import { Navigate } from 'react-router-dom';

export function LoginComponent(props) {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const tdry = () => {
        localStorage.setItem('auth', "true");
        navigate('/home', {state:{name: name, password: password}});
    }
    const handleRegisterPageButton = () => {
        navigate('/register', {replace:true});
    }
    const login = async () => {
        const userData = {name: name, password: password};
        const url = '/login';

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(userData) 
          });

          response.then((response) => response.json())
          .then((data) => {
            //cookie = data.cookie...
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
                User Name:
                <input style={styles.UserName} type="text" value={name} onChange={handleNameChange}  />
            </label>
            <label>
                Password:
                <input style={styles.Password} type="text" value={password} onChange={handlePasswordChange}  />
            </label>

            <button style={styles.LoginButton} onClick={tdry}>Login</button>
            <button style={styles.LoginButton} onClick={handleRegisterPageButton}>Register Page</button>
            </div>
        </div>

    );
}