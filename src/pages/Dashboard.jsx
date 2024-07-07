import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
export default function Dashboard() {

  const [tab, setTab] = useState('');
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className='min-h-screen flex flex-col md:flex-row '>

      <div>
        {/* Sidebar */}
        <DashSidebar />
      </div>

      {tab == 'profile' &&
        <div className='w-full '>
          {/* DashBar */}
          <DashProfile />
        </div>
      }

      {tab === 'posts' &&
          <div className='w-full '>
            <DashPosts />
          </div >
      }
      
    </div >

  )
}
