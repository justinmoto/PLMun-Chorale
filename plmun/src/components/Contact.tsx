import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'

const Contact = () => {
  return (
    <div id="inquiry" className='px-36 mb-24'>
        <div className='flex flex-col items-center justify-center '>
            <h1 className='text-[32px] text-[#3525C3] font-semibold pt-16 text-center mb-3'>Inquire Now</h1>
            <p className='text-center w-[48%] font-light text-[#1e1e1e]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout <span className='font-medium text-[#3525C3]'>example@gmail.com</span></p>

            <div className="grid w-[48%] items-center space-y-7 mt-10">
              <div className='space-y-2'>
                <Label htmlFor="email" className='font-light'>Name<span className='text-red-600'>*</span></Label>
                <Input type="email" id="email" placeholder="Name" />
              </div>

              <div className='space-y-2'>
                <Label htmlFor="email" className='font-light'>Email<span className='text-red-600'>*</span></Label>
                <Input type="email" id="email" placeholder="example@gmail.com" />
              </div>
              

              <div className='space-y-2'>
                <Label htmlFor="email" className='font-light'>Company / Event Name<span className='text-red-600'>*</span></Label>
                <Input type="email" id="email" placeholder="Ex. Festival" />
              </div>
              

              <div className='space-y-2'>
                <Label htmlFor="email" className='font-light'>Location<span className='text-red-600'>*</span></Label>
                <Input type="email" id="email" placeholder="Ex. Alabang Festivel Mall, Lower Ground" />
              </div>
              
              <div className="grid w-full gap-1.5">
                <Label htmlFor="email" className='font-light'>Message<span className='text-red-600'>*</span></Label>
                <Textarea placeholder="Type your message here." id="message" />
              </div>

              <div className="grid w-full gap-1.5">
                <Button variant="default" className='bg-[#3525C3] text-white'>Submit</Button>
              </div>
                        
            </div>
        </div>

        
    </div>
  )
}

export default Contact