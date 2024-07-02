import { Alert, Button, TextInput } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import  {app}  from '../../firebase.js';

import { updateStart,updateFailure,updateSuccess } from '../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';

export default function DashProfile() {

  const { currentUser } = useSelector((state) => state.user);

  const [imagFile, setImageFile] = useState(null);
  const [imageFileURL, setImageFileURL] = useState(null);
  
   const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const filePickRef = useRef();
  const dispatch=useDispatch();

  const [imageFileUploadProgress,setImageFileUploadProgress]=useState(null);
  const [imageFileUploadError,setImageFileUploadError]=useState(null);

  //for update profile
  const [formData,setFormData]=useState({});

  console.log(imageFileUploadProgress);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileURL(URL.createObjectURL(file));
    }

  }

  const handleChange=(e)=>{
    setFormData({...formData, [e.target.id]:e.target.value})
  }

  console.log(formData);

  function formValidation(){
    
  }
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made');
      return;
    }

    formValidation();

    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

  useEffect(()=> {

    const uploadImage=async()=>{
      
      const storage=getStorage(app);
      //if same file chosed twice==error,
      //hence made fileName unique with date
      const fileName=new Date().getTime()+imagFile.name;
      const storageRef=ref(storage,fileName);
      const uploadTask=uploadBytesResumable(storageRef,imagFile);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            //toFixed means no decimal
            setImageFileUploadProgress(progress.toFixed(0));

        },
        (error)=>{
          setImageFileUploadError(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            
            setImageFileURL(downloadURL);
            setFormData({...formData, profilePicture:downloadURL});
          });
        }
      )

      
    }
    if(imagFile) uploadImage();

  }, [imagFile])

  return (
    <div className='w-[70%] p-5 mx-auto'>

      <h1 className='text-3xl font-semibold text-center'>Profile</h1>

      <form onSubmit={handleSubmit} className='mt-10 flex flex-col gap-4'>
       
        <input type="file" accept='image/*'
          onChange={handleImageChange}
          ref={filePickRef}
          hidden 
        />

        <div className='w-32 h-32 rounded-full mx-auto'>

          <img alt="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png"
            src={ imageFileURL || currentUser.profilePicture  } className='rounded-full w-full h-full border-8 
          shadow-md  cursor-pointer'
            onClick={() => filePickRef.current.click()}
           />

        </div>

        {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}

        <TextInput id='username' type='text' placeholder={currentUser.username} onChange={handleChange} ></TextInput>
        <TextInput id='email' type='text' placeholder={currentUser.email}  onChange={handleChange}></TextInput>
        <TextInput id='password' type='password' placeholder='password'  onChange={handleChange}></TextInput>
        <Button type='submit' gradientDuoTone='purpleToPink'>Update</Button>

        <div className='flex justify-between flex-nowrap'>
          <span className='text-sm text-red-600 font-semibold cursor-pointer'>Delete Account</span>
          <span className='text-sm text-red-600 font-semibold cursor-pointer'>Sign Out</span>

        </div>
      </form>

    </div>
  )
}
