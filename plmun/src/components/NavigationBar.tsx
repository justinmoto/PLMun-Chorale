import React from 'react'
import { Button } from './ui/button'

const NavigationBar = () => {
  return (
    <div className='flex items-center justify-between px-36 py-10'>
        <h1 className='font-semibold text-[32px] text-[#3525C3] '>PLMun Chorale</h1>
        <div className='flex items-center space-x-18'>
            <ul className='flex text-[20px] font-light text-[#1E1E1E] space-x-18'>
                <li>Home</li>
                <li>About</li>
                <li>Services</li>
                <li>Testimonials</li>
                <li>Inquiry</li>
            </ul>
            <Button className='bg-[#3525C3] text-[20px] font-normal p-5 px-12'>
            Login
            </Button>
        </div>
    </div>
  )
}

export default NavigationBar