import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Home() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {

      try {
        const res = await fetch(`api/post/getPosts`);
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setLoading(false);
        }

      } catch (error) {
        console.log(error.message);
      }

    };
    fetchPosts();

  }, [])

  if (loading == true) {
    return <div className='absolute
    text-xl z-100 bg-pink-300 h-full w-full text-white 
    flex justify-center font-bold ' >Loading...</div>
  }

  return (
    <div>
      <div className='w-full flex flex-col justify-center items-center'>
        <h1 className='mt-5 font-bold text-2xl '>POSTS</h1>
        <div className='w-[90%] mt-5 grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3'>
          {posts && posts.map((post) => (
            <div className='flex flex-col m-5  rounded-md 
            cursor-pointer  border border-black overflow-hidden
            dark:bg-gray-800'
              key={post._id}>

              <div className='h-[50%] overflow-hidden '>
                <img  className='h-full w-full' src={post.image} alt="Can't load" />
              </div>

              <div className='ml-2 p-1'>
                <div className='mt-10'>
                  <h1 className='text-sm'><span className='font-bold'>Title:</span> {post.title}</h1>
                  <p className='text-sm'><span className='font-bold '>Created At:</span>{new Date(post.createdAt).toLocaleDateString()}</p>
                  <p className='text-sm'><span className='font-bold '>Category:</span>{post.category}</p>
                </div>
                <button className='bg-blue-500 text-white 
              font-semibold rounded-lg px-2 mt-5
               cursor-pointer hover:border border-black'
                  onClick={() => navigate(`/post/${post._id}/${post.slug}`)}>

                  See this post</button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
