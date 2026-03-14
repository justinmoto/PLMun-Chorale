'use client'
import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { IoMusicalNoteOutline } from "react-icons/io5";
import LoginModal from './LoginModal';
import { FaUser } from "react-icons/fa";
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { deleteCookie } from 'cookies-next'

const NavigationBar = () => {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Check for token and username on component mount
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    if (token && storedUsername) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
    }

    // Add scroll event listener
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'testimonials', 'inquiry'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Adjusted offset to account for sticky header
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    deleteCookie('token');
    window.location.reload();
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
    <div className='fixed top-0 left-0 right-0 bg-white z-50 border-b-2'>
      <div className='flex items-center justify-between px-36 py-6'>
        <div className='flex items-center'>
          <IoMusicalNoteOutline className='text-[35px] text-[#3525C3]'/>
          <h1 className='font-semibold text-[28px] text-[#3525C3]'>PLMun Chorale</h1>
        </div>
        <div className='flex items-center space-x-18'>
            <ul className='flex text-[17px] font-normal text-[#1E1E1E] space-x-18'>
                {navLinks.map((link) => (
                  <li 
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`cursor-pointer transition-colors duration-200 ${
                      activeSection === link.id ? 'text-[#3525c3]' : 'hover:text-[#3525c3]'
                    }`}
                  >
                    {link.label}
                  </li>
                ))}
            </ul>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link 
                  href='/Profile'
                  className="flex items-center text-[17px] text-[#1E1E1E] gap-2 border-r-2 px-2 border-[#1e1e1e] hover:text-[#3525c3] transition-colors duration-200"
                >
                  <FaUser className='text-[#3525c3]'/> {username}
                </Link>
                <Button 
                  onClick={handleLogout}
                  className='bg-red-500 hover:bg-red-600 text-[17px] font-normal p-5 px-8 cursor-pointer'
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                onClick={() => setIsModalOpen(true)} 
                className='bg-[#3525C3] text-[17px] font-normal p-5 px-12 cursor-pointer'
              >
                Login
              </Button>
            )}

            <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
      </div>
    </div>
  )
}

export default NavigationBar