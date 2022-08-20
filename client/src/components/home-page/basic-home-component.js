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
import AddCircleIcon from '@mui/icons-material/AddCircle';


export function BasicHomeComponent(props) {
    const navigate = useNavigate();
    const {url} = props;
    const data =     [   {name: "ball", img: "https://cdn.shopify.com/s/files/1/0712/4751/products/SMA-01_2000x.jpg?v=1629409085", price: 30}, 
                        {name: "gloves", img: "https://media.4rgos.it/s/Argos/9203547_R_SET?w=270&h=270&qlt=75&fmt.jpeg.interlaced=true", price: 10},
                        {name: "shirt", img: "https://i5.walmartimages.com/asr/63a71d5d-b2be-4e0a-8610-c9a0db70c439.80ee420a650303eed04c45c4793162c5.jpeg?odnHeight=580&odnWidth=580&odnBg=FFFFFF", price: 50},
                        {name: "shoes", img: "https://canary.contestimg.wish.com/api/webimage/5d89832baaf8240829e721e1-large.jpg?cache_buster=1ab0b6eaaa4634cc9fe3cdea410c3c86", price: 300},
                        {name: "ball", img: "https://cdn.shopify.com/s/files/1/0712/4751/products/SMA-01_2000x.jpg?v=1629409085", price: 30}, 
                        {name: "gloves", img: "https://media.4rgos.it/s/Argos/9203547_R_SET?w=270&h=270&qlt=75&fmt.jpeg.interlaced=true", price: 10},
                        {name: "shirt", img: "https://i5.walmartimages.com/asr/63a71d5d-b2be-4e0a-8610-c9a0db70c439.80ee420a650303eed04c45c4793162c5.jpeg?odnHeight=580&odnWidth=580&odnBg=FFFFFF", price: 50},
                        {name: "shoes", img: "https://canary.contestimg.wish.com/api/webimage/5d89832baaf8240829e721e1-large.jpg?cache_buster=1ab0b6eaaa4634cc9fe3cdea410c3c86", price: 300},
                        {name: "ball", img: "https://cdn.shopify.com/s/files/1/0712/4751/products/SMA-01_2000x.jpg?v=1629409085", price: 30}, 
                        {name: "gloves", img: "https://media.4rgos.it/s/Argos/9203547_R_SET?w=270&h=270&qlt=75&fmt.jpeg.interlaced=true", price: 10},
                        {name: "shirt", img: "https://i5.walmartimages.com/asr/63a71d5d-b2be-4e0a-8610-c9a0db70c439.80ee420a650303eed04c45c4793162c5.jpeg?odnHeight=580&odnWidth=580&odnBg=FFFFFF", price: 50},
                        {name: "shoes", img: "https://canary.contestimg.wish.com/api/webimage/5d89832baaf8240829e721e1-large.jpg?cache_buster=1ab0b6eaaa4634cc9fe3cdea410c3c86", price: 300}
                    ];
   
      //const homeData = fetchHomeData();

    // const fetchHomeDate = async () => {
    //     const finalUrl = `/home${url}`;
           
    //     const response = await fetch(finalUrl, {
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

    const listItems = <ImageList sx={{ width: 900, height: 600}} cols={3} rowHeight={160}  gap={100}>

      {data.map((product) => (
        <ImageListItem sx={{ maxWidth: "200px", maxHeight: "200px", marginBottom:"5px", marginRight:"5px"}} key={product.img} cols={1}>
          <img
            src={`${product.img}?w=200&fit=crop&auto=format`}
            srcSet={`${product.img}?w=200&fit=crop&auto=format&dpr=2 2x`}
            alt={product.name}
            loading="lazy"
          />
          
          <ImageListItemBar
            title={product.name}
            position={"bottom"}
            subtitle={`${product.price}$`}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                //onClick={(product) => addItemToCart(product)}
              >
                Add 
                <AddCircleIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
  

    return (
        //need to map list of data and show the products
        <div style={styles.Page}>
        <div style={styles.Title}>
          Home
        </div>
        <div style={styles.Container}>
            <NavigationComponent />
            {listItems}
            
        </div>
        </div>
    );
}