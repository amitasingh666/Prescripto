import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDoctors = ({ speciality, docId }) => {
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [relDoc, setRelDocs] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDocs(doctorsData);
    }
  }, [doctors, speciality, docId]);

  return (
    <div className='flex flex-col items-start gap-4 my-16 text-gray-900 md:ml-16' style={{marginTop:20}}>
      <h1 className='text-3xl font-medium'>Related Doctors</h1>
      <p className='sm:w-1/3 text-sm'>Simply browse through our extensive list of trusted doctors.</p>

      <div className='w-full flex'>
        <div className='flex gap-4 pt-5 overflow-x-auto px-2'>
          {relDoc.slice(0, 5).map((item, index) => (
            <div
              onClick={() => {
                navigate(`/appoitment/${item._id}`);
                scrollTo(0, 0);
              }}
              className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500 min-w-[200px]'
              key={index}
            >
              <img className='bg-blue-50 w-full h-32 object-cover' src={item.image} alt='' />
              <div className='p-4'>
                <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                  <p className='w-2 h-2 bg-green-500 rounded-full'></p>
                  <p>Available</p>
                </div>
                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <p className='text-gray-600 text-sm'>{item.speciality}</p>
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
        className='bg-blue-60 text-gray-600 px-20 py-30 rounded-full mt-40'
        style={{ paddingLeft: 50, paddingRight: 50, paddingTop: 10, paddingBottom: 10 }}
      >
        more
      </button>
    </div>
  )
}

export default RelatedDoctors
