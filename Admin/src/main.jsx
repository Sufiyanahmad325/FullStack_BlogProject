import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import Home from './Home.jsx'
import Blog from './Blog.jsx'
import HomeCenter from './HomeCenter.jsx'
import Contact from './Contact.jsx'
import Login from './Login.jsx'
import { UserContextProvider } from './APIContext/UserContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} >
          <Route path='' element={<HomeCenter />} />
          <Route path='/blog' element={<Blog />} />
          <Route path='/contact' element={<Contact />} />
        </Route>
      </Routes>
    </BrowserRouter>
      </UserContextProvider>
  </StrictMode>,
)
