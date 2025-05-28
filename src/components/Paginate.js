// components/Paginate.js
import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function Paginate({ page, pages, keyword = '', isAdmin = false }) {
    if (pages <= 1) return null

    return (
        <Pagination className="justify-content-center mt-4">
            {[...Array(pages).keys()].map((x) => (
                <LinkContainer
                    key={x + 1}
                    to={{
                        pathname: isAdmin ? '/admin/productList/' : '/',
                        search: keyword 
                            ? `?keyword=${keyword}&page=${x + 1}` 
                            : `?page=${x + 1}`
                    }}
                >
                    <Pagination.Item active={x + 1 === page}>
                        {x + 1}
                    </Pagination.Item>
                </LinkContainer>
            ))}
        </Pagination>
    )
}

export default Paginate