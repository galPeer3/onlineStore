import { styles } from "./navigation-component-styles";
import { useNavigate } from "react-router-dom";

export function NavigationComponent(props) {

    const {cartData, userData, homeData} = props;
    const navigate = useNavigate();

    const onHomeClick = () => {
        navigate('/home',  {replace:true}); //userDate = {name:name, password:password}
    }
    const onLogoutClick = async () => {
        localStorage.setItem('auth', "false");
        navigate('/login', {replace:true});
        const url = "api/user/logout";
        const redirectUrl = "/login";
        await fetch(url, redirectUrl);
    }
    const onAboutClick = () => {
        navigate('/about');
    }
    const onShoppingCartClick = async () => {
        const url = "api/user/cart";
        const redirectUrl = "/cart";
        await fetch(url, redirectUrl);
    }

    const oncheckoutClick = async () => {
        const url = "api/user/checkout";
        const redirectUrl = "/checkout";
        await fetch(url, redirectUrl);
    }


    const fetch = async (url, redirectUrl) => {
        const response = await fetch(url, {
            method: 'POST',
          });

          response.then((response) => response.json())
          .then((data) => {
            navigate(redirectUrl, {state: data})
            })
        .catch((error) => {
            alert(error);
            });

    };

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