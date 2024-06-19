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

export default function DashProfile() {

  const { currentUser } = useSelector((state) => state.user);
  const [imagFile, setImageFile] = useState(null);
  const [imageFileURL, setImageFileURL] = useState(null);
  const filePickRef = useRef();

  const [imageFileUploadProgress,setImageFileUploadProgress]=useState(null);
  const [imageFileUploadError,setImageFileUploadError]=useState(null);
  console.log(imageFileUploadProgress);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileURL(URL.createObjectURL(file));
    }

  }
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
          });
        }
      )

      
    }
    if(imagFile) uploadImage();

  }, [imagFile])
  return (
    <div className='w-[70%] p-5 mx-auto'>

      <h1 className='text-3xl font-semibold text-center'>Profile</h1>

      <form className='mt-10 flex flex-col gap-4'>
        <input type="file" accept='image/*'
          onChange={handleImageChange}
          ref={filePickRef}
          hidden />
        <div className='w-32 h-32 rounded-full mx-auto
        '>
          <img alt="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png"
            src={imageFileURL || currentUser.profilePicture} className='rounded-full w-full h-full border-8 
          shadow-md  cursor-pointer'
            onClick={() => filePickRef.current.click()} />

        </div>

        {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}

        <TextInput type='text' placeholder={currentUser.username} ></TextInput>
        <TextInput type='text' placeholder={currentUser.email} ></TextInput>
        <TextInput type='password' placeholder='password' ></TextInput>
        <Button type='submit' gradientDuoTone='purpleToPink'>Update</Button>

        <div className='flex justify-between flex-nowrap'>
          <span className='text-sm text-red-600 font-semibold cursor-pointer'>Delete Account</span>
          <span className='text-sm text-red-600 font-semibold cursor-pointer'>Sign Out</span>

        </div>
      </form>

    </div>
  )
}
