import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Doctors = () => {
  const { speciality } = useParams()
  const [filterDoc, setFilterDoc] = useState([])
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 px-8 my-10">
      <p className="text-gray-600 mb-6 text-lg font-medium" style={{marginLeft:60, marginTop:20}}>Browse through the specialist doctors</p>

      <div className="flex flex-col md:flex-row gap-8" style={{marginTop:10}}>
        {/* Left Side: Speciality Menu */}
        <div className="flex flex-col gap-4 text-sm text-gray-600" style={{ marginLeft: 60, marginTop: 15 }}>
  <p
    onClick={() => speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician')}
    className={`w-52 h-8 flex items-center justify-center border border-gray-300  text-base font-medium cursor-pointer transition-all ${speciality === "General physician" ? "bg-indigo-100 text-black" : ""}`}
  >
    General physician
  </p>

  <p
    onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')}
    className={`w-52 h-8 flex items-center justify-center border border-gray-300 text-base font-medium cursor-pointer transition-all ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`}
  >
    Gynecologist
  </p>

  <p
    onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')}
    className={`w-52 h-8 flex items-center justify-center border border-gray-300 text-base font-medium cursor-pointer transition-all ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}
  >
    Dermatologist
  </p>

  <p
    onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')}
    className={`w-52 h-8 flex items-center justify-center border border-gray-300 text-base font-medium cursor-pointer transition-all ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""}`}
  >
    Pediatricians
  </p>

  <p
    onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')}
    className={`w-52 h-8 flex items-center justify-center border border-gray-300 text-base font-medium cursor-pointer transition-all ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}`}
  >
    Neurologist
  </p>

  <p
    onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')}
    className={`w-52 h-8 flex items-center justify-center border border-gray-300  text-base font-medium cursor-pointer transition-all ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : ""}`}
  >
    Gastroenterologist
  </p>
</div>

        {/* Right Side: Doctors Grid */}
        <div className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" style={{marginTop:10, marginLeft:30}}>
          {filterDoc.map((item, index) => (
            <div
              onClick={() => navigate(`/appoitment/${item._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500 shadow-md"
              key={index}
            >
              <img
                className="bg-violet-50 w-full h-60 object-cover"
                src={item.image}
                alt=""
              />
              <div className="p-4" style={{marginTop:10, marginLeft:15}}>
                <div className="flex items-center gap-2 text-sm text-green-500 mb-1">
                  <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                  <p>Available</p>
                </div>
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Doctors
