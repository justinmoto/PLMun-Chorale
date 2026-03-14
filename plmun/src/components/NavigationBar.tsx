'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { IoMusicalNoteOutline } from "react-icons/io5";
import LoginModal from './LoginModal';
import { FaUser } from "react-icons/fa";
import Link from 'next/link';
import { deleteCookie } from 'cookies-next'
import { useAuth } from '@/hooks/useAuth';
import { usePathname, useRouter } from 'next/navigation';

const NavigationBar = () => {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated, username } = useAuth();
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();

  const handleNavigation = (sectionId: string) => {
    if (pathname === '/Profile') {
      router.push(`/#${sectionId}`);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    deleteCookie('token');
    window.location.href = '/';
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault()
    const token = localStorage.getItem('token')
    if (token) {
      router.push('/Profile')
    } else {
      setIsModalOpen(true) // Open login modal if not authenticated
    }
  }

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'inquiry', label: 'Inquiry' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 border-b-2">
      <div className="flex items-center justify-between px-36 py-10">
        <div className="flex items-center">
          <Link href="/">
            <div className="flex items-center cursor-pointer">
              <IoMusicalNoteOutline className="text-[35px] text-[#3525C3]"/>
              <h1 className="font-semibold text-[28px] text-[#3525C3]">PLMun Chorale</h1>
            </div>
          </Link>
        </div>
        <div className="flex items-center space-x-18">
          <ul className="flex text-[17px] font-normal text-[#1E1E1E] space-x-18">
            {navLinks.map((link) => (
              <li 
                key={link.id}
                onClick={() => handleNavigation(link.id)}
                className={`cursor-pointer ${activeSection === link.id ? 'text-[#3525c3]' : ''} hover:text-[#3525c3]`}
              >
                {link.label}
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link href="/Profile" className="flex items-center text-[17px] text-[#1E1E1E] gap-2 border-r-2 px-2 border-[#1e1e1e] hover:text-[#3525c3]">
                  <FaUser className="text-[#3525c3]"/> {username}
                </Link>
                <Button 
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-[17px] font-normal p-5 px-8 cursor-pointer"
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => setIsModalOpen(true)} 
                className="bg-[#3525C3] text-[17px] font-normal p-5 px-12 cursor-pointer"
              >
                Login
              </Button>
            )}
          </div>
          <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
      </div>
    </nav>
  )
}

export default NavigationBar