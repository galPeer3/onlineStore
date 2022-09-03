import { useEffect, useState } from "react";
import { NavigationComponent } from "../navigation-bar/navigation-component";
import { useNavigate } from "react-router-dom";
import { styles } from "./shooping-cart-component-styles";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


export function ShoppingCartComponent(props) {
    const navigate = useNavigate();
    const [countReload, setCountReload] = useState(1);
    const [cartData, setCartData] = useState(null);
    
  useEffect(() => {
      const finalUrl = `api/user/cart`;
         
      const response = fetch(finalUrl, {
          method: 'GET',
          headers : {'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'},
        });
        response.then((response) => response.json())
        .then((data) => {
            setCartData(data);
          })
      .catch((error) => {
          alert(error);
          });

}, []);

const removeItemFromCart = (id, categoryName) => {
      const url = 'api/user/removeFromCart';
      const response =  fetch(url, {
          method: 'POST',
          headers : {'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS',
                'Access-Control-Allow-Credentials': true},
                body: JSON.stringify({categoryName:categoryName, productId:id})
              });

        response.then((response) => response.json())
        .then((data) => {
            setCartData(data)
            setCountReload(0);
          })
      .catch((error) => {
        alert(error)
            navigate('/login', {replace:true});
          });
  };

if(!cartData) {
  return (
    <div style={styles.loaderContainer}>
      	  <div style={styles.spinner}></div>
        </div>

  );
}
if(countReload < 1){
  window.location.reload(false);
  setCountReload(1);
}

if(Object.keys(cartData).length === 0) {
  return (
    <>
    <NavigationComponent />
  <h1 style={{textAlign:"center", marginTop:"50px"}}>Your cart is Empty!!!</h1>
  </>
  );
}
    const listItems = <ImageList sx={{ height: 600, marginLeft:"200px"}} cols={3} rowHeight={160}  gap={100}>

      {cartData.map((product) => (
        
        <ImageListItem sx={{ maxWidth: "200px", maxHeight: "200px", marginBottom:"5px", marginRight:"5px"}} key={product.img} cols={1}>
          <img
            src={`${product.image}?w=200&fit=crop&auto=format`}
            srcSet={`${product.image}?w=200&fit=crop&auto=format&dpr=2 2x`}
            alt={product.title}
            loading="lazy"
          />
          
          <ImageListItemBar
            title={product.title}
            position={"below"}
            subtitle={`${product.price}$`}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(0, 0, 0, 0.54)' }}
                onClick={() => removeItemFromCart(product._id, product.category)}
              >
                <DeleteForeverIcon />
              </IconButton>
            }
          />
        </ImageListItem>
  ))}
    </ImageList>
  
          
    return (
        <div>
        <div>
          Cart
        </div>
        <div>
            <NavigationComponent />
            {listItems}
            
        </div>
        </div>
    );
}