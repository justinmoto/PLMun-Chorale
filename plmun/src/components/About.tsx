import React from 'react'
import Image from 'next/image'
const About = () => {
  return (
    <div className='px-36'>
      <h1 className='text-[32px] text-[#3525C3] font-semibold py-16 text-center'>About Us</h1>
      <div className='grid grid-cols-2'>
        <div className='space-y-6 w-[86%] text-[#1e1e1e] text-[18px] font-light'>
          <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using &apos;Content here, content here&apos;, making it look like readable English.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using &apos;Content here, content here&apos;, making it look like readable English.</p>
  
          <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using &apos;Content here, content here&apos;, making it look like readable English.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using &apos;Content here, content here&apos;, making it look like readable English.</p>
        </div>

        <div className="relative w-full h-[500px]">
          <Image 
            src="/images/aboutimg.png"
            alt="error"
            layout="fill" 
            objectFit="cover"
            quality={100} // Ensures HD quality
            priority // Loads the image faster
            className='rounded-[10px] '
          />
        </div>
      </div>
    </div>
  )
}

export default About