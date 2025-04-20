import React, { useContext } from 'react'
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { IoBagCheck } from "react-icons/io5";
import { MyContext } from "../../App";

function Checkout() {
    const context = useContext(MyContext)
  return (
    <section className='py-10'>
      <div className="container flex gap-5">
        <div className="left-col w-[70%]">
            <div className="card bg-white shadow-md p-5 rounded-md w-full">
                <h1>Billing Details</h1>
                <form className='w-full mt-5'>
                    <div className="flex items-center gap-5 pb-5">
                        <div className="col w-[50%]">
                            <TextField className='w-full' label="Full Name" variant="outlined" size='small' />
                        </div>
                        <div className="col w-[50%]">
                            <TextField className='w-full' label="Country" variant="outlined" size='small' />
                        </div>
                    </div>
                    <h6 className='text-[14px] font-[500] mb-3'>Street address*</h6>
                    <div className="flex items-center gap-5 pb-5">
                        <div className="col w-[100%]">
                            <TextField className='w-full' label="House No. and Street Name" variant="outlined" size='small' />
                        </div>
                    </div>
                    <div className="flex items-center gap-5 pb-5">
                        <div className="col w-[100%]">
                            <TextField className='w-full' label="Apartment, suite, unit, etc. (optional)" variant="outlined" size='small' />
                        </div>
                    </div>
                    <h6 className='text-[14px] font-[500] mb-3'>Town/City*</h6>

                    <div className="flex items-center gap-5 pb-5">
                        <div className="col w-[100%]">
                            <TextField className='w-full' label="City" variant="outlined" size='small' />
                        </div>
                    </div>
                    <h6 className='text-[14px] font-[500] mb-3'>State/Country*</h6>

                    <div className="flex items-center gap-5 pb-5">
                        <div className="col w-[100%]">
                            <TextField className='w-full' label="State" variant="outlined" size='small' />
                        </div>
                    </div>
                    <h6 className='text-[14px] font-[500] mb-3'>Postcode/ZIP*</h6>

                    <div className="flex items-center gap-5 pb-5">
                        <div className="col w-[100%]">
                            <TextField className='w-full' label="ZIP Code" variant="outlined" size='small' />
                        </div>
                    </div>
                    <div className="flex items-center gap-5 pb-5">
                        <div className="col w-[50%]">
                            <TextField className='w-full' label="Phone Number" variant="outlined" size='small' />
                        </div>
                        <div className="col w-[50%]">
                            <TextField className='w-full' type='email' label="Email Address" variant="outlined" size='small' />
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div className="right-col w-[30%]">
        <div className="card bg-white shadow-md p-5 rounded-md w-full">
                <h2 className='mb-3'>Your Order</h2>
                <div className="flex items-center justify-between border-b py-3 pr-2 border-t">
                    <span className='text-[14px] font-[500]'>Product</span>
                    <span className='text-[14px] font-[500]'>Subtotal</span>
                </div>
                <div className="scroll max-h-[250px] mb-4 overflow-x-hidden overflow-y-scroll pr-2">
                <div className="flex items-start justify-between py-3">
                    <div className="product justify-between flex items-start gap-3">
                        <div className="product-img w-[50px] h-[50px] object-cover rounded-md group object-center overflow-hidden cursor-pointer">
                            <img src="https://www.shutterstock.com/image-photo/young-fashion-model-stylish-beige-600nw-2382157791.jpg" className='w-full transition-all group-hover:scale-110' alt="" />
                        </div>
                        <div className="product-info">
                            <h4 className='text-[14px]'>A Plane Blazer gra...</h4>
                            <span className='text-[13px]'>Qty: 1</span>
                        </div>
                    </div>
                        <span className='text-[14px] font-[500]'>$79.00</span>
                </div>
                <div className="flex items-start justify-between py-3">
                    <div className="product justify-between flex items-start gap-3">
                        <div className="product-img w-[50px] h-[50px] object-cover rounded-md group object-center overflow-hidden cursor-pointer">
                            <img src="https://www.shutterstock.com/image-photo/young-fashion-model-stylish-beige-600nw-2382157791.jpg" className='w-full transition-all group-hover:scale-110' alt="" />
                        </div>
                        <div className="product-info">
                            <h4 className='text-[14px]'>A Plane Blazer gra...</h4>
                            <span className='text-[13px]'>Qty: 1</span>
                        </div>
                    </div>
                        <span className='text-[14px] font-[500]'>$79.00</span>
                </div>
                <div className="flex items-start justify-between py-3">
                    <div className="product justify-between flex items-start gap-3">
                        <div className="product-img w-[50px] h-[50px] object-cover rounded-md group object-center overflow-hidden cursor-pointer">
                            <img src="https://www.shutterstock.com/image-photo/young-fashion-model-stylish-beige-600nw-2382157791.jpg" className='w-full transition-all group-hover:scale-110' alt="" />
                        </div>
                        <div className="product-info">
                            <h4 className='text-[14px]'>A Plane Blazer gra...</h4>
                            <span className='text-[13px]'>Qty: 1</span>
                        </div>
                    </div>
                        <span className='text-[14px] font-[500]'>$79.00</span>
                </div>
                <div className="flex items-start justify-between py-3">
                    <div className="product justify-between flex items-start gap-3">
                        <div className="product-img w-[50px] h-[50px] object-cover rounded-md group object-center overflow-hidden cursor-pointer">
                            <img src="https://www.shutterstock.com/image-photo/young-fashion-model-stylish-beige-600nw-2382157791.jpg" className='w-full transition-all group-hover:scale-110' alt="" />
                        </div>
                        <div className="product-info">
                            <h4 className='text-[14px]'>A Plane Blazer gra...</h4>
                            <span className='text-[13px]'>Qty: 1</span>
                        </div>
                    </div>
                        <span className='text-[14px] font-[500]'>$79.00</span>
                </div>
                </div>
                <Button className='!bg-red-500 !text-white !w-full gap-2 !flex !items-center hover:!bg-black !capitalize'><IoBagCheck size={'18px'} /> Checkout</Button>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Checkout
