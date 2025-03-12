import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Blog from './Blog'
import HomeCenter from './HomeCenter'
import Contect from './Contect'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />}>
              <Route path='' element={<HomeCenter />} />
              <Route path='/blog' element={<Blog />} />
              <Route path='/contact' element={<Contect />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
