import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

function Contact() {

    const [contactRequestData , setContactRequestData ] = useState([])
    
    useEffect(()=>{
        const accessToken = Cookies.get('accessToken')

         if(!accessToken){
            alert("please Login First")
            return
         }

            const load = ()=>{
                const res = axios.get('http://localhost:8000/api/v1/users/get-contact-request')

            .then(res => {
                setContactRequestData(res.data.data)
                
            })
            .catch(err => {
                console.log(err)
            })
            }

            load()
    },[])

    console.log(contactRequestData)


    return (
        <div className='pt-[72px]  min-h-full h-auto w-full flex flex-col gap-2 justify-center items-center bg-gray-800 pb-2 '>

            {

                contactRequestData?.length>0 ? contactRequestData.map(ele=>(  
                    <div className='w-[500px] max-h-[250px]  bg-gray-200 rounded-lg flex flex-col py-1 px-3 justify-center'>

                    <div>
                        <div className='text-[20px] font-bold text-green-700'>Name :</div>
                        <div className='text-[18px] font-semibold'>{ele.name}</div>
                    </div>
    
                    <div>
                        <div className='text-[20px] font-bold text-green-700'>Email :</div>
                        <div className='text-[18px] font-semibold'>{ele.email}</div>
                    </div>
    
                    <div>
                        <div className='text-[20px] font-bold text-green-700'>Contect Resion :</div>
                        <div className='text-[18px] font-semibold'>{ele.message} </div>
                    </div>
    
                </div>
                )):(
                    <h1 className='text-3xl font-bold'>No Contact Request</h1>
                )
            }





        </div>
    )
}

export default Contact