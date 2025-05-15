import React, { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Row, Col, Button } from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, deleteUser } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';
import { listProducts, deleteProductAction, createProduct } from '../actions/productActions';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';

function ProductListScreen() {
  const dispatch = useDispatch();
  const productsList = useSelector(state => state.productList);
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  const { loading, error, products } = productsList;
  const navigate = useNavigate();
  const deleteProduct = useSelector(state => state.productDelete);
  const { loading:loadingDelete, error:errorDelete, success:successDelete } = deleteProduct;
  const createNewProduct = useSelector(state => state.productCreate);
  const {loading:loadingCreate, success:successCreate, error:errorCreate, product } = createNewProduct;


  useEffect(() => {
   if (!userInfo) {
        navigate('/login');
   } else {
        dispatch({
            type: PRODUCT_CREATE_RESET
        })
        dispatch(listProducts());
        if (successCreate) {
            navigate(`/admin/product/${product._id}/edit/`);
        };
        if (successDelete) {
            dispatch(listProducts());
        };
   }
  },[navigate, userInfo, successDelete, successCreate])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
        dispatch(deleteProductAction(id));
        dispatch(listProducts());
    }
  };

  const createProductHandler = (e) => {
    e.preventDefault();
    dispatch(createProduct());

  };

  return (
    <div>
        <Row>
            <Col md={10}>
                <h1>Products</h1>
            </Col>

            <Col md={2}>
                <Button variant="primary" type="submit" className="mt-2" onClick={createProductHandler}><i className="fas fa-plus"></i>Create Product</Button>
            </Col>
        </Row>
        {loadingDelete && <Loader/>}
        {errorDelete && <Message variant="danger">{errorDelete}</Message>}
          {
        loading ? (<Loader/>)
        : error ? (<Message variant="danger">{error}</Message>)
        : (
            <Table striped responsive bordered hover className="table-sm">
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

                    {
                        products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>{product.email}</td>
                                <td>{product.isAdmin ? (
                                    <i className="fas fa-check" style={{color:'green'}}></i>
                                ) : (<i className="fas fa-check" style={{color:"red"}}></i>)}</td>
                                <td>
                                    <LinkContainer to={`/admin/product/${product._id}/edit/`}>
                                        <Button className="btn-sm" variant="light">
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer>
                                        <Button className="btn-sm" variant="danger" onClick={() => deleteHandler(product._id)}>
                                            <i className="fas fa-trash"></i>
                                        </Button>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </Table>
        )
    }
    </div>
  
  )
}

export default ProductListScreen