import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const { backendUrl, token, setToken } = useContext(AppContext)
  const navigate = useNavigate()

  const [state, setState] = useState('Sign Up')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()

    try {
      
      if (state === 'Sign Up') {
        const {data} = await axios.post(backendUrl + '/api/user/register', {name, password, email})

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      }

      else {
        const {data} = await axios.post(backendUrl + '/api/user/login', {password, email})

        if (data.success) {
          localStorage.setItem('token', data.token)
          setToken(data.token)
        } else {
          toast.error(data.message)
        }
      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex item-center' style={{marginLeft:450, marginTop:40}}>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p style={{marginLeft:40, marginTop:30}} className='text-2xl font-semibold'>{state === 'Sign Up' ? "Create Account" : "Login"}</p>
        <p style={{marginLeft:40, marginTop:1}}>Please {state === 'Sign Up' ? "sign up" : "log in"} to book appointment</p>
        {
          state === "Sign Up" && <div style={{marginLeft:40, marginTop:1}} className='w-full'>
                                      <p>Full Name</p>
                                      <input className='border border-zinc-300 rounded w-80 h-10 p-2 mt-1' type="text" onChange={(e) => setName(e.target.value)} value={name} required/>
                                    </div>
        }

        <div className='w-full' style={{marginLeft:40, marginTop:1}}>
          <p>Email</p>
          <input className='border border-zinc-300 rounded w-80 h-10 p-2 mt-1' type="email" onChange={(e) => setEmail(e.target.value)} value={email} required/>
        </div>

        <div className='w-full' style={{marginLeft:40, marginTop:1}}>
          <p>Password</p>
          <input className='border border-zinc-300 rounded w-80 h-10 p-2 mt-1' type="password" onChange={(e) => setPassword(e.target.value)} value={password} required/>
        </div>

        <button type='submit' style={{marginLeft:40, marginTop:1}} className='bg-[#6366F1] text-white w-80 h-10 py-2 rounded-md text-base'>{state === 'Sign Up' ? "Create Account" : "Login"}</button>

        {
          state === "Sign Up" ? 
          <p style={{marginLeft:40, marginTop:1}}>Already have an account? <span onClick={() => setState('Login')} className='text-[#6366F1] underline cursor-pointer' >Login here</span></p>
          : <p style={{marginLeft:40, marginTop:1}}>Create a new account? <span onClick={() => setState('Sign Up')} className='text-[#6366F1] underline cursor-pointer' >Click here</span> </p>
        }

      </div>
    </form>
  )
}

export default Login