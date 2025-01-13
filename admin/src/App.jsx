import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Dashboard from './Pages/Dashboard'
import Header from './Components/Header'
import Sidebar from './Components/Sidebar'

function App() {

  const router = createBrowserRouter([
    {path: '/', exact: true, element: (
      <section className='main'>
        <Header />
        <div className="mainContent flex">
          <div className="sidebarWrapper w-[200px]">
            <Sidebar />
          </div>
        </div>
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
