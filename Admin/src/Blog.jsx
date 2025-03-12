import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { userDetails } from './APIContext/UserContextProvider'
import { RiDeleteBin6Fill } from "react-icons/ri";




function Blog() {

  const [isOpenWriteBlog, setIsOpenWriteBlog] = useState(false)

  const [title, setTitle] = useState('')
  const [blog, setBlog] = useState('')

  const [selectedFile, setSelectedFile] = useState(null);


  const accessToken = Cookies.get('accessToken')


  const { accessData, loadLocalStorgeData } = userDetails()



  console.log("this is your blogs data ", accessData.blogs)





  const uploadNewBlog = () => {

    if (!accessToken) {
      alert('Please Login First')
      return
    }

    if (!title.trim() || !blog.trim() || !selectedFile) {
      alert('Please Fill All Fields')
      return
    }

    console.log(selectedFile)
    const formData = new FormData();
    formData.append('title', title);
    formData.append('blog', blog);
    formData.append('avatar', selectedFile);  // selectedFile should be stored in state


    const res = axios.post('http://localhost:8000/api/v1/users/uploadBlog', formData, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
      console.log(res.data)
      if (res.data.success) {
        console.log("this response data => ", accessData.blogs)
        localStorage.setItem("user", JSON.stringify(res.data.data))
        document.querySelector('input[type="file"]').value = null // Clear file input value
        loadLocalStorgeData()
        setTitle('')
        setBlog('')
        setSelectedFile(null)

      }
    })
      .catch(err => console.log(err))
  }


  const deleteBlog = (Blogid) => {
    axios.post('http://localhost:8000/api/v1/users/delete-blog', { deleteId:Blogid }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    }).then(res => {
      console.log(res.data)
      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.data)) // Update local storage
        loadLocalStorgeData()
      }
    }).catch(err => console.log(err))
  }


  const openClose = () => {
    setIsOpenWriteBlog(prev => !prev)
  }

  return (
    <div className='max-w-screen min-h-full pt-[76px] '>

      {/* button option */}

      <div className="bg-white shadow-md p-4 flex justify-between mx-4 mb-2">

        {
          isOpenWriteBlog ?
            <>
              <p className=' font-extrabold text-3xl'>You Can Write Your Blog</p>
            </>
            : <>
              <p className='font-bold text-2xl'>Do You Want Write blog click on this button</p>
            </>
        }

        <button onClick={openClose}
          className="bg-red-700 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition-all"
        >
          Write Blog
        </button>
      </div>



      {/* write blog section   */}

      <div className={`transition-all duration-500 delay-100 overflow-hidden ease-in-out ${isOpenWriteBlog ? 'max-h-[500px] opacity-100' : 'max-w-0 max-h-0 opacity-0'}`}>

        {
          isOpenWriteBlog && <>

            <div className='rounded-lg mx-4 h-auto flex flex-col items-center gap-2 bg-gray-800 text-white my-2 p-4'>
              <input
                type="text" name='title' placeholder='Enter Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className='border-2 text-[22px] w-[600px] py-2 px-2 rounded-2xl '
              />

              <textarea
                onChange={(e) => setBlog(e.target.value)}
                value={blog}
                className='border-2 text-[22px] w-[600px] py-1 px-3 min-h-[200px] rounded-2xl '
                name="blog" id="" placeholder='Write Blog' >
              </textarea>

              <div className='flex gap-3 w-[600px]'>
                <button
                  onClick={() => uploadNewBlog()}
                  className='border-2 py-1 px-3 rounded-2xl bg-red-600 font-bold text-[17px]'
                >Uplode</button>
                <input
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                  className='border-2 py-1 px-3 rounded-2xl bg-red-600 font-bold text-[17px]'
                  type="file" name='avatar' />
              </div>

            </div>
          </>
        }
      </div>



      {/* blog list */}
      <div className="flex flex-col gap-4 px-4 mb-2">
        {accessToken && accessData.blogs?.length > 0 ? (
          accessData.blogs.map((item, index) => (

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
                <button
                onClick={()=>deleteBlog(item.Blogid)}
                >
                <RiDeleteBin6Fill className='text-5xl text-white'></RiDeleteBin6Fill>
                </button>
                
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
