import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {

  const {dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext)
  const { currency, } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      }

      const {data} = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, {headers:{dToken}})
      
      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
      console.log(error);
      
    }
  }

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
  },[dToken])

  return profileData && (
    <div>

      <div style={{marginTop:10, marginLeft:10}} className='flex'>
        <div>
          <img className='bg-[#6366F1] w-full sm:max-w-75 rounded-lg' src={profileData.image} alt="" />
        </div>

        <div style={{marginLeft:15}}  className='flex-1 border border-stone-100 rounded-lg px-8 py-7 bg-white'>
          {/* doc info name dgree and experience */}
          <p style={{marginLeft:15}} className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
          <div style={{marginLeft:15}} className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>{profileData.degree} - {profileData.speciality} </p>
            <button className='h-5 w-10 border text-xs rounded-full'>{profileData.experience}</button>
            
          </div>
          {/* doctor about */}
          <div style={{marginLeft:15, marginTop:10}}>
            <p className='flex item-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About:</p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1'>
              {profileData.about}
            </p>
          </div>
          <p style={{marginLeft:15, marginTop:10}} className='text-gray-600 font-medium mt-4'>
            Appointment Fee: <span className='text-gray-800'>{currency} {isEdit ? <input type="number" onChange={(e)=>setProfileData(prev => ({...prev, fees: e.target.value}))} value={profileData.fees} /> :profileData.fees}</span>
          </p>

          <div style={{marginLeft:15, marginTop:10}} className='flex gap-2 py-2'>
            <p>Address</p>
            <p className='text-sm'>
              {isEdit ? <input type="text" onChange={(e)=>setProfileData(prev => ({...prev, address: {...prev.address, line1:e.target.value}}))} value={profileData.address.line1}/> : profileData.address.line1}
              <br />
              {isEdit ? <input type="text" onChange={(e)=>setProfileData(prev => ({...prev, address: {...prev.address, line2:e.target.value}}))} value={profileData.address.line2}/> : profileData.address.line2}
            </p>
          </div>

          <div style={{marginLeft:15, marginTop:10}} className='flex gap-1 pt-2'>
            <input onChange={() => isEdit && setProfileData(prev => ({...prev, available: !prev.available}))} checked={profileData.available} type="checkbox" />
            <label htmlFor="">Available</label>
          </div>

          {
            isEdit
            ? <button onClick={updateProfile} className='h-8 w-30 border border-[#6366F1] text-sm rounded-full mt-5 hover:bg-[#6366F1] hover:text-white transition-all' style={{marginLeft:15, marginTop:10, marginBottom:15}}>Save</button>
            : <button onClick={() => setIsEdit(true)} className='h-8 w-30 border border-[#6366F1] text-sm rounded-full mt-5 hover:bg-[#6366F1] hover:text-white transition-all' style={{marginLeft:15, marginTop:10, marginBottom:15}}>Edit</button>
          }

          
        </div>
      </div>

    </div>
  )
}

export default DoctorProfile