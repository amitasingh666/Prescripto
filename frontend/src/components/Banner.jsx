import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {
  const navigate = useNavigate()

  return (
    <div  className="flex flex-col md:flex-row bg-[#6366F1] rounded-lg px-6 sm:px-10 md:px-14 lg:px-20 my-20 mx-8 items-center min-h-[320px] lg:min-h-[500px] overflow-hidden" style={{marginLeft:90, marginRight:90, marginTop:50}}>
      {/* Left Side */}
      <div className="flex-1 text-white py-10 md:py-14">
        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
          <p style={{marginLeft:50}}>Book Appointment</p>
          <p style={{marginLeft:50, marginTop:8}} className="mt-3">With 100+ Trusted <br /> Doctors</p>
        </div>
        <button
          onClick={() => {
            navigate('/login')
            scrollTo(0, 0)
          }} style={{marginLeft:50, marginTop:15}}
          className="bg-white text-sm sm:text-base text-gray-600 h-10 w-40 rounded-full mt-6 hover:scale-105 transition-all"
        >
          Create account
        </button>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 lg:w-[420px] relative h-full flex items-end justify-end">
        <img
          src={assets.appointment_img}
          alt=""
          className="w-full h-full object-contain max-h-[300px] lg:max-h-[450px]"
        />
      </div>
    </div>
  )
}

export default Banner
