import React from 'react'
import { Button } from './ui/button'
import { IoMusicalNoteOutline } from "react-icons/io5";
const NavigationBar = () => {
  return (
    <div className='flex items-center justify-between px-36 py-10'>
        <div className='flex items-center'>
          <IoMusicalNoteOutline className='text-[35px] text-[#3525C3]'/>
          <h1 className='font-semibold text-[28px] text-[#3525C3] '>PLMun Chorale</h1>
          </div>
        <div className='flex items-center space-x-18'>
            <ul className='flex text-[17px] font-normal text-[#1E1E1E] space-x-18'>
                <li className='hover:text-[#3525c3] cursor-pointer'>Home</li>
                <li className='hover:text-[#3525c3] cursor-pointer'>About</li>
                <li className='hover:text-[#3525c3] cursor-pointer'>Services</li>
                <li className='hover:text-[#3525c3] cursor-pointer'>Testimonials</li>
                <li className='hover:text-[#3525c3] cursor-pointer'>Inquiry</li>
            </ul>
            <Button className='bg-[#3525C3] text-[17px] font-normal p-5 px-12 cursor-pointer'>
            Login
            </Button>
        </div>
    </div>
  )
}

export default NavigationBar