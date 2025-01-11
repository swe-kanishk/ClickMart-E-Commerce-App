import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Dashboard from './Pages/Dashboard'
import Header from './Components/Header'

function App() {

  const router = createBrowserRouter([
    {path: '/', exact: true, element: (
      <section className='main'>
        <Header />
        {/* <Dashboard /> */}
      </section>
  )}
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
