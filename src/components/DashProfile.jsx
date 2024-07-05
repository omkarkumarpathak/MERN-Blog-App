import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { FaTriangleExclamation } from "react-icons/fa6";

import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../../firebase.js';

import {
  updateStart, updateFailure, updateSuccess,
  deleteUserFailure, deleteUserStart, deleteUserSuccess,
  signOutSuccess
} from '../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

export default function DashProfile() {

  const { currentUser, error } = useSelector((state) => state.user);

  const [imagFile, setImageFile] = useState(null);
  const [imageFileURL, setImageFileURL] = useState(null);

  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);

  const filePickRef = useRef();
  const dispatch = useDispatch();

  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);

  //delete
  const [showModal, setShowModal] = useState(false);

  //for update profile
  const [formData, setFormData] = useState({});

  console.log(imageFileUploadProgress);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileURL(URL.createObjectURL(file));
    }

  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  console.log(formData);

  function formValidation() {

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

  useEffect(() => {

    const uploadImage = async () => {

      const storage = getStorage(app);
      //if same file chosed twice==error,
      //hence made fileName unique with date
      const fileName = new Date().getTime() + imagFile.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, imagFile);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //toFixed means no decimal
          setImageFileUploadProgress(progress.toFixed(0));

        },
        (error) => {
          setImageFileUploadError(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

            setImageFileURL(downloadURL);
            setFormData({ ...formData, profilePicture: downloadURL });
          });
        }
      )


    }
    if (imagFile) uploadImage();

  }, [imagFile])

  const handleDeleteUser = async () => {
    setShowModal(false);

    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      })

      const data = await res.json();

      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      }
      else {
        dispatch(deleteUserSuccess(data));
      }

    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  }

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
    <>
      <div className='w-[70%] p-5 mx-auto relative'>

        <h1 className='text-3xl font-semibold text-center'>Profile</h1>

        <form onSubmit={handleSubmit} className='mt-10 flex flex-col gap-4'>

          <input type="file" accept='image/*'
            onChange={handleImageChange}
            ref={filePickRef}
            hidden
          />

          <div className='w-32 h-32 rounded-full mx-auto'>

            <img alt="https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png"
              src={imageFileURL || currentUser.profilePicture} className='rounded-full w-full h-full border-8 
          shadow-md  cursor-pointer'
              onClick={() => filePickRef.current.click()}
            />

          </div>

          {imageFileUploadError && <Alert color='failure'>{imageFileUploadError}</Alert>}

          <TextInput id='username' type='text' placeholder={currentUser.username} onChange={handleChange} ></TextInput>
          <TextInput id='email' type='text' placeholder={currentUser.email} onChange={handleChange}></TextInput>
          <TextInput id='password' type='password' placeholder='password' onChange={handleChange}></TextInput>
          <Button type='submit' gradientDuoTone='purpleToPink'>Update</Button>

          {
            currentUser.isAdmin && (
              <Link to="/create-post">
                <Button type='button' gradientDuoTone='purpleToBlue'
                className='w-full'>
                  Create Post
                </Button>
              </Link>
            )
          }


        </form>
        <div className='flex justify-between flex-nowrap mt-3'>
          <span className='text-sm text-red-600 font-semibold cursor-pointer'
            onClick={() => setShowModal(true)}>Delete Account</span>

          <span className='text-sm text-red-600 font-semibold cursor-pointer'
            onClick={handleSignOut}>Sign Out</span>

        </div>

        {updateUserSuccess && (
          <Alert color='success' className='mt-5'>{updateUserSuccess}</Alert>
        )}


        {updateUserError && (
          <Alert color='failure' className='mt-5'>{updateUserError}</Alert>
        )}

        {
          error && (
            <Alert color='failure' className='mt-5'>
              {error}
            </Alert>
          )
        }


        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          popup
          size='md'
        >
          <Modal.Header />
          <Modal.Body>
            <div className='text-center'>
              <FaTriangleExclamation className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                Are you sure you want to delete your account?
              </h3>
              <div className='flex justify-center gap-4'>
                <Button color='failure' onClick={handleDeleteUser}>
                  Yes, I'm sure
                </Button>
                <Button color='gray' onClick={() => setShowModal(false)}>
                  No, cancel
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>

      </div>


    </>
  )
}
