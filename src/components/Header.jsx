import { Avatar, Button, Dropdown, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai'
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice'
import { signOutSuccess } from '../redux/user/userSlice';

export default function Header() {

  const dispatch = useDispatch();
  const path = useLocation().pathname;
  const { currentUser } = useSelector(state => state.user);
  const { theme } = useSelector(state => state.theme);

  const handleSignOut = async () => {
    try {

      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });

      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      }
      else {
        dispatch(signOutSuccess());
      }

    } catch (error) {
      console.log(error.message);
    }

  };

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

        <Button className='cursor-pointer hidden md:inline'
          outline onClick={() => dispatch(toggleTheme())}>
          {theme==='light'?<FaSun/> : <FaMoon/>} 
        </Button>


        {currentUser ?
          (
            <Dropdown inline arrowIcon={false}
              label={
                <Avatar alt='omk' img={currentUser.profilePicture} rounded />
              }>
              <Dropdown.Header>
                <span className='text-sm block mb-2'>{currentUser.username}</span>
                <span className='text-sm block truncate'>{currentUser.email}</span>

              </Dropdown.Header>
              <Link to='/dashboard?tab=profile'>
                <Dropdown.Item>
                  Profile
                </Dropdown.Item>
              </Link>

              <Dropdown.Item onClick={handleSignOut}>
                Sign out
              </Dropdown.Item>


            </Dropdown>
          ) :
          <Link to="/sign-in" >
            <Button gradientDuoTone='purpleToBlue'>Sign-in</Button>
          </Link>
        }


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

      </Navbar.Collapse>



    </Navbar >
  )
}
