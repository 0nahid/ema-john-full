import { useEffect, useState } from "react"
import axios from "axios";
const useProducts = () =>{
    
    const [products, setProducts] = useState([]);

    useEffect( () =>{
        axios.get(`http://localhost:5500/api/products`)
        .then(data => setProducts(data.data));
    }, []);

    return [products, setProducts];
}

export default useProducts;