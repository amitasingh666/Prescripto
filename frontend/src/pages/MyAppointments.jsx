import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const MyAppointments = () => {

  const { backendUrl, token, getDoctorsData } = useContext(AppContext)

  const [appointments, setAppointments] = useState([])

  const months = [" ", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split('_')
    return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
  }

  const navigate = useNavigate()

  const getUserAppointments = async () => {

    try {
      
      const {data} = await axios.get(backendUrl + '/api/user/appointments', {headers:{token}})

      if (data.success) {
        setAppointments(data.appointments.reverse())
        console.log(data.appointments);
        
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }

  }

  const cancelAppointment = async(appointmentId) => {

    try {
      
      const {data} = await axios.post(backendUrl + '/api/user/cancel-appointment', {appointmentId}, {headers:{token}})

      if (data.success) {
        toast.success(data.message)
        getUserAppointments()
        getDoctorsData()

      } else {
        toast.error(data.message)
      }
      

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }

  }

  useEffect(() => {
    if (token) {
      getUserAppointments()
    }
  },[token])

  return (
    <div style={{marginTop:60, marginLeft:70, marginRight:90, marginBottom:150}}>
      <p className='font-semibold font-large border-b border-gray-300 pb-2'>My Appointments</p>
      <div style={{marginTop:10}}>
        {appointments.map((item, index)=>(
          <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b border-gray-300 pb-2' key={index}>
            <div style={{marginBottom:10, marginTop:10}}>
              <img className='w-32 bg-indigo-100' src={item.docData.image} alt="" />
            </div>
            <div style={{marginBottom:10, marginTop:10}} className='flex-1 text-sm text-zinc-600'>
              <p className='text-neutral-900 font-semibold'>{item.docData.name}</p>
              <p>{item.docData.speciality}</p>
              <p  style={{marginTop:8}}  className='text-zinc-800 font-medium mt-1'>Address:</p>
              <p className='text-xs'>{item.docData.address.line1}</p>
              <p className='text-xs'>{item.docData.address.line2}</p>
              <p  style={{marginTop:8}}  className='text-sm mt-1'><span className='text-sm text-neutral-800 font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime} </p>
            </div>

            <div></div>

            <div style={{marginBottom:10}} className='flex flex-col gap-2 justify-end'>
              {!item.cancelled && !item.isCompleted && <button className='text-sm text-stone-500 text-center sm:min-w-48 h-10 border hover:bg-[#6366F1] hover:text-white transition-all duration-300'>Pay Online</button>}
              {!item.cancelled && !item.isCompleted && <button onClick={() => cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 h-10 border hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel Appointment</button>}
              {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 h-10 border border-red-500 rounded text-red-500'>Appointment Cancelled</button>}
              {item.isCompleted && <button className='sm:min-w-48 h-10 border border-green-500 rounded text-green-500'>Completed</button> }
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments