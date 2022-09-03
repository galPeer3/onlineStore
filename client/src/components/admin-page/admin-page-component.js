import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/system';
import InputUnstyled from '@mui/base/InputUnstyled';
import TabsUnstyled from '@mui/base/TabsUnstyled';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabPanelUnstyled from '@mui/base/TabPanelUnstyled';
import { buttonUnstyledClasses } from '@mui/base/ButtonUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { NavigationComponent } from "../navigation-bar/navigation-component";

import { styles } from "./admin-page-component-styles.js";

export function AdminComponent(props) {
    const navigate = useNavigate();

    const [isFocus, setFocus] = useState(1);
    const [allProducts, setAllProducts] = useState(null);
    const [usersActivities, setUsersActivities] = useState(null);
    const [finalUserActivities, setFinalUserActivities] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const [productTitle, setProductTitle] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productDescription, setProductDescription] = useState("");
    const [productImage, setProductImage] = useState("");
    let tempSearchValue = "";
    
    let blue = {
        50: '#F0F7FF',
        100: '#C2E0FF',
        200: '#80BFFF',
        300: '#66B2FF',
        400: '#3399FF',
        500: '#007FFF',
        600: '#0072E5',
        700: '#0059B2',
        800: '#004C99',
        900: '#003A75'
      };
      
      const grey = {
        50: '#f6f8fa',
        100: '#eaeef2',
        200: '#d0d7de',
        300: '#afb8c1',
        400: '#8c959f',
        500: '#6e7781',
        600: '#57606a',
        700: '#424a53',
        800: '#32383f',
        900: '#24292f',
      };
      
      const Tab = styled(TabUnstyled)`
        font-family: IBM Plex Sans, sans-serif;
        color: #fff;
        cursor: pointer;
        font-size: 0.875rem;
        font-weight: 600;
        background-color: transparent;
        width: 100%;
        padding: 10px 12px;
        margin: 6px 6px;
        border: none;
        border-radius: 7px;
        display: flex;
        justify-content: center;
      
        &:hover {
          background-color: ${blue[400]};
        }
      
        &:focus {
          color: #fff;
          outline: 3px solid ${blue[200]};
        }
      
        &.${tabUnstyledClasses.selected} {
          background-color: #fff;
          color: ${blue[600]};
        }
      
        &.${buttonUnstyledClasses.disabled} {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `;
      
      const TabPanel = styled(TabPanelUnstyled)(
        ({ theme }) => `
        width: 100%;
        font-family: IBM Plex Sans, sans-serif;
        font-size: 0.875rem;
        padding: 20px 12px;
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        border-radius: 12px;
        opacity: 0.6;
        `,
      );
      
      const TabsList = styled(TabsListUnstyled)(
        ({ theme }) => `
        min-width: 400px;
        background-color: ${blue[500]};
        border-radius: 12px;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        align-content: space-between;
        box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
        `,
      );

      const StyledInputElement = styled('input')(
        ({ theme }) => `
        width: 320px;
        font-family: IBM Plex Sans, sans-serif;
        font-size: 0.875rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 12px;
        border-radius: 12px;
        color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
        background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
        border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
        box-shadow: 0px 4px 30px ${theme.palette.mode === 'dark' ? grey[900] : grey[200]};
      
        &:hover {
          border-color: ${blue[400]};
        }
      
        &:focus {
          border-color: ${blue[400]};
          outline: 3px solid ${theme.palette.mode === 'dark' ? blue[500] : blue[200]};
        }
      `,
      );

    useEffect(() => {
        const finalUrl = `api/user/adminScreen/authenticateAdmin`;
           
        const response = fetch(finalUrl, {
            method: 'GET',
            headers : {'Content-Type':'application/json',
                  'Access-Control-Allow-Origin':'*',
                  'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'},
  
          });
          response.then((response) => response.json())
          .then((data) => {
            })
        .catch((error) => {
            alert("something went wrong...");
            navigate('/home', {replace:true});
            });
  
  }, []);

useEffect(() => {
    
    const url = `api/products`;
       
    const response = fetch(url, {
        method: 'GET',
        headers : {'Content-Type':'application/json',
              'Access-Control-Allow-Origin':'*',
              'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'},
      });
      response.then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
        })
    .catch((error) => {
        alert(error);
        });

}, []);


useEffect(() => {
    
    const url = `api/user/adminScreen/userActivities`;

        const response = fetch(url, {
            method: 'GET',
            headers : {'Content-Type':'application/json',
                  'Access-Control-Allow-Origin':'*',
                  'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'},
          //body: JSON.stringify({token: localStorage.getItem('auth')})
  
          });
          response.then((response) => response.json())
          .then((data) => {
            
                setUsersActivities(data);
                setFinalUserActivities(data);
            })
        .catch((error) => {
            alert(error)
            alert("something went wrong...");
            });

}, []);

const handleCategoryChange = (event) => {
  setFocus(1);
    setProductCategory(event.target.value);
}

const handleNameChange = (event) => {
  setFocus(2);
    setProductTitle(event.target.value);
}

const handlePriceChange = (event) => {
  setFocus(4);
    setProductPrice(event.target.value);
}
const handleImageChange = (event) => {
  setFocus(5);
    setProductImage(event.target.value);
}

const handleDescriptionChange = (event) => {
  setFocus(3);
    setProductDescription(event.target.value);
}

    const onAddClick = ()=> {
        
        if(!productTitle || !productCategory || !productPrice) {
            alert("Please fill all the required fields")
            return;
        }
        const url = `api/user/adminScreen/addProduct`;
        const product = {productTitle: productTitle, productCategory: productCategory, productImage: productImage, productPrice: productPrice, productDescription: productDescription}; 
        const response = fetch(url, {
            method: 'POST',
            headers : {'Content-Type':'application/json',
                  'Access-Control-Allow-Origin':'*',
                  'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'},
          body: JSON.stringify({token: localStorage.getItem('auth'), ...product}) 
  
          });
          response.then((response) => response.json())
          .then((data) => {
              if(!data){
                navigate('/home', {replace:true});
              }
              else{
                alert("Product was added successfully!");
              }
            })
        .catch((error) => {
            alert("invalid category!");
            });
    };

    if(!allProducts || !usersActivities || !finalUserActivities) {
        alert("Loading... press to continue");
        return;
      }

    const onDeleteClick = (id, category)=> {
        const url = `api/user/adminScreen/removeProduct`;

        const response = fetch(url, {
            method: 'POST',
            headers : {'Content-Type':'application/json',
                  'Access-Control-Allow-Origin':'*',
                  'Access-Control-Allow-Methods':'POST,PATCH,OPTIONS'},
          body: JSON.stringify({token: localStorage.getItem('auth'), productId: id, categoryName: category}) 
  
          });
          response.then((response) => response.json())
          .then((data) => {
              if(!data){
                navigate('/home', {replace:true});
              }
              else{
                alert("Product was deleted successfully!");
              }
            })
        .catch((error) => {
            alert(error);
            });
    };


    
    const addProductForm = 
            <div style={styles.Form}>
                <label >Product category *<br/>
                <input style={styles.Input} type="text"  value={productCategory} onChange={handleCategoryChange}  autoFocus={isFocus == 1? "autoFocus": false}/>
                </label><br/><br/>
                <label >Product name *<br/>
                <input style={styles.Input} type="text" value={productTitle} onChange={handleNameChange}  autoFocus={isFocus == 2? "autoFocus": false}/>
                </label><br/><br/>
                <label >product description<br/>
                <input style={styles.Input} type="text"  value={productDescription} onChange={handleDescriptionChange} autoFocus={isFocus == 3? "autoFocus": false}/>
                </label><br/><br/>
                <label >Product price *<br/>
                <input style={styles.Input} type="text"  value={productPrice} onChange={handlePriceChange} autoFocus={isFocus == 4? "autoFocus": false}/>
                </label><br/><br/>
                <label >product image<br/>
                <input style={styles.Input} type="text"  value={productImage} onChange={handleImageChange} autoFocus={isFocus == 5? "autoFocus": false}/>
                </label><br/><br/>
                <button style={{cursor:"pointer"}} onClick={onAddClick}>Add</button>
            </div>  
             

    const deleteProduct =  <ImageList sx={{  height: 600, marginLeft:"200px"}} cols={3} rowHeight={160}  gap={100}>

    {allProducts.map((product) => (
      
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
              onClick={() => onDeleteClick(product._id, product.category)}
            >
               
              <DeleteForeverIcon />
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
        setFinalUserActivities(usersActivities);
    }
    else {
        let list = [];
        for(const activity of usersActivities) {
            if(activity.email.startsWith(searchValue)) {
                list.push(activity);
            }
        }

        setFinalUserActivities(list);
    }
}

const showUsersActivity =
<div style={styles.Activities}>
    <input  type="search" placeholder="Search" value={searchValue} onChange={onSearch} autoFocus="autoFocus"></input>
   {finalUserActivities.map((activity) => (
<ListItem  component="div" >
      <ListItemButton>
        <ListItemText primary={`email: ${activity.email}, date: ${activity.date}, activity: ${activity.activity}, event: ${activity.event}`} />
      </ListItemButton>
    </ListItem>
    ))}
    </div>


    

    return (
      <>
      <NavigationComponent />
        <TabsUnstyled defaultValue={0}>
      <TabsList >
        <Tab>Add product</Tab>
        <Tab>Remove product</Tab>
        <Tab>Show users activities</Tab>
      </TabsList>
      <TabPanel value={0}>{addProductForm}</TabPanel>
      <TabPanel value={1}>{deleteProduct}</TabPanel>
      <TabPanel value={2}>{showUsersActivity}</TabPanel>
    </TabsUnstyled>
    </>
    );
}