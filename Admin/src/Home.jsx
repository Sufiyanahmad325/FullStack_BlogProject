import React, { useState } from 'react'
import Header from './Header'
import HomeCenter from './HomeCenter'
import Layout from './Layout'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Login from './Login'

function Home() {

  const [isLogedIn, setIsLogedIn] = useState(false)

  return (
    <div className={`${isLogedIn ? 'flex justify-center h-[100vh]' : ""}`}>
      <div className={`${isLogedIn ? 'fixed -z-10 opacity-50' : 'relative h-[100vh] max-w-[100vw] justify-center items-center'}`}>

        {/*   navigation bar   */}

        <Header setIsLogedIn={setIsLogedIn} isLogedIn={isLogedIn} />

        {/* outlat*/}

        <Outlet />

        {/*    main    */}



        {/* footer */}

        <div className='w-full '>
          <Footer />
        </div>

      </div>


      <div className={`${isLogedIn ? 'my-auto ' : 'hidden'}`} >
        <Login setIsLogedIn={setIsLogedIn} />
      </div>


    </div>
  )
}

export default Home