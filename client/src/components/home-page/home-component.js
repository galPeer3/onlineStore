import { useEffect, useState } from "react";
import { NavigationComponent } from "../navigation-bar/navigation-component";
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
import BasicCard from "./card-component";

export function HomeComponent(props) {
    const navigate = useNavigate();
    const {state} = useLocation(); // state holds the user data(so we can retrieve its cart)
   const data =     [   {name: "Soccer", img: "https://cdn.shopify.com/s/files/1/0712/4751/products/SMA-01_2000x.jpg?v=1629409085"}, 
                        {name: "Basketball", img: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Basketball.png?20060129155432"},
                        {name: "Fitness", img: "https://m.media-amazon.com/images/I/91e89XFkCKL._AC_SX425_.jpg"},
                        {name: "Water sport", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Za7q1Z1n6wDFG-eROUiCn4sHbe-zbooK8A&usqp=CAU"},
                        {name: "Cycling", img: "https://surlybikes.com/uploads/bikes/surly-wednesday-fat-bike-green-BK7965-800x600.jpg"}, 
                        {name: "Material Arts", img: "https://ae05.alicdn.com/kf/HLB1g3krXkCy2eVjSZSyq6xukVXan/Karate-Sports-Shaolin-Martial-Arts-Fun-Decal-Style-Accessories-Decorative-Vinyl-Accessories.jpg"},
                    ];
    
//const addItemToCart = async (product) => {
  //     const url = '/cart/add';
         
  //     const response = await fetch(url, {
  //         method: 'POST',
  //         body: JSON.stringify({userData, product})
  //       });

  //       response.then((response) => response.json())
  //       .then((data) => {
  //         alert("The item has been added");
  //         })
  //     .catch((error) => {
  //         alert(error);
  //         });
  // };
let index = 0;
      const list = data.map((product) => (
          <BasicCard src={product.img} name={product.name}/>
      ));
      
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
        <div style={styles.Page}>
        <div style={styles.Title}>
          Home
        </div>
        <div style={styles.Container}>
            <NavigationComponent />
            {list}
            
        </div>
        </div>
    );
}