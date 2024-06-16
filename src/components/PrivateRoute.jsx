import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function PrivateRoute() {
  const {currUser}=useSelector(state=>state.user);
  const navigate=useNavigate();
  return (
    currUser ? <Outlet/> :
        navigate('/sign-in')
  )
}
