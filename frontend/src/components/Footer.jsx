import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10' style={{marginLeft:90, marginRight:90, marginTop:80}}>
        <div className='flex flex:col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            {/* left section */}
            <div>
                <img className='mb-5 w-40' src={assets.logo} alt="" />
                <p style={{marginTop:10}} className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>
            {/* center section */}
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul style={{marginTop:10}} className='flex flex-col gap-2 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>
                </ul>
            </div>
            {/* right section */}
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul style={{marginTop:10}} className='flex flex-col gap-2 text-gray-600'>
                    <li>+91-9580883173</li>
                    <li>amitasingh3173@gmail.com</li>
                </ul>
            </div>
        </div>
        <div style={{marginTop:30, height:50}}>
            {/* copyright section */}
            <hr />
            <p className='py-5 text-sm text-center' style={{marginTop:15}}>Copyright 2025 @ AmitaSingh.dev - All Right Reserved.</p>
        </div>
    </div>
  )
}

export default Footer