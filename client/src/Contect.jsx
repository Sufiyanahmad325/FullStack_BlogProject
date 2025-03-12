import axios from "axios";
import React, { useState } from "react";

function Contact() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const date = new Date().toLocaleString()

  const data ={
    name:name,
    email:email,
    message:message,
    date:date
  }


  const requestSend = (e) => {
    e.preventDefault()


    const res = axios.post('http://localhost:8000/api/v1/users/contact-request' , data )
    .then((res)=>{
      if(res.data.success){
        alert('Request send successfully')
        setName('')
        setEmail('')  
        setMessage('')
      }
    }).catch((error)=>{
      console.log(error.response)
    })
  }


  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg pt-[72px] ">
      <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
      <form className="flex flex-col space-y-4">
        <input
        value={name}
        onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Your Name"
          className="border p-2 rounded-md"
        />
        <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Your Email"
          className="border p-2 rounded-md"
        />
        <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
          placeholder="Your Message"
          className="border p-2 rounded-md h-32 max-h-[300px]"
        ></textarea>
        <button 
        onClick={(e) => requestSend(e)}
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;
