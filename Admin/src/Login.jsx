import React, { useState } from 'react'
import { IoCloseCircle } from "react-icons/io5";
import { redirect, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { userDetails } from './APIContext/UserContextProvider';


function Login({ setIsLogedIn }) {




    const [isSignUp, setIsSignUp] = useState(false)
    const navigate = useNavigate()
    const [cookies, setCookies] = useCookies([])

    const [Name, setName] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')  


    const [loginUserName, setLoginUserName] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    const {accessData , loadLocalStorgeData}= userDetails()

    const closePopUp = () => {
        setIsLogedIn(prev => !prev)
        setIsSignUp(false)
    }

    const openSignUpForm = (e) => {
        e.preventDefault()

        if (isSignUp === false) {
            setIsSignUp(prev => !prev)
        } else {
            if(password !== confirmPassword){
                alert('password not match')
                return
            }
            axios.post('http://localhost:8000/api/v1/users/register', {
                name: Name,
                username: username, 
                email: email, 
                password: password
            }).then(res => {
                if(res.data.success){
                    setCookies('accessToken', res.data.data.accessToken, { path: '/' })
                    localStorage.setItem('user', JSON.stringify(res.data.data.user))
                    loadLocalStorgeData()

                    setName('')
                    setUsername('')
                    setEmail('')
                    setPassword('')


                    navigate('/')
                    closePopUp()
                }
            }).catch(err => {
                alert('user all ready exist from this username and email')
            })
        }

    }

    const LoginPage = (e) => {
        e.preventDefault()

        axios.post('http://localhost:8000/api/v1/users/login', {
            username:loginUserName,
            password:loginPassword
        }
        ).then(res=>{
            console.log(res.data.data.accessToken)
            setCookies('accessToken', res.data.data.accessToken, { path: '/' })
            localStorage.setItem("user" , JSON.stringify(res.data.data.user))
            loadLocalStorgeData()
            
            navigate('/')
            closePopUp()
        }).catch(err=>{
            console.log(err.response)
        })

    }

    return (
        <div className={`min-h-[350px]  flex justify-center items-center flex-col rounded-3xl bg-gray-600 text-white w-[450px] h-[300px] p-5 ${isSignUp ? 'h-[480px]' : ''} `}>

            <IoCloseCircle
                onClick={closePopUp}
                className='relative left-45 top-2 w-8 h-8  text-4xl hover:text-blue-700 hover:text-6xl' />

            {isSignUp ? <>
                <form action="" className='w-full h-full flex flex-col gap-2'  >
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="name"
                            className=' font-bold text-[17px]'
                        >Name</label>
                        <input
                            type="text" name='name' id='name' placeholder='Enter your name'
                            onChange={(e) => setName(e.target.value)}
                            className='border-2 px-2 py-1 text-[18px] rounded-lg'
                            
                            />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label htmlFor="id"
                            className=' font-bold text-[17px]'
                        >Username</label>
                        <input
                            type="text" placeholder='username/email' 
                            onChange={(e) => setUsername(e.target.value)}
                            className='border-2 px-2 py-1 text-[18px] rounded-lg'
                            />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label htmlFor="id"
                            className=' font-bold text-[17px]'
                        >Email</label>
                        <input
                            type="text" placeholder='username/email' 
                            onChange={(e) => setEmail(e.target.value)}
                            className='border-2 px-2 py-1 text-[18px] rounded-lg'
                            />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label htmlFor="password"
                            className=' font-bold text-[17px]'
                        >Password</label>
                        <input
                            type="text" name='password' placeholder='password' 
                            onChange={(e) => setPassword(e.target.value)}
                            className='border-2 px-2 py-1 text-[18px] rounded-lg'
                            />
                    </div>

                    <div className='flex flex-col gap-1'>
                        <label htmlFor="password"
                            className=' font-bold text-[17px]'
                        >Confirm Password</label>
                        <input
                        onChange={(e) => setConfirmPassword(e.target.value)}
                            type="text" name='cnf password' placeholder='enter your password again'
                            className='border-2 px-2 py-1 text-[18px] rounded-lg'
                        
                         />
                    </div>

                </form>

                {/*  login form */}

            </> :

                <form action="" className='flex flex-col gap-3 justify-between  w-full h-full'  >

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="name"
                            className='font-bold text-[18px]'
                        >
                            Username
                        </label>
                        <input type="text" name='username' placeholder='UserName'
                        onChange={(e)=>setLoginUserName(e.target.value)}
                            className='border-2 text-[18px] py-2 px-4 rounded-[5px] bg-white text-black font-bold '
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <label htmlFor="password"
                            className='font-bold text-[18px]'
                        >
                            Password
                        </label>
                        <input 
                        type='password' name="password" id="password" placeholder='Password'
                        onChange={(e)=>setLoginPassword(e.target.value)}
                            className='border-2 text-[18px] py-2 px-4 rounded-[5px] bg-white text-black font-bold '
                        ></input>
                    </div>



                    <button
                        onClick={LoginPage}
                        className='border-2 py-2 rounded-2xl font-bold  bg-gray-900 border-black hover:white hover:text-black hover:bg-gray-600'
                    >Login</button>
                </form>

            }
            <button
                onClick={openSignUpForm}
                className='border-2 py-2 rounded-2xl font-bold  bg-gray-900 border-black hover:white hover:text-black hover:bg-gray-600 w-full mt-1'
            >
                signUp
            </button>
        </div>
    )
}

export default Login