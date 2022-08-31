// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Axios from "axios";
// import { listProducts } from "../actions/productActions";
// import { useHistory } from "react-router-dom";
//
// export function ShoppingCartComponent(props) {
//     const dispatch = useDispatch();
//     const productList = useSelector((state) => state.productList);
//     const { products } = productList;
//     const history = useHistory();
//
//     useEffect(() => {
//         dispatch(listProducts());
//     }, [dispatch]);
//
//     const [cartItems, setCartItems] = useState([]);
//     const refreshUserCart = async () => {
//         try {
//             const res = await Axios.get("/cart");
//             const { cartItems } = res.data;
//
//             setCartItems(
//                 Object.entries(cartItems).map(([productId, qty]) => {
//                     let product = {};
//                     for (const iter of products) {
//                         if (iter._id === productId) {
//                             product = iter;
//                             break;
//                         }
//                     }
//                     return {
//                         productId: productId,
//                         image: product.image,
//                         title: product.name,
//                         qty: qty,
//                         price: product.price,
//                     };
//                 })
//             );
//         } catch (e) {
//             setCartItems([]);
//         }
//     };
//
//     const onAddToCartClick = async (productId, qty) => {
//         if (productId) {
//             try {
//                 await Axios.post("/api/addItemToCart", {
//                     productId: productId,
//                     qty: qty,
//                 });
//             } catch (e) {
//                 if (e.response.data.validationError === 'Incorrect password' || e.response.data.validationError === 'No cookie') {
//                     props.history.push("/login");
//                     setCartItems([]);
//                     return;
//                 }
//                 console.log(e.response.data.validationError);
//                 setCartItems([]);
//             }
//         }
//         await refreshUserCart();
//     };
//
//     const removeFromCartHandler = async (productId) => {
//         if (productId) {
//             try {
//                 await Axios.post("/removeItemFromCart", { productId: productId });
//             } catch (e) {
//                 if ((e.response.data.validationError === 'Incorrect password' || e.response.data.validationError === 'No cookie')) {
//                     props.history.push("/login");
//                     return;
//                 }
//                 console.log(e.response.data.validationError);
//                 setCartItems([]);
//             }
//         }
//         await refreshUserCart();
//     };
//
//     useEffect(async () => {
//         if ((products || []).length > 0) {
//             const productId = props.match.params.id;
//             const qty = props.location.search
//                 ? Number(props.location.search.split("=")[1])
//                 : 1;
//             if (productId && qty) {
//                 history.replace("/cart");
//                 await addToCartHandler(productId, qty);
//             } else {
//                 await refreshUserCart();
//             }
//         }
//     }, [products]);
// }