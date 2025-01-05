import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import ProductList from './pages/ProductListing/ProductList'
import Footer from './pages/Home/Footer'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import { createContext, useState } from 'react'

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ProductZoom from './components/ProductZoom'

import { IoMdClose } from "react-icons/io";
import ProductDetailsContent from './components/ProductDetailsContent'

const MyContext = createContext();

function App() {
  const [openProductDetailsModal, setOpenProductDetailsModal] = useState(false);

  const handleCloseProductDetailsModal = () => {
    setOpenProductDetailsModal(false);
  };

  const store = {
    setOpenProductDetailsModal
  }

  return (
    <>
    <BrowserRouter>
    <MyContext.Provider value={store}>
      <Header />
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/productListing'} element={<ProductList />} />
        <Route path={'/productDetails/:id'} element={<ProductDetails />} />
      </Routes>
      <Footer />
      </MyContext.Provider>
    </BrowserRouter>

    <Dialog
        open={openProductDetailsModal}
        maxWidth={'lg'}
        onClose={handleCloseProductDetailsModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className='productDetailsModal'
        fullWidth={true}
      >
        <DialogContent>
          <div className="flex items-center gap-12 justify-between w-full relative">
            <IoMdClose size={'22px'} onClick={handleCloseProductDetailsModal} className='top-1 absolute right-1 z-50 cursor-pointer' />
            <div className="col-1 w-[40%]">
              <ProductZoom />
            </div>
            <div className="col-2 w-[60%] flex-1">
              <ProductDetailsContent />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default App
export {MyContext}