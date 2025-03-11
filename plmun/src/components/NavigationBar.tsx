'use client'
import React, { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { IoMusicalNoteOutline } from "react-icons/io5";
import LoginModal from './LoginModal';
import { FaUser } from "react-icons/fa";
import Link from 'next/link';

const NavigationBar = () => {
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

    // Add scroll event listener for section highlighting
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'testimonials', 'inquiry'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
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
    setIsAuthenticated(false);
    setUsername('');
    window.location.reload();
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 border-b-2">
      <div className="flex items-center justify-between px-36 py-10">
        <div className="flex items-center">
          <IoMusicalNoteOutline className="text-[35px] text-[#3525C3]"/>
          <h1 className="font-semibold text-[28px] text-[#3525C3]">PLMun Chorale</h1>
        </div>
        <div className="flex items-center space-x-18">
          <ul className="flex text-[17px] font-normal text-[#1E1E1E] space-x-18">
            <li 
              onClick={() => scrollToSection('home')}
              className={`hover:text-[#3525c3] cursor-pointer ${activeSection === 'home' ? 'text-[#3525c3]' : ''}`}
            >
              Home
            </li>
            <li 
              onClick={() => scrollToSection('about')}
              className={`hover:text-[#3525c3] cursor-pointer ${activeSection === 'about' ? 'text-[#3525c3]' : ''}`}
            >
              About
            </li>
            <li 
              onClick={() => scrollToSection('services')}
              className={`hover:text-[#3525c3] cursor-pointer ${activeSection === 'services' ? 'text-[#3525c3]' : ''}`}
            >
              Services
            </li>
            <li 
              onClick={() => scrollToSection('testimonials')}
              className={`hover:text-[#3525c3] cursor-pointer ${activeSection === 'testimonials' ? 'text-[#3525c3]' : ''}`}
            >
              Testimonials
            </li>
            <li 
              onClick={() => scrollToSection('inquiry')}
              className={`hover:text-[#3525c3] cursor-pointer ${activeSection === 'inquiry' ? 'text-[#3525c3]' : ''}`}
            >
              Inquiry
            </li>
          </ul>
          
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link href="/rofile" className="flex items-center text-[17px] text-[#1E1E1E] gap-2 border-r-2 px-2 border-[#1e1e1e]">
                <FaUser className="text-[#3525c3]"/> {username}
              </Link>
              <Button 
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-[17px] font-normal p-5 px-8 cursor-pointer"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button 
              onClick={() => setIsModalOpen(true)} 
              className="bg-[#3525C3] text-[17px] font-normal p-5 px-12 cursor-pointer"
            >
              Login
            </Button>
          )}

          <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
      </div>
    </nav>
  )
}

export default NavigationBar