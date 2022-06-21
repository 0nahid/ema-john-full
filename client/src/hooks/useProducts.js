import { useEffect, useState } from "react"
import axios from "axios";
const useProducts = () =>{
    
    const [products, setProducts] = useState([]);

    useEffect( () =>{
        axios.get(`https://fathomless-harbor-03823.herokuapp.com/api/products`)
        .then(data => setProducts(data.data));
    }, []);

    return [products, setProducts];
}

export default useProducts;