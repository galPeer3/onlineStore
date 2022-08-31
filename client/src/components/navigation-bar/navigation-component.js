import * as React from 'react';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Home from '@mui/icons-material/Home';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Logout from '@mui/icons-material/Logout';
import About from '@mui/icons-material/Info';
import UserActivities from '@mui/icons-material/SupervisedUserCircle';
import AddProduct from '@mui/icons-material/PlaylistAdd';
import RemoveProduct from '@mui/icons-material/PlaylistRemove';
import Box from '@mui/joy/Box';
import ListDivider from '@mui/joy/ListDivider';
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
    const onShoppingCartClick = () => {
        navigate('/cart', {state:userData});
    }
    const onAddProductClick = () => {
        navigate('/adminScreen/addProduct', {state:userData});
    }
    const onRemoveProductClick = () => {
        navigate('/adminScreen/removeProduct', {state:userData});
    }
    const onUserActivitiesClick = () => {
        navigate('/adminScreen/userActivities', {state:userData});
    }

    return (
        <div >
            <Box style={styles.navbar} component="nav" aria-label="My site" sx={{ flexGrow: 1 }}>
                <List role="menubar" row >
                    <ListItem role="none" onClick={onHomeClick} >
                        <ListItemButton
                            role="menuitem"
                            component="a"
                            href="#horizontal-list"
                            aria-label="Home"
                        >
                            <Home />
                        </ListItemButton>
                    </ListItem>
                    <ListDivider />
                    <ListItem role="none" onClick={onShoppingCartClick}>
                        <ShoppingCart />
                        <ListItemButton role="menuitem" component="a" href="#horizontal-list">
                            Shopping Cart
                        </ListItemButton>
                    </ListItem>
                    <ListDivider />
                    <ListItem role="none" onClick={onLogoutClick}>
                        <Logout />
                        <ListItemButton role="menuitem" component="a" href="#horizontal-list">
                            Logout
                        </ListItemButton>
                    </ListItem>
                    <ListDivider />
                    <ListItem role="none" onClick={onAboutClick}>
                        <About />
                        <ListItemButton role="menuitem" component="a" href="#horizontal-list">
                            About Us
                        </ListItemButton>
                    </ListItem>
                    <ListDivider />
                    <ListItem role="none" onClick={onUserActivitiesClick} sx={{ marginInlineStart: 'auto' }}>
                        <ListItemButton
                            role="menuitem"
                            component="a"
                            href="#horizontal-list"
                            aria-label="userActivities"
                        >
                            <UserActivities />
                        </ListItemButton>
                    </ListItem>
                    <ListDivider />
                    <ListItem role="none" onClick={onAddProductClick} >
                        <ListItemButton
                            role="menuitem"
                            component="a"
                            href="#horizontal-list"
                            aria-label="onAddProductClick"
                        >
                            <AddProduct />
                        </ListItemButton>
                    </ListItem>
                    <ListDivider />
                    <ListItem role="none" onClick={onRemoveProductClick}>
                        <ListItemButton
                            role="menuitem"
                            component="a"
                            href="#horizontal-list"
                            aria-label="removeProduct"
                        >
                            <RemoveProduct />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </div>
    );
}

