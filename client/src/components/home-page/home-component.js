import { useEffect, useState } from "react";
import { NavigationComponent } from "../navigation-bar/navigation-component";
import { useParams, useLocation  } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoginComponent } from "../login-page/login-component";

export function HomeComponent(props) {
    const navigate = useNavigate();
    const {state} = useLocation(); // state holds the user data(so we can retrieve its cart)
    if(!state) {
        navigate('/');
    }
    //const homeData = fetchHomeData();

    // const fetchHomeDate = async () => {
    //     const url = '/home';
           
    //     const response = await fetch(url, {
    //         method: 'POST',
    //         body: JSON.stringify(userData)
    //       });

    //       response.then((response) => response.json())
    //       .then((data) => {
    //         return data;
    //         })
    //     .catch((error) => {
    //         alert(error);
    //         });
    // };

    return (
        //need to map list of data and show the products
        <div>
            <NavigationComponent />
        </div>
    );
}