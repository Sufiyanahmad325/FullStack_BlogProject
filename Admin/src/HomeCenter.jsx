import React from 'react'
import { NavLink } from 'react-router-dom'

function HomeCenter() {
  return (
    <>
      <div className=' relative flex justify-between  bg-gray-900 pt-[72px]'>
        {/* left side */}
        <div className='w-[50vw] flex flex-col justify-center '>

          <h2 className='lg:text-5xl text-white pl-5 font-bold lg:pt-10 lg:pb-18  md:text-4xl pt-5 pb-10 sm:text-3xl '>
            Hello,welcome here to learn something new everday!!!
          </h2>

          <p className='text-[22px] font-bold mb-4 pl-6 text-white'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus qui sapiente facere neque atque eius beatae ab perferendis sed. Mollitia dignissimos numquam vero sapiente ab laborum vitae <b className='text-[23px] text-blue-600 '>corrupti tempore aliquam illo incidunt dicta.</b></p>

          <div className='flex gap-2 pt-4 pl-6 lg:pt-10'>
           

            <NavLink to='/blog'
              className='border-2 py-3 px-4 font-bold border-black  text-blue-600 rounded-md hover:bg-blue-600 hover:text-white bg-white  '
            >
              Show Blog
            </NavLink>
          </div>


        </div>

        {/* right side */}

        <div className='w-[50vw]  flex justify-center items-center h-[80vh]'>
          <img src="https://images.pexels.com/photos/9878735/pexels-photo-9878735.jpeg?auto=compress&cs=tinysrgb&w=400" alt="img" />
        </div>


      </div>
    </>
  )
}

export default HomeCenter