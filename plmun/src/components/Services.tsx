import React from 'react'
import { Card } from './ui/card'

const Services = () => {
    const services = [
        {
            icon:'/',
            title:'Lorem Ipsum can i get some',
            desc:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        },

        {
            icon:'/',
            title:'Lorem Ipsum can i get some',
            desc:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        },

        {
            icon:'/',
            title:'Lorem Ipsum can i get some',
            desc:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        },

        {
            icon:'/',
            title:'Lorem Ipsum can i get some',
            desc:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
        },
    ]
  return (
    <div className='px-36'>
        <div className='flex flex-col items-center justify-center py-16'>
            <h1 className='text-[32px] text-[#3525C3] font-semibold pt-16 text-center mb-3'>Our Services</h1>
            <p className='text-center w-[48%] font-light text-[#1e1e1e]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using &apos;Content here, content here&apos;, making it look like readable English.</p>
        </div>

        <div className='grid grid-cols-2 gap-10'>
            {services.map((ourservices,index) => (
                <Card key={index} className='border-2 border-[#3525C3] rounded-[10px] px-10'>
                <div className='flex p-5 space-x-5'>
                    <div className='bg-[#3525C3] rounded-[10px] h-[60px] w-[30%]'>
                        {ourservices.icon}
                    </div>

                    <div className='text-[#3525C3]'>
                        <h1 className='text-[20px] font-medium'>{ourservices.title}</h1>
                        <p className='text-[15px] font-extralight text-[#1e1e1e]'>{ourservices.desc}</p>
                    </div>
                </div>
            </Card>
            ))}
        </div>
    </div>
  )
}

export default Services