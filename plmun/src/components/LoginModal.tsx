import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import { Input } from './ui/input';
import { Label } from './ui/label';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter();
    
    React.useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          router.push('/'); // Redirect if already logged in
        }
    }, [router]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const response = await axios.post("/api/login", {
                username,
                password
            })

            if(response.status === 200){
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("username", response.data.username)
                alert('Login Successfully')
                window.location.reload()
            }
        } catch(error) {
            if (error instanceof AxiosError) {
                alert(error.response?.data?.error || 'Login failed')
            } else {
                alert('An unexpected error occurred')
            }
        }
    } 

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
            
            {/* Modal Content */}
            <Card className="bg-white p-5 rounded-lg shadow-lg relative z-50 w-[400px]">
                <CardTitle className="text-2xl font-bold text-[#1e1e1e] text-center">Login</CardTitle>
                <CardDescription className='text-center'>Input your credentials here</CardDescription>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5 mt-5">
                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input type="text" onChange={(e) => setUsername(e.target.value)} id="email" placeholder="example@gmail.com" className='py-5'/>
                        </div>

                        <div className="grid w-full max-w-sm items-center gap-1.5">
                            <Label htmlFor="email">Password</Label>
                            <Input type="password" onChange={(e) => setPassword(e.target.value)} id="email" placeholder="********" className='py-5'/>
                            <h1 className='font-light underline text-right text-[12px]'>Forgot Password?</h1>
                        </div>
                        <div className="flex justify-center space-x-3 mt-6">                           
                            <button type="submit" className="px-4 py-2 bg-[#3525C3] text-white w-full rounded-md hover:bg-[#2a1d99]">
                                Login
                            </button>
                        </div>
                            <p className='font-light text-center text-[12px]'>Don&apos;t have an account yet? <span className='underline'>Sign Up Here</span></p>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default LoginModal