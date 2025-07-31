import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {

    const {aToken} = useContext(AdminContext)
    const {dToken} = useContext(DoctorContext)

  return (
    <div className='h-124 w-50 bg-white border-r border-gray-300 ml-10'>
        {
            aToken && <ul className='text-[#515151] mt-5'>

                <NavLink className={({isActive}) => `flex items-center gap-3 h-10 w-50 md:px-9 md:min-72 cursor-pointer  ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#6366F1]' : ''}`} to={'/admin-dashboard'}>
                    <img style={{marginLeft:15}} src={assets.home_icon} alt="" />
                    <p className='hidden md:block'>Dashboard</p>
                </NavLink>

                <NavLink className={({isActive}) => `flex items-center gap-3 h-10 w-47 md:px-9 md:min-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#6366F1]' : ''}`} to={'/all-appointments'}>
                    <img style={{marginLeft:15}} src={assets.appointment_icon} alt="" />
                    <p className='hidden md:block'>Appointments</p>
                </NavLink>

                <NavLink className={({isActive}) => `flex items-center gap-3 h-10 w-47 md:px-9 md:min-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#6366F1]' : ''}`} to={'/add-doctor'}>
                    <img style={{marginLeft:15}} src={assets.add_icon} alt="" />
                    <p className='hidden md:block'>Add Doctor</p>
                </NavLink>

                <NavLink className={({isActive}) => `flex items-center gap-3 h-10 w-47 md:px-9 md:min-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#6366F1]' : ''}`} to={'/doctor-list'}>
                    <img style={{marginLeft:15}} src={assets.people_icon} alt="" />
                    <p className='hidden md:block'>Doctors List</p>
                </NavLink>
                 
            </ul>
        }
            {
            dToken && <ul className='text-[#515151] mt-5'>

                <NavLink className={({isActive}) => `flex items-center gap-3 h-10 w-50 md:px-9 md:min-72 cursor-pointer${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#6366F1]' : ''}`} to={'/doctor-dashboard'}>
                    <img style={{marginLeft:15}} src={assets.home_icon} alt="" />
                    <p className='hidden md:block'>Dashboard</p>
                </NavLink>

                <NavLink className={({isActive}) => `flex items-center gap-3 h-10 w-50 md:px-9 md:min-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#6366F1]' : ''}`} to={'/doctor-appointments'}>
                    <img style={{marginLeft:15}} src={assets.appointment_icon} alt="" />
                    <p className='hidden md:block'>Appointments</p>
                </NavLink>

                <NavLink className={({isActive}) => `flex items-center gap-3 h-10 w-50 md:px-9 md:min-72 cursor-pointer ${isActive ? 'bg-[#F2F3FF] border-r-4 border-[#6366F1]' : ''}`} to={'/doctor-profile'}>
                    <img style={{marginLeft:15}} src={assets.people_icon} alt="" />
                    <p className='hidden md:block'>Profile</p>
                </NavLink>
                 
            </ul>
        }

    </div>

  )
}

export default Sidebar