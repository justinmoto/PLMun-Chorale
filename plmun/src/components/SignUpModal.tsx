import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import { Input } from './ui/input';
import { Label } from './ui/label';
import axios from 'axios'

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SignUpModal = ({ isOpen, onClose }: LoginModalProps) => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try{
            const response = await axios.post('/api/register', {
                username,
                email,
                password,
                confirmPassword
            })
            if (response.status === 200){
                alert('Register Account Successfully')
            }
        }catch(error){
            alert(error)
        }
    } 

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
            
            {/* Modal Content */}
            <Card className="bg-white p-5 rounded-lg shadow-lg relative z-50 w-[400px]">
                <CardTitle className="text-2xl font-bold text-[#1e1e1e] text-center">Create an Account</CardTitle>
                <CardDescription className='text-center'>Please fill up all the neccessary information</CardDescription>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5 mt-5">

                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="email">Username</Label>
                            <Input type="text" onChange={(e) => setUsername(e.target.value)} id="email" placeholder="example@gmail.com" className='py-5'/>
                        </div>

                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" onChange={(e) => setEmail(e.target.value)} id="email" placeholder="example@gmail.com" className='py-5'/>
                        </div>

                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="email">Password</Label>
                            <Input type="password" onChange={(e) => setPassword(e.target.value)} id="email" placeholder="********" className='py-5'/>
                        </div>

                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="email">Confirm Password</Label>
                            <Input type="password" onChange={(e) => setConfirmPassword(e.target.value)} id="email" placeholder="********" className='py-5'/>
                        </div>
                        <div className="flex justify-center space-x-3 mt-6">                           
                            <button type="submit" className="px-4 py-2 bg-[#3525C3] text-white w-full rounded-md hover:bg-[#2a1d99]">
                                Sign Up
                            </button>
                        </div>
                            <p className='font-light text-center text-[12px]'>Already have an account? <span className='underline'>Sign In Here</span></p>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default SignUpModal