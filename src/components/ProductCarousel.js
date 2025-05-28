import React, {useEffect} from 'react';
import {Carousel, Image} from "react-bootstrap";
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { listTopProducts } from '../actions/productActions';
import Loader from './Loader';
import Message from './Message';
function ProductCarousel() {
    const dispatch = useDispatch();
    const topProducts = useSelector(state => state.productTop);
    const {loading, error, products} = topProducts;

    useEffect(() => {
        dispatch(listTopProducts());
    },[dispatch])
  return (
    <section>

        {
            loading ? <Loader/>
            : error ? <Message variant="danger">{error}</Message>
            : (
        <Carousel pause="hover" className="bg-dark">
        {
            products.map((product) => (
                    <Carousel.Item key={product._id} >
                <Link to={`/product/${product._id}`}>
                        <Image src={product.image} fluid/>

                        <Carousel.Caption className="carousel.caption">
                            <h4>{product.name} (${product.price})</h4>
                        </Carousel.Caption>
                </Link>
                    </Carousel.Item>
                            ))
                        }
        </Carousel>
            )
        }
    </section>
   
  )
}

export default ProductCarousel