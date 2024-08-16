import { Button, Modal, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { FaTriangleExclamation } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export default function DashPosts() {

  const [posts, setUserPosts] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [loading,setLoading]=useState(true);

  const [showModal, setShowModal] = useState(false);
  const [postIdToDelete,setPostIdToDelete]=useState();

  console.log(posts);
  const navigate=useNavigate();


  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res=await fetch(`/api/post/deletePost/${postIdToDelete}/${currentUser._id}`,
        {
          method:'DELETE',
        }
      )

      const data=await res.json();

      if(!res.ok){
        console.log(data.message);
      }
      else{
        setUserPosts((prev)=>
          prev.filter((post)=> post._id!==postIdToDelete)
      );
      }
    } catch (error) {
      
    }
         
  }

  useEffect(() => {

    const fetchPosts = async () => {

      try {
        const res = await fetch(`api/post/getPosts`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          setLoading(false);
        }

      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser.isAdmin) fetchPosts();

  }, [currentUser._id]);

  if(loading==true){
    return <div className='absolute
    text-xl z-100 bg-pink-400 h-full w-full text-white 
    flex justify-center font-bold ' >Loading...</div>
  }

  return (
    <div>
      {(currentUser.isAdmin && posts.length > 0)
        ? (
          <>
            <Table hoverable className='shadow-md'>
              <Table.Head>
                <Table.HeadCell>Data updated</Table.HeadCell>
                <Table.HeadCell>Post image</Table.HeadCell>
                <Table.HeadCell>Post title</Table.HeadCell>
                <Table.HeadCell>Category</Table.HeadCell>
                <Table.HeadCell>Delete</Table.HeadCell>
                <Table.HeadCell><span>Edit</span></Table.HeadCell>

              </Table.Head>

              {posts.map((post) => (
                <Table.Body>
                  <Table.Row >
                    <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}
                      <button onClick={()=> navigate(`/post/${post._id}/${post.slug}`)} className='ml-2 cursor-pointer bg-gray-500
                       text-white rounded-md px-2 hover:border border-black '>See Post</button>
                    </Table.Cell>
                    <Table.Cell>
                      <Link to={`/post/${post.slug}`}>
                        <img src={post.image} alt={post.title} className='h-10 w-10 rounded-md object-cover' />
                      </Link>
                    </Table.Cell>

                    <Table.Cell>
                      <Link to={`/post/${post.slug}`}>
                        <span>{post.title}</span>
                      </Link>
                    </Table.Cell>

                    <Table.Cell>
                      <span>{post.category}</span>
                    </Table.Cell>

                    <Table.Cell>
                      <span onClick={()=>{
                        handleDeletePost;
                        setShowModal(true);
                        setPostIdToDelete(post._id);
                      }} 
                      className='font-semibold text-red-500 cursor-pointer'>Delete</span>
                    </Table.Cell>

                    <Table.Cell>
                      <Link to={`/update-post/${post._id}`} 
                      className='font-semibold text-blue-400-500 cursor-pointer'>Edit</Link>
                    </Table.Cell>


                  </Table.Row>

                </Table.Body>
              ))}
            </Table>

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
                    <Button color='failure' onClick={()=>{
                      handleDeletePost();
                    }}>
                      Yes, I'm sure
                    </Button>
                    <Button color='gray' onClick={() => setShowModal(false)}>
                      No, cancel
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </>

        )
        :
        (
          <p>No posts Here</p>
        )
      }
    </div>

  )
}
