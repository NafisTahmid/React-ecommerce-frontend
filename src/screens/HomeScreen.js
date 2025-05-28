import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom';
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { listProducts } from '../actions/productActions'

function HomeScreen() {
    const dispatch = useDispatch()
    const location = useLocation()
    const productList = useSelector(state => state.productList)
    const { error, loading, products, page, pages } = productList

    const keyword = location.search;
    // console.log(keyword);
    // console.log(keyword.split('keyword=')[1].split('&')[0]);

    useEffect(() => {
        dispatch(listProducts(keyword))
    }, [dispatch, keyword])

    return (
        <div>
            <h1 className="py-3">Latest Products</h1>
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <>
                    <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    <Paginate 
                        page={page} 
                        pages={pages} 
                        keyword={keyword.includes('keyword') 
                            ? keyword.split('keyword=')[1].split('&')[0] 
                            : ''} 
                    />
                </>
            )}
        </div>
    )
}

export default HomeScreen