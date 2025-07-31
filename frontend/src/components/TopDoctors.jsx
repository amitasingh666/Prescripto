import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {

  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  return (
    <div style={{marginTop:110}} className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
      <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
      <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted <br /> doctors.</p>

      <div className='w-full flex justify-center'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-5'>
          {doctors.slice(0, 10).map((item, index) => (
            <div onClick={() => { navigate(`/appoitment/${item._id}`); scrollTo(0, 0) }}
              className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500'
              key={index}
            >
              <img className='bg-violet-50 w-full h-60 object-cover' src={item.image} alt='' />
              <div className='p-4'>
                <div style={{marginLeft:20, marginTop:10}} className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500 ' : 'text-gray-500'}`}>
                  <p  className={`w-2 h-2 ${item.available ? 'bg-green-500 ' : 'bg-gray-500'} rounded-full`}></p>
                  <p>{item.available ? 'Available' : 'Not Available'}</p>
                </div>
                <p style={{marginLeft:20}} className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <p style={{marginLeft:20, marginBottom:10}} className='text-gray-600 text-sm'>{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
  onClick={() => {
    navigate('/doctors');
    scrollTo(0, 0);
  }}
  className="flex items-center justify-center bg-violet-50 text-gray-600 text-sm rounded-full w-[150px] h-[50px] hover:bg-gray-100 transition duration-300 shadow-md " style={{marginTop:20}}
>
  More
</button>


    </div>
  )
}

export default TopDoctors
