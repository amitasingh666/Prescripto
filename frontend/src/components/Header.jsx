import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-[#6366F1] rounded-lg px-6 md:px-10 lg:px-20' style={{marginLeft:60, marginRight:60, marginTop:40}}>
        {/* left side */}
        <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
            <p style={{marginLeft:50}} className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>
                Book Appointment <br />With Trusted <br /> Doctors
            </p>
            <div style={{marginLeft:50}} className='flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light'>
                <img className='w-28' src={assets.group_profiles} alt="" />
                <p>
                    Simply browse through our extensive list of <br className='hidden sm:block' /> trusted doctors, <br className='hidden sm:block' />schedule your appointment hassle-free.
                </p>
            </div>
            <a href="#speciality" className='flex items-center gap-2 bg-white h-10 w-50 rounded-full text-gray-600 tex-sm m-suto md:m-0 hover:scale-105 transition-all duration-300' style={{marginLeft:50, marginTop:10}}>
                <p style={{marginLeft:20}}>Book Appointment</p> <img className='w-3' src={assets.arrow_icon} alt="" />
            </a>
        </div>
        {/* right side pannel */}
        <div className='md:w-1/2 relative'>
            <img className='w-full mt-50  bottom-0 h-auto rounded-lg' src={assets.header_img} alt="" />
        </div>
    </div>
  )
}

export default Header