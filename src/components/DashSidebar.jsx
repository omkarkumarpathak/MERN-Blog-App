import React, { useEffect, useState } from 'react'
import {Sidebar} from 'flowbite-react';
import {HiUser} from 'react-icons/hi'
import { FaArrowRight } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOutSuccess } from '../redux/user/userSlice';
import { IoDocumentTextOutline } from "react-icons/io5";

export default function DashSidebar() {

    const [tab, setTab] = useState('');
    const location = useLocation();
    const navigate=useNavigate();
    const dispatch=useDispatch();

    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get('tab');
      if (tabFromUrl) {
        setTab(tabFromUrl);
      }
    }, [location.search]);

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
    <Sidebar className='w-full'>
        <Sidebar.Items>
            <Sidebar.ItemGroup className='cursor-pointer'>

                <Sidebar.Item icon={HiUser} label={'user'}
                     active={tab==='profile'} //for making ui dark of this button
                     onClick={()=>navigate('/dashboard?tab=profile')}>
                    
                    Profile
                </Sidebar.Item>
                
                <Sidebar.Item icon={IoDocumentTextOutline}
                active={tab=='posts'}
                onClick={()=>navigate('/dashboard?tab=posts')}>
                    <p >Posts</p>
                </Sidebar.Item>

                <Sidebar.Item icon={FaArrowRight} >
                    <p onClick={handleSignOut}>Sign Out</p>
                </Sidebar.Item>

            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
