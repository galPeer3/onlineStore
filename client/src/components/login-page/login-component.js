import { styles } from './login-component-styles';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

export function LoginComponent(props) {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

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
        const userData = {"email": email, "password": password, rememberMe: rememberMe};
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
                User email:<br/>
                <input style={styles.UserName} type="email" value={email} onChange={handleEmailChange}  />
            </label>
            <label>
                Password:<br/>
                <input style={styles.Password} type="text" value={password} onChange={handlePasswordChange}  />
            </label>
            <div>
                    <label htmlFor="remember_me" style={{fontSize:20}}>
                        Remember me{" "}
                        <input
                            type="checkbox"
                            id="rememberMe"
                            onChange={(e) => setRememberMe(!rememberMe)}
                        ></input>
                    </label>
                </div>
            <button style={styles.LoginButton} onClick={login}>Login</button>
            <button style={styles.RegisterButton} onClick={handleRegisterPageButton}>Register page</button>
            </div>
        </div>

    );
}