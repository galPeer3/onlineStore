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
    const onLogoutClick = () => {
        const response = fetch('api/user/logout', {

            method: 'POST',
             headers : {'Content-Type':'application/json',
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS',
               },
            body: JSON.stringify(localStorage.getItem('auth')) 
          });
          response.then((data) =>data.json())
          .then((token) => {
            localStorage.setItem('auth', null)
            navigate('/login', {replace: true})
            })
            .catch((error) => {
                alert("logout failed");
                });
            }
    
    const onAboutClick = () => {
        navigate('/about');
    }
    const onShoppingCartClick = () => {
        navigate('/cart', {replace: true});
    }
    const onAddProductClick = () => {
        navigate('/adminScreen/addProduct', {replace: true});
    }
    const onRemoveProductClick = () => {
        navigate('/adminScreen/removeProduct', {replace: true});
    }
    const onUserActivitiesClick = () => {
        navigate('/adminScreen/userActivities', {replace: true});
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

