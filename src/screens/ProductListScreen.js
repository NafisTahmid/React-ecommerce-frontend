// screens/ProductListScreen.js
import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Row, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { listProducts, deleteProductAction, createProduct } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';

function ProductListScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    
    const productList = useSelector(state => state.productList);
    const { loading, error, products, page, pages } = productList;
    
    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;
    
    const productDelete = useSelector(state => state.productDelete);
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete;
    
    const productCreate = useSelector(state => state.productCreate);
    const { loading: loadingCreate, error: errorCreate, success: successCreate, product } = productCreate;

    const keyword = location.search;

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login');
        } else {
            dispatch({ type: PRODUCT_CREATE_RESET });
            dispatch(listProducts(keyword));
            
            if (successCreate) {
                navigate(`/admin/product/${product._id}/edit`);
            }
        }
    }, [dispatch, navigate, userInfo, successDelete, successCreate, product, keyword]);

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProductAction(id));
        }
    };

    const createProductHandler = () => {
        dispatch(createProduct());
    };

    return (
        <div>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-end">
                    <Button onClick={createProductHandler} className="btn-sm">
                        <i className="fas fa-plus"></i> Create Product
                    </Button>
                </Col>
            </Row>

            {loadingDelete && <Loader />}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant="danger">{errorCreate}</Message>}

            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">{error}</Message>
            ) : (
                <>
                    <Table striped bordered hover responsive className="table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button variant="light" className="btn-sm mx-2">
                                                <i className="fas fa-edit"></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button 
                                            variant="danger" 
                                            className="btn-sm" 
                                            onClick={() => deleteHandler(product._id)}
                                        >
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Paginate 
                        page={page} 
                        pages={pages} 
                        isAdmin={true}
                        keyword={keyword.includes('keyword') 
                            ? keyword.split('keyword=')[1].split('&')[0] 
                            : ''}
                    />
                </>
            )}
        </div>
    );
}

export default ProductListScreen;