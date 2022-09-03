import { styles } from './register-component-styles';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export function RegisterComponent(props) {
    localStorage.setItem('auth', "false");
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }
    const handleLoginPageButton = () => {
        navigate('/login', {replace:true});
    }
    const register = async () => {
        
        const userData = {"email": email, "password": password};
        const response = fetch('api/user/register', {

            method: 'POST',
             headers : {'Content-Type':'application/json',
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS',
               },
            body: JSON.stringify(userData) 
          });
          response.then((data) =>data.json())
          .then((data) => {
            alert('you have registered successfully!')
            navigate('/', {replace: true})
            })
            .catch((error) => {
                alert("invalid email or password");
                });
    };

    return (
        <div style={styles.Page}>
            <h1 style={styles.Title}>Welcome!</h1>
            <div style={styles.userDetails}>
            <label>
                User Email:<br/>
                <input style={styles.UserName} type="text" value={email} onChange={handleEmailChange}  />
            </label>
            <label><br/>
                Password:<br/>
                <input style={styles.Password} type="text" value={password} onChange={handlePasswordChange}  />
            </label>

            <button style={styles.RegisterButton} onClick={register}>Register</button>
            <button style={styles.RegisterButton} onClick={handleLoginPageButton}>Login Page</button>
            </div>
        </div>

    );
}