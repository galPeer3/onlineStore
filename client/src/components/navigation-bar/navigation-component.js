import * as React from 'react';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import Home from '@mui/icons-material/Home';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Logout from '@mui/icons-material/Logout';
import About from '@mui/icons-material/Info';
import UserActivities from '@mui/icons-material/SupervisedUserCircle';
import Box from '@mui/joy/Box';
import ListDivider from '@mui/joy/ListDivider';
import { styles } from "./navigation-component-styles";
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';

import { useNavigate } from "react-router-dom";


export function NavigationComponent(props) {
    const navigate = useNavigate();

    const onHomeClick = () => {
        navigate('/home',  {replace:true}); //userDate = {name:name, password:password}
    }
    const onLogoutClick = () => {
        const response = fetch('api/user/logout', {

            method: 'GET',
             headers : {'Content-Type':'application/json',
                    'Access-Control-Allow-Origin':'*',
                    'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS',
               },
          });
          response.then((data) =>data.json())
          .then((data) => {
            localStorage.setItem('auth', null);
            navigate('/', {replace: true})
            })
            .catch((error) => {
                alert(error);
                });
    };
    
    const onAboutClick = () => {
        navigate('/about', {replace: true});
    }
    const onShoppingCartClick = () => {
        navigate('/cart', {replace: true});
    }
    const onCheckOut = () => {
        navigate('/checkout', {replace: true});
    }
    const onAdmin = () => {
        navigate('/admin', {replace: true});
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
                    <ListItem role="none" onClick={onAdmin} sx={{ marginInlineStart: 'auto' }}>
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
                    <ListItem role="none" onClick={onCheckOut} >
                        <ListItemButton
                            role="menuitem"
                            component="a"
                            href="#horizontal-list"
                            aria-label="onAddProductClick"
                        >
                            <PointOfSaleIcon />
                        </ListItemButton>
                    </ListItem>
                    <ListDivider />
                    </List>
            </Box>
        </div>
    );
}

