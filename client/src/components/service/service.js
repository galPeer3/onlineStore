import { LoginComponent } from "../login-page/login-component";
import {ShoppingCartComponent} from "../shopping-cart-page/shooping-cart-component";

// redirect recieve the url to go to and the data of the specific user(cart, name etc..)
export const redirect = (url, data) => {
    switch(url){
        case '/login':
            return <LoginComponent data={data} />;
            break;
        case '/cart':
            return <ShoppingCartComponent />;
            break;
        // case '/home':
        //     return <HomeComponent />;
        //     break;
    }
};