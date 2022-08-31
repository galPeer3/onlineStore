import { useEffect, useState } from "react";
import { NavigationComponent } from "../navigation-bar/navigation-component";
// import soccerCategory from './main/356-3566699_water-ski-silhouette-comments-clipart-png-download-water.png';
import { useParams, useLocation  } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { LoginComponent } from "../login-page/login-component";
import { styles } from "./home-component-styles";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {CardsComponent} from "./card-component";


export function HomeComponent(props) {
    const navigate = useNavigate();
    const {state} = useLocation(); // state holds the user data(so we can retrieve its cart)
    const data =     [  {name: "Soccer", img: "https://flyclipart.com/thumb2/soccer-icon-164510.png"},
                        {name: "Basketball", img: "https://img.favpng.com/19/20/2/basketball-sport-computer-icons-png-favpng-TeCX9Nm6CttXW816DyKet0bLq.jpg"},
                        {name: "Fitness", img: "https://toppng.com/uploads/preview/fitness-free-icon-fitness-icon-11553442305yz0koorjc2.png"},
                        {name: "Water sport", img: "https://icon-library.com/images/water-sports-icon/water-sports-icon-11.jpg"},
                        {name: "Cycling", img: "https://w7.pngwing.com/pngs/941/1003/png-transparent-triathlon-cycling-computer-icons-sport-cycling.png"},
                        {name: "Material Arts", img: "https://fashionsista.co/downloadpng/png/20200904/black-belt-karate-martial-artist-martial-arts-self.jpg"},
                    ];

//const addItemToCart = async (product) => {
  //     const url = 'api/user/addToCart';
         
  //     const response = await fetch(url, {
  //         method: 'POST',
  //         body: JSON.stringify({ product })
  //       });

  //       response.then((response) => response.json())
  //       .then((data) => {
  //         alert("The item has been added");
  //         })
  //     .catch((error) => {
  //           navigate('/login', {replace:true});
  //         });
  // };


         //const homeData = fetchHomeData();

    // const fetchHomeDate = async () => {
    //     const url = '/products';
           
    //     const response = await fetch(url, {
    //         method: 'POST',
    //     
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

        <div>
                <header style={styles.Header}>
                    <div className="storeHeader" style={styles.HeaderContent}>
                        <hgroup style={styles.HeaderHgroup}>
                            <h1>GG Sport</h1>
                            <i>By Gal & Gil</i>
                        </hgroup>
                    </div>
                    <div className="overlay" style={styles.headerOverlay}></div>
                </header>
            <section className="site" style={styles.Site}>
                <div>
                <nav style={styles.SiteNav}>
                    <NavigationComponent />
                </nav>
                </div>

                <div>
                        <CardsComponent />
                </div>

            </section>
        </div>





        // <div>
        // <div style={styles.Title}>
        //   GG Sport
        // </div>
        // <div style={styles.Container}>
        //     <NavigationComponent />
        //     {list}
        //
        // </div>
        // </div>
    );
}