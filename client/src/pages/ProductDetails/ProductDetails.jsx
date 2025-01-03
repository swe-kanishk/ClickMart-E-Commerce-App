import { Breadcrumbs } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import ProductZoom from '../../components/ProductZoom'

function ProductDetails() {
  return (
    <>
    <div className='py-5'>
       <div className="container">
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            className="link transition"
            color="inherit"
            href="/"
          >
            Home
          </Link>
          <Link
            underline="hover"
            color="inherit"
            href="/"
            className="link transition"
          >
            Fashion
          </Link>
        </Breadcrumbs>
      </div>
    </div>
    <section className='py-5'>
    <div className="container flex gap-4">
            <div className="productZoomContainer w-[40%] overflow-hidden">
                <ProductZoom />
            </div>
      </div>
    </section>
    </>
  )
}

export default ProductDetails
