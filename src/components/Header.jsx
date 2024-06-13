import { Button, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon } from 'react-icons/fa';

export default function Header() {

  const path = useLocation().pathname;

  return (
    <Navbar className='border-b-2 p-4'>

      <Link to='/' className='ml-6 text-sm sm:text-lg font-semibold flex-nowrap
        dark:text-white '>
        <span className='py-1.5 px-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
            rounded-md mr-2 text-white'>Omkar's</span>
        Blog
      </Link>

      <form action="">
        <TextInput
          type='text'
          placeholder='Search Here'
          className='rounded-lg hidden lg:inline'
          rightIcon={AiOutlineSearch}
        ></TextInput>
      </form>

      <Button className='lg:hidden bg-gray-300' >
        <AiOutlineSearch className='text-lg text-black font-bold' />
      </Button>


      <div className='flex gap-3 md:order-2 items-center'>
        <FaMoon className='w-12 h-4 cursor-pointer hidden md:inline' />

        <Link to="/sign-in" >
          <Button gradientDuoTone='purpleToBlue'>Sign-in</Button>
        </Link>
        <Navbar.Toggle />

      </div>

      <Navbar.Collapse >
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to="/">
            Home
          </Link>
        </Navbar.Link>

        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to="/about">
            About
          </Link>
        </Navbar.Link>

        <Navbar.Link active={path === '/projects'} as={'div'}>
          <Link to="/projects">
            Projects
          </Link>
        </Navbar.Link>

      </Navbar.Collapse>



    </Navbar>
  )
}
