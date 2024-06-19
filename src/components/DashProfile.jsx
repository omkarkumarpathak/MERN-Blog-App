import { Button, TextInput } from 'flowbite-react';
import React from 'react'
import { useSelector } from 'react-redux'

export default function DashProfile() {

  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className='w-[70%] p-5 mx-auto'>

      <h1 className='text-3xl font-semibold text-center'>Profile</h1>
      
      <form className='mt-10 flex flex-col gap-4'>
        <div className='w-32 h-32 rounded-full mx-auto
        '>
          <img alt="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png" 
          src={currentUser.profilePicture} className='rounded-full w-full h-full border-8 
          shadow-md '
           />
        </div>

        <TextInput type='text' placeholder={currentUser.username} ></TextInput>
        <TextInput type='text' placeholder={currentUser.email} ></TextInput>
        <TextInput type='password' placeholder='password' ></TextInput>
        <Button type='submit' gradientDuoTone='purpleToPink'>Update</Button>
        
        <div className='flex justify-between flex-nowrap'>
          <span className='text-sm text-red-600 font-semibold cursor-pointer'>Delete Account</span>
          <span className='text-sm text-red-600 font-semibold cursor-pointer'>Sign Out</span>

        </div>
      </form>

    </div>
  )
}
