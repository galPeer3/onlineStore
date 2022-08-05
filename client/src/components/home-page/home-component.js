import { useEffect, useState } from "react";

export function HomeComponent(props) {

    const {userData} = props;
    const {homeData, setHomeData} = useState([])
    useEffect ( async () => {
        const url = '/home';

        const response = await fetch(url, {
            method: 'POST',
          });

          response.then((response) => response.json())
          .then((data) => {
            setHomeData(data);
            })
        .catch((error) => {
            alert(error);
            });
    },[]);

    return (
        //need to map list of data and show the products
    );
}