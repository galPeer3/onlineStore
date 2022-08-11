import { styles } from "./navigation-component-styles";
import { useNavigate } from "react-router-dom";

export function NavigationComponent(props) {

    const {cartData, userData, homeData} = props;
    const navigate = useNavigate();

    const onHomeClick = () => {
        navigate('/home', {state:userData}); //userDate = {name:name, password:password}
    }
    const onLogoutClick = () => {
        navigate('/login', {replace:true});
    }
    const onAboutClick = () => {
        navigate('/about');
    }
    const onShoppingCartClick = () => {
        navigate('/cart', {state:userData});
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