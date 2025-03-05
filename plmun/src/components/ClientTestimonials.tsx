import React from 'react'
import { Card, CardContent, CardDescription, CardTitle } from './ui/card'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const ClientTestimonials = () => {
    const tesimonials = [
        {
            desc: "“It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.“",
            img:"https://github.com/shadcn.png",
            name:'The Name Here',
            company:'The Company Name Here'
        },

        {
            desc: "“It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.“",
            img:"https://github.com/shadcn.png",
            name:'The Name Here',
            company:'The Company Name Here'
        },

        {
            desc: "“It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.“",
            img:"https://github.com/shadcn.png",
            name:'The Name Here',
            company:'The Company Name Here'
        },
    ]
  return (
    <div className='px-36 mb-10'>
        <div className='flex flex-col items-center justify-center py-12'>
            <h1 className='text-[32px] text-[#3525C3] font-semibold pt-16 text-center mb-3'>Client Testimonials</h1>
            <p className='text-center w-[48%] font-light text-[#1e1e1e]'>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using &apos;Content here, content here&apos;, making it look like readable English.</p>
        </div>
        <div  className='grid grid-cols-3 gap-10'>
        {tesimonials.map((says,index) => (
        
            <Card key={index}className='px-10 py-10'>
                <CardDescription className='text-[#1e1e1e] font-light'>
                    {says.desc}
                </CardDescription>
                
                <CardContent className='px-0 flex items-center gap-3'>
                    <Avatar>
                        <AvatarImage src={says.img}/>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                    <div>
                        <CardTitle>
                            {says.name}
                        </CardTitle>
                        <CardDescription>
                            {says.company}
                        </CardDescription>
                    </div>
                </CardContent>
            </Card>
        ))}
        </div>
    </div>
  )
}

export default ClientTestimonials