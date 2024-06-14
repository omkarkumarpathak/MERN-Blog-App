import { Footer, FooterLinkGroup } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function FooterB() {
  return (
    <Footer>
      <div className=' w-full max-w-7xl mx-auto p-5  ' >
        <div className='flex flex-col sm:flex-row justify-evenly gap-4'>
        <div >

<Link to='/' className='ml-6 text-sm sm:text-lg font-semibold flex-nowrap
dark:text-white '>
  <span className='py-1.5 px-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 
  rounded-md mr-2 text-white'>Omkar's</span>
  Blog
</Link>
</div>

<div className='grid grid-cols-2 ml-6 mt-3 sm:mt-0 sm:grid-cols-3 gap-4 '>
<div >

  <h1 className='text-gray-500 font-semibold '>About</h1>
  <FooterLinkGroup className='flex flex-col'>
    <Footer.Link href='omkar.com'>
      100 js Projects
    </Footer.Link>
    <Footer.Link href='omkar.com'>
      100 js Projects
    </Footer.Link>


    <Footer.Link href='omkar.com'>
      100 js Projects
    </Footer.Link>

  </FooterLinkGroup>

</div>
<div>
  <h1 className='text-gray-500 font-semibold '>Follow Us</h1>
  <FooterLinkGroup className='flex flex-col'>
    <Footer.Link href='omkar.com'>
      100 js Projects
    </Footer.Link>


    <Footer.Link href='omkar.com'>
      100 js Projects
    </Footer.Link>


    <Footer.Link href='omkar.com'>
      100 js Projects
    </Footer.Link>

  </FooterLinkGroup>

</div>
<div>
  <h1 className='text-gray-500 font-semibold '>Legal</h1>
  <FooterLinkGroup className='flex flex-col'>

    <Footer.Link href='omkar.com'>
      100 js Projects
    </Footer.Link>


    <Footer.Link href='omkar.com'>
      100 js Projects
    </Footer.Link>


    <Footer.Link href='omkar.com'>
      100 js Projects
    </Footer.Link>

  </FooterLinkGroup>

</div>
</div>

        </div>
       
        <Footer.Divider/>
      </div>
       
    </Footer>
  )
}
