'use client'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import SignUpModal from './SignUpModal'

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for token on component mount
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <div id="home" className="relative w-full h-[600px] mt-[120px]">
      <Image 
        src="/images/heroimg.png"
        alt="error"
        layout="fill" 
        objectFit="cover"
        quality={100} // Ensures HD quality
        priority // Loads the image faster
      />
      <div className='relative h-full px-36'>
        <div className='flex items-center h-full'>
            <div>
                <h1 className='text-white text-[35px] font-semibold w-[50%] tracking-wide'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h1>
                <p className='text-white font-light w-[33%] tracking-wide mt-3'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using &apos;Content here, content here&apos;, making it look like readable English.</p>

                <div className='space-x-10 mt-6'>
                    <Button className='text-white bg-[#3525C3] px-12 py-5 cursor-pointer'>Inquire Here</Button>
                    {!isAuthenticated && (
                      <Button 
                        onClick={() => setIsModalOpen(true)} 
                        className='text-white border-2 order-[#3525C3] bg-transparent px-12 py-5 cursor-pointer'
                      >
                        Sign Up
                      </Button>
                    )}
                </div>
                <SignUpModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Hero
