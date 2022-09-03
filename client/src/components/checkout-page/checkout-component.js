import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { NavigationComponent } from "../navigation-bar/navigation-component";
import IconButton from '@mui/material/IconButton';

import { styles } from './checkout-component-styles';

export function CheckOutComponent(props) {
    const navigate = useNavigate();
    const [cartData, setCartData] = useState(null);
    const [checkoutData, setCheckoutData] = useState([]);



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
        alert("please login");
          navigate('/', {replace:true})
          });

}, []);

const onPay = () => {
const finalUrl = `api/user/checkout/payment`;
         
      const response = fetch(finalUrl, {
          method: 'POST',
          headers : {'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'},
                body: JSON.stringify({products: checkoutData})

        });
        response.then((response) => response.json())
        .then((data) => {
            window.location.reload();
            alert(`You paid successfully`);
          })
      .catch((error) => {
        alert("please login");
          navigate('/', {replace:true})
          });
        };


if(!cartData) {
    return (
      <div style={styles.loaderContainer}>
              <div style={styles.spinner}></div>
          </div>
  
    );
}

const checked = (id, category) => {
    const index = checkoutData.findIndex((product) => product._id == id && product.category == category);

    return index != -1;
}

const addOrRemoveFromCheckout = (product, id, category) => {
    const found = checked(checkoutData, id, category);

    if(!found) {
        const temp = checkoutData;
        temp.push(product);

        setCheckoutData(temp);
    }
    else{
        setCheckoutData(checkoutData.filter((product) => product._id != id && product.category != category));
    }
}

// const total = () => {
//     let amount = 0;

//     for(const product of checkoutData){
//         amount+= parseInt(product.price);
//     }

//     return amount;
// }

const products =  <ImageList sx={{  height: 600, marginLeft:"200px"}} cols={3} rowHeight={160}  gap={100}>
    {cartData.map((product) => (
      
      <ImageListItem sx={{ maxWidth: "200px", maxHeight: "200px", marginBottom:"5px", marginRight:"5px"}} key={product.img} cols={1}>
        <img
          src={`${product.image}`}
          srcSet={`${product.image}`}
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
            >
               
               <label htmlFor="remember_me" style={{fontSize:20}}>
                        <input
                            type="checkbox"
                            id="rememberMe"
                           onChange={(e) => addOrRemoveFromCheckout(product, product._id, product.category)}
                        ></input>
                    </label>
            </IconButton>
          }
        />
      </ImageListItem>
))}
  </ImageList>

  return(
<>
<NavigationComponent/>
{products}
<button style={{marginLeft: "720px", fontSize: 50, cursor:"pointer"}} onClick={onPay}>Pay</button>
</>
  );
};