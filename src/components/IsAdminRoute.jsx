import react from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

export default function IsAdminRoute(){

    const {currentUser}=useSelector(state=>state.user);

    return(
        currentUser && currentUser.isAdmin ? <Outlet/> :
        <Navigate to='/create-post'/>
    )
}