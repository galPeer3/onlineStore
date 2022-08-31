import { styles } from "./admin-page-component-styles.js";

export function BasicHomeComponent(props) {

    const [screenData, setScreenData] = useState("");
    const [searchData, setSearchData] = useState("");
    const [productTitle, setProductTitle] = useState("");
    const [productCategory, setProductCategory] = useState("");
    const [productImage, setProductImage] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productDescription, setProductDescription] = useState("");

    const onAddProductClick = ()=> {

    };

    const onDeleteProductClick = ()=> {

    };

    const onShowUsersActivity = ()=> {

    };

    return (
        <div style={styles.Container}></div>
    );
}