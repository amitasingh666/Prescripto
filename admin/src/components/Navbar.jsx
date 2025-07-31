import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import {useNavigate} from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {

    const {aToken, setAToken} = useContext(AdminContext)
    const {dToken, setDToken} = useContext(DoctorContext)

    const navigate = useNavigate()

    const logout = () => {
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')

        dToken && setDToken('')
        dToken && localStorage.removeItem('dToken')
    }

  return (
    <div className='flex justify-between items-center h-15 sm:px-10 w-319 border-b border-gray-300 mb-6 bg-white'>
        <div className='flex item-center gap-2 text-xs' style={{marginLeft:25}}>
            <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
            <p style={{marginTop:10}} className='border h-6 w-20 flex items-center justify-center rounded-full border-gray-500 text-gray-600 text-sm'>{aToken ? 'Admin' : 'Doctor'}</p>
        </div>
        <button onClick={logout} style={{marginRight:25}} className='bg-[#6366F1] text-white text-sm h-10 w-30 rounded-full cursor-pointer'>Logout</button>
    </div>
  )
}

export default Navbar