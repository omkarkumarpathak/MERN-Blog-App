import React, { useEffect, useState } from 'react'
import { Alert, Button, FileInput, TextInput } from 'flowbite-react'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../../firebase';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function UpdatePost() {

    const [file, setFile] = useState(null);
    const [uploadImageError, setUploadImageError] = useState(null);
    const [imageUploadProgress, setImageUploadProgress] = useState(null);
    const [FormData, setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    
    const navigate=useNavigate();

    const {currentUser}=useSelector((state)=>state.user);

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
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Uploading Progress:' + progress.toFixed(0) + ' %')
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
                            setFormData({ ...FormData, image: downloadURL })
                        })
                }
            )


        } catch (error) {
            setUploadImageError('Image Upload failed');
            setImageUploadProgress(null);
            console.log(error);
        }
    }

    //getting post data to update

    const {postId} =useParams();
    useEffect(()=>{
        try {
            const getPost=async()=>{
                const res=await fetch(`/api/post/getPosts?postId=${postId}`);
                const data=await res.json();
                if(!res.ok){
                    console.log(data.message);
                    setPublishError(data.message);
                    return;
                }
                if(res.ok){
                    setPublishError(null);
                    setFormData(data.posts[0]);
                }
            }
            getPost();

        } catch (error) {
            console.log(error);
        }
    },[postId])

    
    console.log(FormData);

    //console.log(FormData);
    const publishPost = async (e) => {
        e.preventDefault();

        try {
           
            const res = await fetch(`/api/post/updatePost/${FormData._id}/${currentUser._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(FormData),
            });

            const data = await res.json();

            if (res.ok) {
                setPublishError(null);
                navigate(`/showPost/${postId}`);
            }
            if (!res.ok) {
                setPublishError(data.message);
                return;
            }

        } catch (error) {
            setPublishError('Something went wrong')
        }
    }
    return (
        <div className='min-h-screen 
    max-w-3xl mx-auto p-5  '>
            <form className='flex flex-col gap-5 mt-8' onSubmit={publishPost}>
                <h1 className='mx-auto  text-2xl font-semibold'>Update this post</h1>

                <div className='flex flex-col sm:flex-row gap-3 '>
                    <TextInput type='text' id='title' placeholder='Title' className='flex-1'
                        onChange={(e) => setFormData({ ...FormData, title: e.target.value })}
                        required
                        value={FormData.title}/>

                    <select className='rounded-lg'
                        onChange={(e) => setFormData({ ...FormData, category: e.target.value })}
                        value={FormData.category}
                        >
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
                        {imageUploadProgress ? "Uploading....." : "Upload Image"}
                    </Button>
                </div>
                {uploadImageError && (
                    <div className='text-red-600'>{uploadImageError}</div>
                )}

                {FormData.image && (
                    <img src={FormData.image} alt="Can't uploaded"
                        className='h-72  object-cover' />
                )}

                <ReactQuill theme="snow"
                value={FormData.content}
                 placeholder='Create a post'
                    className='h-72 mb-12' required
                    onChange={(value) => {
                        setFormData({ ...FormData, content: value })
                    }} />

                <Button type='submit' gradientDuoTone='purpleToPink'>Update</Button>
                {
                    publishError && (
                        <Alert>{publishError}</Alert>
                    )
                }
            </form>
        </div>
    )
}
