'use client'
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const storedUsername = Cookies.get('username');
      const storedContactNumber = Cookies.get('contactNumber');
      const storedEmail = Cookies.get('email');
      
      if (storedUsername) {
        setIsAuthenticated(true);
        setUsername(storedUsername);
        setContactNumber(storedContactNumber || '');
        setEmail(storedEmail || '');
      } else {
        setIsAuthenticated(false);
        setUsername('');
        setContactNumber('');
        setEmail('');
      }
      setLoading(false);
    };

    checkAuth();
    const interval = setInterval(checkAuth, 1000);
    return () => clearInterval(interval);
  }, []);

  return { isAuthenticated, username, contactNumber, email, loading };
} 