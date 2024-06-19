import React, { useEffect, useState } from 'react'
import {Sidebar} from 'flowbite-react';
import {HiUser} from 'react-icons/hi'
import { FaArrowRight } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function DashSidebar() {

    const [tab, setTab] = useState('');
    const location = useLocation();
    const navigate=useNavigate();

    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get('tab');
      if (tabFromUrl) {
        setTab(tabFromUrl);
      }
    }, [location.search]);

  return (
    <Sidebar className='w-full'>
        <Sidebar.Items>
            <Sidebar.ItemGroup className='cursor-pointer'>

                <Sidebar.Item icon={HiUser} label={'user'}
                     active={tab==='profile'}
                     onClick={()=>navigate('/dashboard?tab=profile')}>
                    
                    Profile
                </Sidebar.Item>

                <Sidebar.Item icon={FaArrowRight} >
                    Sign Out
                </Sidebar.Item>

            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
