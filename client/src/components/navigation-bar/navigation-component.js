import { styles } from "./navigation-component-styles";
import { Redirect } from "../service/Redirect";

export function NavigationComponent(props) {

    const {cartData, userData, homeData} = props;
    
    const onHomeClick = () => {
        Redirect('/home', homeData);
    }
    const onLogoutClick = () => {

    }
    const onAboutClick = () => {
        Redirect('/about');
    }
    const onShoppingCartClick = () => {
        Redirect('/cart', cartData);
    }

    return(
        <div style={styles.bar}>
            <button style={styles.button} onClick={onHomeClick}>
                Home
            </button>
            <button style={styles.button} onClick={onShoppingCartClick}>
                Cart
            </button>
            <button style={styles.button} onClick={onLogoutClick}>
                Logout
            </button>
            <button style={styles.button} onClick={onAboutClick}>
                About
            </button>
        </div>
    );
}