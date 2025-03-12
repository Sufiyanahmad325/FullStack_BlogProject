import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

function Header() {


  

  

  return (
    <>
      <div className='w-full h-[72px] bg-gray-500 flex items-center fixed z-10'>
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
                  to={'/blog'}>Blogs</NavLink>
              </li>

              <li className='font-bold text-[20px]'>
                <NavLink
                  className={({ isActive }) => `text-[20px] py-1 px-4 rounded-[5px] text-black font-bold ${isActive ? 'text-white' : 'text-black'}`}
                  to={'/contact'}>ContactUs</NavLink>
              </li>
            </ul>
          </div>
          <div>

          </div>
        </nav>
      </div>
    </>
  )
}

export default Header
