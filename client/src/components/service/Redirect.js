import { LoginComponent } from "../login-page/login-component";
import { HomeComponent } from "../home-page/home-component";
import { useNavigate } from "react";

// redirect recieve the url to go to and the data of the specific user(cart, name etc..)
export const Redirect = (url, data) => {
    const navigate = useNavigate();

    switch(url){
        case '/login':
            return <LoginComponent data={data} />;
            break;
        case '/home':
             return navigate('/home');
            break;
    }
};