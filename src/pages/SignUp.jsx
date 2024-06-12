import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
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
          <form className='flex flex-col gap-4'>
            <div>
              <Label>Your email</Label>
              <TextInput type='text'
                placeholder='name@gmail.com'
                id='email'
              > </TextInput>
            </div>

            <div>
              <Label>Your password</Label>
              <TextInput type='text'
                placeholder='password'
                id='password'
              > </TextInput>
            </div>

          </form>
          <Button gradientDuoTone='purpleToPink' className='mt-5 w-full'>Sign Up</Button>

          <div className='flex flex-nowrap text-sm font-semibold mt-4 gap-2'>
          <span >Have an account? </span>
          <Link className='text-blue-800' to='/sign-in'> Sign in</Link>

          </div>
        </div>

      </div>
    </div>
  )
}
