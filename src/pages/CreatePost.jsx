import React, { useState } from 'react'
import { Button, FileInput, TextInput } from 'flowbite-react'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import {app} from '../../firebase';

export default function CreatePost() {

    const [file, setFile] = useState(null);
    const [uploadImageError, setUploadImageError] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [FormData,setFormData]=useState({});
    const handleUploadImage = async () => {

        try {
            if (!file) {
                setUploadImageError('Please select any image')
                return;
            }
            setUploadImageError(null);
            const storage = getStorage(app);
            const fileName = new Date().getTime() + '-' + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef,file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Uploading Progress:'+ progress.toFixed(0)+ ' %')
                     setImageUploadProgress(progress.toFixed(0));
                },
                (error) => {
                    setUploadImageError('Image Upload failed');
                    setImageUploadProgress(null);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((downloadURL) => {
                            setImageUploadProgress(null);
                            setUploadImageError(null);
                            setFormData({...FormData,image:downloadURL})
                        })
                }
            )


        } catch (error) {
            setUploadImageError('Image Upload failed');
            setImageUploadProgress(null);
            console.log(error);
        }
    }
    return (
        <div className='min-h-screen 
    max-w-3xl mx-auto p-5  '>
            <form className='flex flex-col gap-5 mt-8'>
                <h1 className='mx-auto  text-2xl font-semibold'>Create a post</h1>

                <div className='flex flex-col sm:flex-row gap-3 '>
                    <TextInput type='text' id='title' placeholder='Title' className='flex-1'
                        required></TextInput>
                    <select name="" id="" className='rounded-lg'>
                        <option value="UnCategorized">Select a category</option>
                        <option value="React">React</option>
                        <option value="Javascript">Javascript</option>
                        <option value="Tailwind">Tailwind</option>

                    </select>
                </div>

                <div className='flex flex-row justify-between border-4
                 border-gray-800 p-4 border-dotted rounded-md'>
                    <FileInput typeof='file' accept='image/*' onChange={(e) => setFile(e.target.files[0])}></FileInput>
                    <Button gradientDuoTone='purpleToBlue' outline type='button' 
                    onClick={handleUploadImage}>
                    {imageUploadProgress? "Uploading.....": "Upload Image"}
                    </Button>
                </div>
                {uploadImageError && (
                        <div>{uploadImageError}</div>
                )}

                {FormData.image && (
                    <img src={FormData.image} alt="Can't uploaded"
                    className='h-72 object-cover object-contain' />
                )}

                <ReactQuill theme="snow" placeholder='Create a post'
                    className='h-72 mb-12' required />

                <Button type='submit' gradientDuoTone='purpleToPink'>Publish</Button>
            </form>
        </div>
    )
}
