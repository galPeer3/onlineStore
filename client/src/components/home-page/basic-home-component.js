import { useEffect, useState } from "react";
import { NavigationComponent } from "../navigation-bar/navigation-component";
import { useNavigate } from "react-router-dom";
import { styles } from "./home-component-styles";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


export function BasicHomeComponent(props) {
    const navigate = useNavigate();
    const {url} = props;
    const [homeData, setHomeData] = useState(null);
    const [finalHomeData, setFinalHomeData] = useState(null);
    const [searchValue, setSearchValue] = useState(null);
    let tempSearchValue = "";

  useEffect(() => {
    
      const finalUrl = `api/products/${url}`;
         
      const response = fetch(finalUrl, {
          method: 'GET',
          headers : {'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'},
        });
        response.then((response) => response.json())
        .then((data) => {
          setHomeData(data);
          setFinalHomeData(data);
          })
      .catch((error) => {
          alert(error);
          });

}, []);

const addItemToCart = (id, categoryName) => {
      const url = 'api/user/addToCart';
      const response =  fetch(url, {
          method: 'POST',
          headers : {'Content-Type':'application/json',
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS',
                'Access-Control-Allow-Credentials': true},
          body: JSON.stringify({categoryName:categoryName, productId:id, token: localStorage.getItem('auth')})
        });

        response.then((response) => response.json())
        .then((data) => {
          alert("The item has been added");
          })
      .catch((error) => {
        alert("Please login")
            navigate('/login', {replace:true});
          });
  };

if(!homeData) {
  return (
    <div style={styles.loaderContainer}>
      	  <div style={styles.spinner}></div>
        </div>

  );
}
    const listItems = <ImageList sx={{ height: 600, marginLeft:"200px"}} cols={3} rowHeight={160}  gap={100}>

      {finalHomeData.map((product) => (
        
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
                onClick={() => addItemToCart(product._id, product.category)}
              >
                <AddShoppingCartIcon />
              </IconButton>
            }
          />
        </ImageListItem>
  ))}
    </ImageList>
  
          
  const onSearch = (event) => {
    setSearchValue(event.target.value)
    tempSearchValue = event.target.value;
    if(tempSearchValue == "") {
        setFinalHomeData(homeData);
    }
    else {
        let list = [];
        for(const product of homeData) {
            if(product.title.startsWith(searchValue)) {
                list.push(product);
            }
        }

        setFinalHomeData(list);
    }
}

    return (
        <div>
            <NavigationComponent />
            <input  type="search" placeholder="Search" value={searchValue} onChange={onSearch} autoFocus="autoFocus"></input>

            {listItems}
            
        </div>
    );
}