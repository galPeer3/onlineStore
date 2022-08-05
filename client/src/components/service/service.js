import { LoginComponent } from "../login-page/login-component";

export const redirect = (url) => {
    switch(url){
        case '/login':
            return <LoginComponent />;
            break;
        // case '/home':
        //     return <HomeComponent />;
        //     break;
    }
};