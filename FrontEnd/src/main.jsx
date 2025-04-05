import { createContext, StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'

import Layout from './Layout.jsx'
import Home from './Components/Home/Home.jsx'
import Login from './Components/Login/Login.jsx'
import Register from './Components/Register/Register.jsx'
import AuctionList from './Components/AuctionList/AuctionList.jsx'
import BidPage from './Components/BidPage/BidPage.jsx'
import CreateAuction from './Components/CreateAuction/createAuction.jsx'

// ✅ Context created here and exported
export const AuthContext = createContext(null)

function Main() {
  const [user, setUser] = useState(null)

  // Load user from localStorage if exists
  useEffect(() => {
    const savedUser = localStorage.getItem('authUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  // Router
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='list' element={<AuctionList />} />
        <Route path='bid/:id' element={<BidPage />} />
        <Route path='create-auction' element={<CreateAuction />} />
      </Route>
    )
  )

  return (
    <StrictMode>
      <AuthContext.Provider value={{ user, setUser }}>
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </StrictMode>
  )
}

createRoot(document.getElementById('root')).render(<Main />)
