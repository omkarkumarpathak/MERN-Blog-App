import { Button, Label, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {

  const [formData,setFormData]=useState({});

  function onChange(e){
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    })
  }
  console.log(formData);

  const onSubmit=async(e)=>{
    e.preventDefault();
    try {
      const res=await fetch('/api/auth/signup',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData),
      });

      const data=await res.json();

    } catch (error) {
      
    }
  }

  console.log(formData);

  return (
    <div className='min-h-screen mt-32'>
      {/* //left */}
      <div className='max-w-[75%] mx-auto p-6
      flex flex-col md:flex-row'>

        <div className='p-5 flex-1'>

          <Link to='/' className='ml-6 text-3xl sm:text-lg font-semibold flex-nowrap
          dark:text-white '>
            <span className='py-1.5 px-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
                 rounded-md mr-2 text-white'>Omkar's</span>
            Blog
          </Link>
          <p className='mt-2 p-3 ml-3 text-sm'>This is mys Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi error facerepsa!
            necessi
            tatibus aut?</p>
        </div>

        <div className='flex-1'>
          <form onSubmit={onSubmit} className='flex flex-col gap-4'>
          <div>
              <Label>Username</Label>
              <TextInput type='text'
                placeholder='username'
                id='username'
                onChange={onChange}
              > </TextInput>
            </div>

            <div>
              <Label>Your email</Label>
              <TextInput type='email'
                placeholder='name@gmail.com'
                id='email'
                onChange={onChange}
              > </TextInput>
            </div>

            <div>
              <Label>Your password</Label>
              <TextInput type='password'
                placeholder='password'
                id='password'
                onChange={onChange}
              > </TextInput>
            </div>
            <Button type='submit' gradientDuoTone='purpleToPink' className='mt-2 w-full'>Sign Up</Button>

          </form>
          
          <div className='flex flex-nowrap text-sm font-semibold mt-4 gap-2'>
          <span >Have an account? </span>
          <Link className='text-blue-800' to='/sign-in'> Sign in</Link>

          </div>
        </div>

      </div>
    </div>
  )
}
