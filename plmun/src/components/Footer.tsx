import React from 'react'
import { FaYoutube } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa6";
import { IoLocationSharp, IoTime } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";
const Footer = () => {
    const mainLinks = [
        {
            name:"Home",
            link:"/"
        },

        {
            name:"About",
            link:"/"
        },

        {
            name:"Service",
            link:"/"
        },

        {
            name:"Testimonials",
            link:"/"
        },

        {
            name:"Inquiry",
            link:"/"
        },
    ]

    const otherLinks = [
        {
            name:"Performance Gallery",
            link:"/"
        },

        {
            name:"Our Team",
            link:"/"
        },

        {
            name:"Sign Up",
            link:"/"
        },
    ]

    const privacyLinks = [
        {
            name:"Privacy Policy"
        },

        {
            name:"Terms and Conditions",
            link:"/"
        },
    ]
  return (
    <div className='flex space-x-26 px-36 py-10 bg-[#3525C3] text-white'>
        <div className='w-[20%]'>
            <h1 className='text-[30px] font-semibold '>PLMun Chorale</h1>
            <p className='text-[15px] font-extralight'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it.</p>
            <div className='flex text-[25px] gap-4 mt-5'>
                <div className='p-2 rounded-full bg-white'><FaFacebookF className='text-[#3525C3]'/></div>

                <div className='p-2 rounded-full bg-white'><AiFillInstagram className='text-[#3525C3]'/></div>

                <div className='p-2 rounded-full bg-white'><FaYoutube  className='text-[#3525C3]'/></div>
            </div>
        </div>
        
        <div className='space-y-2'>
            <h1 className='text-center mr-5'>Links</h1>
            {mainLinks.map((links,index) => (
                <div key={index} >
                    <div className='flex items-center gap-3 hover:underline cursor-pointer'>
                        <MdKeyboardArrowRight/>
                        <ul>
                            <li className='font-light'>{links.name}</li>
                        </ul>
                    </div>
                </div>
            ))}
        </div>

        <div className='space-y-2'>
            <h1 className='text-center mr-8'>Other Links</h1>
            {otherLinks.map((links,index) => (
                <div key={index} >
                    <div className='flex items-center gap-3 hover:underline cursor-pointer'>
                        <MdKeyboardArrowRight/>
                        <ul>
                            <li className='font-light'>{links.name}</li>
                        </ul>
                    </div>
                </div>
            ))}
        </div>

        <div className='space-y-2'>
            <h1 className='text-center mr-7'>Privacy Links</h1>
            {privacyLinks.map((links,index) => (
                <div key={index} >
                    <div className='flex items-center gap-3 hover:underline cursor-pointer'>
                        <MdKeyboardArrowRight/>
                        <ul>
                            <li className='font-light'>{links.name}</li>
                        </ul>
                    </div>
                </div>
            ))}
        </div>

        <div className='space-y-2'>
            <h1 className=''>Visit Us</h1>
            <div className='flex gap-3'>
                <IoLocationSharp className='text-[23px]'/>
                <p className='font-light'>Established fact that a reader will be distracted by the </p>
            </div>

            <div className='flex items-center gap-3'>
                <IoTime className='text-[23px]'/>
                <p className='font-light'>Open 8:00 AM to 5:00 PM</p>
            </div>
        </div>
    </div>
  )
}

export default Footer