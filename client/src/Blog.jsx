import React, { useEffect, useState } from 'react'
import axios from 'axios'




function Blog() {

  


//   const accessToken = Cookies.get('accessToken')


//   const { accessData, loadLocalStorgeData } = userDetails()

const [accessData, setAccessData] = useState(localStorage.getItem('blogs') ? JSON.parse(localStorage.getItem('blogs')) : [])



   useEffect(() => {
    axios.get('http://localhost:8000/api/v1/users/get-all-blogs')
    .then((res) => {
        setAccessData(res.data.data)
        localStorage.setItem('blogs', JSON.stringify(res.data.data))
    })
    .catch
    ((err) => {
        console.log(err.response.data)
    })
    }, [])





 

  return (
    <div className='max-w-screen min-h-full pt-[76px] '>

      {/* blog list */}
      <div className="flex flex-col gap-4 px-4 mb-2">
        { accessData?.length > 0 ? (
          accessData.map((item, index) => (

            <div key={index} className="flex w-full justify-between min-h-[170px] bg-gray-800 items-center  p-4 rounded-lg shadow-md">

              <div className=" w-4/7 flex flex-col gap-2 ">

                <div className=" font-bold text-green-700 text-[26px] px-4 overflow-y-auto break-words">
                  {item.title}
                </div>
                <p className="font-bold flex flex-col text-white text-[18px] px-4 overflow-y-auto break-words">
                  {item.blog}
                </p>

              </div>

              <div className="flex  items-center justify-around  min-w-3/7  ">
                <img className="max-h-[260px] w-[200px] py-2 rounded-md object-cover "  src={item.avatar} alt="Blog" />
                
                
              </div>

            </div>
          ))
        ) : (
          <p className="text-black text-3xl text-center"> 'No blogs available</p>
        )

        }
      </div>
    </div>
  )
}

export default Blog
