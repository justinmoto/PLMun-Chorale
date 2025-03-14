'use client'
import React, { useState } from 'react'
import { Button } from './ui/button'
import { IoMusicalNoteOutline } from "react-icons/io5";
import LoginModal from './LoginModal';
import { FaUser } from "react-icons/fa";
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useAuth } from '@/hooks/useAuth';
import { usePathname, useRouter } from 'next/navigation';

const NavigationBar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAuthenticated, username } = useAuth();
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();
  const router = useRouter();

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
    Cookies.remove('token');
    Cookies.remove('username');
    window.location.href = '/';
  };

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
            <li 
              onClick={() => handleNavigation('home')}
              className={`hover:text-[#3525c3] cursor-pointer ${activeSection === 'home' ? 'text-[#3525c3]' : ''}`}
            >
              Home
            </li>
            <li 
              onClick={() => handleNavigation('about')}
              className={`hover:text-[#3525c3] cursor-pointer ${activeSection === 'about' ? 'text-[#3525c3]' : ''}`}
            >
              About
            </li>
            <li 
              onClick={() => handleNavigation('services')}
              className={`hover:text-[#3525c3] cursor-pointer ${activeSection === 'services' ? 'text-[#3525c3]' : ''}`}
            >
              Services
            </li>
            <li 
              onClick={() => handleNavigation('testimonials')}
              className={`hover:text-[#3525c3] cursor-pointer ${activeSection === 'testimonials' ? 'text-[#3525c3]' : ''}`}
            >
              Testimonials
            </li>
            <li 
              onClick={() => handleNavigation('inquiry')}
              className={`hover:text-[#3525c3] cursor-pointer ${activeSection === 'inquiry' ? 'text-[#3525c3]' : ''}`}
            >
              Inquiry
            </li>
          </ul>
          
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link href="/Profile" className="flex items-center text-[17px] text-[#1E1E1E] gap-2 border-r-2 px-2 border-[#1e1e1e]">
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