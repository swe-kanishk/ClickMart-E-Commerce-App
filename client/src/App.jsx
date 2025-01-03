import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import ProductList from './pages/ProductListing/ProductList'
import Footer from './pages/Home/Footer'
import ProductDetails from './pages/ProductDetails/ProductDetails'

function App() {

  return (
    <>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/productListing'} element={<ProductList />} />
        <Route path={'/productDetails/:id'} element={<ProductDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  )
}

export default App
