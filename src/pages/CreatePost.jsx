import React from 'react'
import { Button, FileInput, TextInput } from 'flowbite-react'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


export default function CreatePost() {

    return (
        <div className='min-h-screen 
    max-w-3xl mx-auto p-5  '>
            <form className='flex flex-col gap-5 mt-8'>
                <h1 className='mx-auto  text-2xl font-semibold'>Create a post</h1>

                <div className='flex flex-col sm:flex-row gap-3 '>
                    <TextInput type='input' placeholder='Title' className='flex-1'
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
                    <FileInput typeof='file' accept='image/*'></FileInput>
                    <Button gradientDuoTone='purpleToBlue' outline type='button'>Upload Image</Button>
                </div>

                <ReactQuill theme="snow" placeholder='Create a post' 
                className='h-72 mb-12' required />

                <Button type='submit' gradientDuoTone='purpleToPink'>Publish</Button>
            </form>
        </div>
    )
}
