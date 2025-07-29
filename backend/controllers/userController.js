import validator from 'validator'

import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'

import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'



// api to register user
const registerUser = async (req, res) => {
  try {

    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.json({ success: false, message: 'Missing Details' })
    }

    // validating email format
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: 'Enter a valid email' })
    }

    // validating strong pswrd
    if (password.length < 8) {
      return res.json({ success: false, message: 'Enter a strong password' })
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const userData = {
      name,
      email,
      password: hashedPassword,
    }

    const newUser = new userModel(userData)
    const user = await newUser.save()

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

    res.json({ success: true, token })


  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })
  }
}

// api for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: 'User does not exist' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: 'Invalid Credentials' });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Send success response
    res.json({ success: true, token });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}


// api to get user profile data
const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;  // ✅ Use data from authUser middleware

    const userData = await userModel.findById(userId).select('-password');

    res.json({ success: true, userData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// API to update user profile
const updateProfile = async (req, res) => {

  try {

    const userId = req.user.userId; 
    const { name, phone, address, dob, gender } = req.body
    const imageFile = req.file

    if (!name || !phone || !gender || !dob) {
      return res.json({ success: false, message: 'Data Missing' })
    }

    await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })

    if (imageFile) {
      // upload img to cloudinary
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:'image'})
      const imageUrl = imageUpload.secure_url

      await userModel.findByIdAndUpdate(userId,{image:imageUrl})
    }

    res.json({success:true,message:'Profile updated'})


  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }

}

// API to book appointment
const bookAppointment = async (req, res) => {

  try {

    const userId = req.user.userId
    
    const {docId, slotDate, slotTime } = req.body

    const docData = await doctorModel.findById(docId).select('-password')

    if (!docData.available) {
      return res.json({success:false, message:'Doctor not available'})
    }

    let slots_booked = docData.slots_booked

    // checking for slot availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({success:false, message:'Slot not available'})
      } else {
        slots_booked[slotDate].push(slotTime)
      }
    } else {
      slots_booked[slotDate] = []
      slots_booked[slotDate].push(slotTime)
    }

    const userData = await userModel.findById(userId).select('-password')

    delete docData.slots_booked

    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount:docData.fees,
      slotTime,
      slotDate,
      date: Date.now()
    }

    const newAppointment = new appointmentModel(appointmentData)

    await newAppointment.save()


    // save new slots data in doctors data
    await doctorModel.findByIdAndUpdate(docId,{slots_booked})

    res.json({success:true, message:'Appointment booked'})

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }

}

// API to get user appointments for frontend my-appointments page
const listAppointment = async (req, res) => {

  try {
    
    const userId = req.user.userId
    const appointments = await appointmentModel.find({userId})

    res.json({success:true,appointments})

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }

}

// API to cancel appointment
const cancelAppointment = async (req, res) => {

  try {
    
    const userId = req.user.userId
    const {appointmentId} = req.body

    const appointmentData = await appointmentModel.findById(appointmentId)

    // verify appointment user
    if (appointmentData.userId != userId) {
        return res.json({success:false, message:'unauthorized action'})      
    }

    await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true})

    // releasing doctors slot

    const {docId, slotDate, slotTime} = appointmentData

    const doctorData = await doctorModel.findById(docId)

    let slots_booked = doctorData.slots_booked

    slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)

    await doctorModel.findByIdAndUpdate(docId, {slots_booked})

    res.json({success:true, message:'Appointment Cancelled'})

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }

}

// const razorpayInstance = new razorpay({
//   key_id:process.env.RAZORPAY_KEY_ID,
//   key_secret:process.env.RAZORPAY_KEY_SECRET
// })

// // API to make payment of appointment using razorpay
// const paymentRazorpay = async (req, res) => {
//   const {appointmentId} = req.body

//   const appointmentData = await appointmentModel.findById(appointmentId)

//   if (!appointmentData || appointmentData.cancelled) {
//     return res.json({success:false,message:'Appointment cancelled or not found'})
//   }

//   // creating options for razorpay payment
//   const options = {
//     amount: appointmentData.amount * 100,
//     currency: process.env.CURRENCY,
//     receipt: appointmentId,
//   }
// }


export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment }