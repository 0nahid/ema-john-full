import axios from "axios";
import { useEffect, useState } from "react";
const useProducts = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get(`http://35.90.9.79:5500/api/products`)
            .then(data => setProducts(data.data));
    }, []);

    return [products, setProducts];
}

export default useProducts;