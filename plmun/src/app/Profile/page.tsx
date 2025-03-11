import Footer from '@/components/Footer'
import NavigationBar from '@/components/NavigationBar'
import UserProfile from '@/components/UserProfile'
import React from 'react'

const Profile = () => {
  return (
    <div >
        <NavigationBar/>
            <UserProfile/>
        <Footer/>
    </div>
  )
}

export default Profile