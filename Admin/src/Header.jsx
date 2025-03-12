import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'

function Header({ setIsLogedIn, isLogedIn }) {


  

  const accessToken = Cookies.get('accessToken') 

  console.log('this is your accessToken => ', accessToken)

  function popUP() {
    setIsLogedIn(prev => !prev)
    console.log(isLogedIn)
  }

  const logout = () => {
    console.log( "hahhahaahha => ",document.cookie)
    axios.get('http://localhost:8000/api/v1/users/logout', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(res => {
      console.log(res.data)
      if (res.data.success) {
        Cookies.remove('accessToken')
        setIsLogedIn(false)  // Update state to reflect that the user is logged out
        window.location.reload()
      }
    }).catch(err => {
      alert('something went wrong please check email and password')
    })
  }

  return (
    <>
      <div className='w-full h-[72px] bg-gray-600 flex items-center fixed z-10'>
        <nav className='w-full pl-4 flex justify-between'>
          <div>
            <ul className='flex gap-10'>
              <b className='font-bold text-2xl'>Blog Logo</b>

              <li className='font-bold text-[20px]'>
                <NavLink
                  className={({ isActive }) => `text-[20px] py-1 px-4 rounded-[5px] text-black font-bold ${isActive ? 'text-white' : 'text-black'}`}
                  to={'/'}>Home</NavLink>
              </li>

              <li className='font-bold text-[20px]'>
                <NavLink
                  className={({ isActive }) => `text-[20px] py-1 px-4 rounded-[5px] text-black font-bold ${isActive ? 'text-white' : 'text-black'}`}
                  to={'/blog'}>Write-Blogs</NavLink>
              </li>

              <li className='font-bold text-[20px]'>
                <NavLink
                  className={({ isActive }) => `text-[20px] py-1 px-4 rounded-[5px] text-black font-bold ${isActive ? 'text-white' : 'text-black'}`}
                  to={'/contact'}>Contact-Request</NavLink>
              </li>
            </ul>
          </div>
          <div>
            <ul>
              {accessToken ? (
                <li
                  onClick={logout}
                  className="text-[20px] py-1 px-4 rounded-[5px] text-black font-bold cursor-pointer"
                >
                  Logout
                </li>
              ) : (
                <li
                  onClick={popUP}
                  className="text-[20px] py-1 px-4 rounded-[5px] text-black font-bold cursor-pointer"
                >
                  Login
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </>
  )
}

export default Header
