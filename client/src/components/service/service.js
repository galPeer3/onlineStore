import { LoginComponent } from "../login-page/login-component";

// redirect recieve the url to go to and the data of the specific user(cart, name etc..)
export const redirect = (url, data) => {
    switch(url){
        case '/login':
            return <LoginComponent data={data} />;
            break;
        // case '/home':
        //     return <HomeComponent />;
        //     break;
    }
};