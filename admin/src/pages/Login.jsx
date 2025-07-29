import React, { useContext, useState } from 'react'

import {assets} from '../assets/assets'
import {AdminContext} from '../context/AdminContext'

import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'




const Login = () => {

    const [state, setState] = useState('Admin')

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {setAToken, backendUrl} = useContext(AdminContext)
    const {setDToken} = useContext(DoctorContext)

    const onSubmitHandler = async(event) => {

        event.preventDefault()
        
        try {
            
            if (state === 'Admin') {
                
                const {data} = await axios.post(backendUrl + '/api/admin/login', {email, password})
                if (data.success) {
                    localStorage.setItem('aToken', data.token)
                    setAToken(data.token);
                    
                } else {
                    toast.error(data.message)
                }

            } else {
                const {data} = await axios.post(backendUrl + '/api/doctor/login', {email, password})
                if (data.success) {
                    localStorage.setItem('dToken', data.token)
                    setDToken(data.token);
                    console.log(data.token);
                    
                    
                } else {
                    toast.error(data.message)
                }
            }

        } catch (error) {
            
        }
    }


  return (
    <form onSubmit={onSubmitHandler} className='h-80 w-30 flex item-center' style={{marginLeft:450, marginTop:100}}>
        <div className='flex flex-col gap-3 m-auto p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
            <p style={{marginLeft:100, marginTop:40}} className='text-2xl font-semibold m-auto'><span className='text-[#5F6FFF]'> {state} </span> Login</p>
            <div style={{marginLeft:30, marginTop:5}} className='w-80'>
                <p>Email</p>
                <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-80 p-2 mt-1 h-8' type="email" required />

            </div>

            <div style={{marginLeft:30, marginTop:5}} className='w-80'>
                <p>Password</p>
                <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-80 h-8 p-2 mt-1' type="password" required />

            </div>

            <button style={{marginLeft:30, marginTop:5}} className='bg-[#5F6FFF] text-white w-80 h-8 rounded-md text-base cursor-pointer'>Login</button>

            {
                state === 'Admin'
                ? <p style={{marginLeft:30, marginTop:5}}>Doctor Login? <span  className='text-[#5F6FFF] cursor-pointer underline' onClick={() => setState('Doctor')}>Click Here</span> </p>
                : <p style={{marginLeft:30, marginTop:5}}> Admin Login? <span style={{marginLeft:30, marginTop:5}} className='text-[#5F6FFF] cursor-pointer underline' onClick={() => setState('Admin')}>Click Here</span> </p>
            }

        </div>
    </form>
  )
}

export default Login