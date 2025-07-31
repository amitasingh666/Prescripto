import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import { toast } from 'react-toastify'
import axios from 'axios';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const navigate = useNavigate()

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  const fetchDocInfo = () => {
    const doc = doctors.find((doc) => doc._id === docId);
    setDocInfo(doc);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);
    const today = new Date();
    let slots = [];

    for (let i = 0; i < 7; i++) {
      const currDate = new Date(today);
      currDate.setDate(today.getDate() + i);

      const endTime = new Date(currDate);
      endTime.setHours(21, 0, 0, 0); // 9:00 PM

      if (i === 0) {
        const currentHour = today.getHours();
        const currentMinute = today.getMinutes();

        if (currentHour >= 21) {
          // Past available hours for today, skip
          slots.push([]);
          continue;
        }

        currDate.setHours(currentHour < 10 ? 10 : currentHour + 1);
        currDate.setMinutes(currentMinute > 30 ? 0 : 30);
      } else {
        currDate.setHours(10);
        currDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currDate < endTime) {
        const formattedTime = currDate.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });

        let day = currDate.getDate()
        let month = currDate.getMonth() + 1
        let year = currDate.getFullYear()

        const slotDate = day + "_" + month + "_" + year
        const slotTime = formattedTime

        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

        if (isSlotAvailable) {
          // add slot to array
          timeSlots.push({
            datetime: new Date(currDate),
            time: formattedTime,
          });
        }




        currDate.setMinutes(currDate.getMinutes() + 30);
      }

      slots.push(timeSlots);
    }

    setDocSlots(slots);
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to book appointment')
      return navigate('/login')
    }

    try {

      const date = docSlots[slotIndex][0].datetime

      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      const slotDate = day + "_" + month + "_" + year

      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)

    }

  }

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  useEffect(() => {
    console.log(docSlots);
  }, [docSlots]);

  return docInfo && (
    <>
      <div className="flex flex-col sm:flex-row justify-center items-start gap-6 p-6" style={{ marginTop: 20 }}>
        {/* Left Box: Image */}
        <div className="bg-[#6366F1] rounded-xl p-6 sm:p-8 w-70 h-75  sm:max-w-sm flex justify-center items-center">
          <img
            src={docInfo.image}
            alt={docInfo.name}
            className="rounded-lg object-cover w-full h-auto"
          />
        </div>

        {/* Right Box: Info */}
        <div className="bg-white w-70 h-75 rounded-xl border border-gray-300 p-6 w-full sm:max-w-2xl shadow-sm">
          <div className="flex items-center gap-2">
            <p className="flex item-center gap-2 text-3xl font-medium text-gray-900" style={{ marginLeft: 35, marginTop: 25 }}>{docInfo.name}</p>
            <img src={assets.verified_icon} alt="Verified" className="w-5 h-5" style={{ marginTop: 20 }} />
          </div>

          <div className="mt-2 flex itme-center gap-2 text-gray-600 text-m" style={{ marginLeft: 35 }}>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className="h-5 w-13 border text-xs rounded-full" style={{ marginTop: 3 }}>
              {docInfo.experience}
            </button>
          </div>

          <div className="mt-4" style={{ marginLeft: 35, marginTop: 20 }}>
            <p className='flex item-center gap-1 text-sm font-medium text-gray-900 mt-3 '>About
              <img src={assets.info_icon} alt="Info" className="w-4 h-4" /></p>
            <p className="text-gray-600 mt-2 text-sm leading-relaxed">
              {docInfo.about}
            </p>
          </div>

          <p className="font-semibold text-gray-500 text-m" style={{ marginLeft: 35, marginTop: 15 }}>
            Appointment fee: <span className="text-black">{currencySymbol}{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots Section BELOW the profile */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700' style={{ marginTop: 35, marginLeft: 460 }}>
        <p>Booking Slots</p>
        <div className='flex gap-3 item-center overflow-x-scroll mt-4 w-full'>
          {
            docSlots.length > 0 && docSlots.map((item, index) => {
              const firstSlot = item[0];
              if (!firstSlot) return null;

              const dateObj = new Date(firstSlot.datetime);
              const dayName = daysOfWeek[dateObj.getDay()];
              const dateNum = dateObj.getDate();

              return (
                <div onClick={() => setSlotIndex(index)} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-[#6366F1] text-white' : 'border border-gary'}`} key={index} style={{ marginTop: 15 }}>
                  <p>{dayName}</p>
                  <p>{dateNum}</p>
                </div>
              );
            })
          }
        </div>
        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4 flex-nowrap' style={{ marginTop: 15 }}>
          {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
            <p onClick={() => setSlotTime(item.time)}
              className={`text-sm font-light flex items-center justify-center flex-shrink-0 h-8 w-20 rounded-full cursor-pointer border ${item.time === slotTime ? 'bg-[#6366F1] text-white mt-10' : 'text-gray-400 border border-gray-300'
                }`}

              key={index}
            >
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>
        <button onClick={bookAppointment} className='bg-[#6366F1] text-white text-sm font-light h-10 w-55 rounded-full my-6' style={{ marginTop: 25 }}> Book an Appointment</button>
        {/* listing related doctors */}'
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    </>
  );
}
export default Appointment
