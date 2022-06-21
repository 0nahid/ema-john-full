import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const [cart, setCart] = useState([]);
    // pagination
    const [page, setPage] = useState(0)
    const [pageCount, setPageCount] = useState(0);
    const [size, setSize] = useState(10)
    const [products, setProducts] = useState([]);
    useEffect(() => {
        axios.get(`https://fathomless-harbor-03823.herokuapp.com/api/products?page=${page}&size=${size}`)
            .then(data => setProducts(data.data));
    }, [page, size]);

    useEffect(() => {
        axios(`https://fathomless-harbor-03823.herokuapp.com/api/productCount`)
            .then(data => {
                const pages = data.data.count / size;
                setPageCount(Math.ceil(pages));
            });
    }, [size])

    useEffect(() => {
        const storedCart = getStoredCart();
        const savedCart = [];
        for (const id in storedCart) {
            const addedProduct = products.find(product => product._id === id);
            if (addedProduct) {
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }
        }
        setCart(savedCart);
    }, [products])

    const handleAddToCart = (selectedProduct) => {
        // console.log(selectedProduct);
        let newCart = [];
        const exists = cart.find(product => product._id === selectedProduct._id);
        if (!exists) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else {
            const rest = cart.filter(product => product._id !== selectedProduct._id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }

        setCart(newCart);
        addToDb(selectedProduct._id);
    }

    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
                <div className="pagination">
                    {
                        [...Array(pageCount).keys()]
                            .map(number => <button
                                className={number === page ? "selected" : ''}
                                key={number}
                                onClick={() => setPage(number)}
                            >{number+1}</button>)
                    }
                    <select className="page-size-options" onChange={e => setSize(e.target.value)}>
                        <option value="5">5</option>
                        <option selected value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>

                    </select>
                </div>
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/orders">
                        <button>Review Order </button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;