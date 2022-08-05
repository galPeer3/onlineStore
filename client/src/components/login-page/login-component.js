import { styles } from './login-component-styles';
import { useState } from 'react';
import {redirect} from "../service/service";

export function LoginComponent(props) {

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleNameChange = (event) => {
        setName(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const tdry = () => {alert("Dddd");}
    const login = async () => {
        const userData = {name: name, password: password};
        const url = '/login';

        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(userData) 
          });

          response.then((response) => response.json())
          .then((data) => {
            redirect('/home', data)
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
            </div>
        </div>

    );
}