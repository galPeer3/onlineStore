import { styles } from './register-component-styles';
import { useState } from 'react';
import {Redirect} from "../service/Redirect";
import { useNavigate } from "react-router-dom";
import { HomeComponent } from '../home-page/home-component';
import { Navigate } from 'react-router-dom';

export function RegisterComponent(props) {
    localStorage.setItem('auth', "false");
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handleLoginPageButton = () => {
        navigate('/login', {replace:true});
    }
    const register = async () => {
        const userData = {name: name, password: password};
        const url = '/register';

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(userData) 
          });

          response.then((response) => response.json())
          .then((data) => {
            alert("You have register successfully! /n Go to login page.")
            
            })
        .catch((error) => {
            alert(error);
            });
    };

    return (
        <div style={styles.Page}>
            <h1 style={styles.Title}>Welcome!</h1>
            <div style={styles.userDetails}>
            <label>
                User Name:
                <input style={styles.UserName} type="text" value={name} onChange={handleNameChange}  />
            </label>
            <label>
                Password:
                <input style={styles.Password} type="text" value={password} onChange={handlePasswordChange}  />
            </label>

            <button style={styles.RegisterButton} onClick={register}>Register</button>
            <button style={styles.RegisterButton} onClick={handleLoginPageButton}>Login Page</button>
            </div>
        </div>

    );
}