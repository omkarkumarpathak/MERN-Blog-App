import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function PostPage() {

    const [postData, setPostData] = useState();
    const [loading,setLoading]=useState(true);

    const {postId} =useParams();
    useEffect(()=>{
        try {
            const getPost=async()=>{
                const res=await fetch(`/api/post/getPosts?postId=${postId}`);
                const data=await res.json();
                if(!res.ok){
                    console.log(data.message);
                    return;
                }
                if(res.ok){
                    setPostData(data.posts[0]);
                    setLoading(false);
                }
            }
            getPost();

        } catch (error) {
            console.log(error);
        }
    },[postId])

    if (loading == true) {
        return <div className='absolute
        text-xl z-100 bg-pink-200 h-full w-full text-white 
        flex justify-center font-bold'>Loading...</div>
    }

    return (
        <div className='w-full'>
            <div className='w-[90%] mt-8 mx-auto dark:bg-gray-800
            flex flex-col justify-center items-center p-5 space-y-6 '>
                <h1>Title: {postData?.title}</h1>
                <span>Category: {postData && postData.category}</span>
                <img src={postData && postData.image} alt={postData?.title} />
                <span>Created At: {postData && new Date(postData.createdAt).toLocaleDateString()}</span>

                <div className='dark:text-white' dangerouslySetInnerHTML={{__html:postData && postData.content}}></div>

            </div>
        </div>
    )
}
