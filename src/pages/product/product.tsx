import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import './product.less'
import ProductHome from './home'
import ProductAddUpdate from './add-updata'
import ProductDetail from './dataul'

export default function Product() {
    return (
        <Routes>
            <Route path='/' element={<ProductHome />} />
            <Route path='/addupdate' element={<ProductAddUpdate />} />
            <Route path='/detaul' element={<ProductDetail />} />
            <Route path="*" element={<Navigate to="/products/product" />} />
        </Routes>
    )
}
