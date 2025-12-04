import React from 'react'
import Image from 'next/image'
import logo from 'vercel.svg'

export const Header = () => {
  return (

    // header color =bg-gray-900\  bg-[#1e1e1e]
        // <="h-full bg-linear-to-b from-gray-900 via-gray-900 to-gray-950 backdrop-blur-md p-6 flex flex-col border-r border-gray-800 shadow-2xl">

    // <header className='bg-linear-to-b from-gray-900 via-gray-900 to-gray-950 shadow-lg border-b border-[#1f1f1f] mx-4 sm:mx-6 lg:mx-8 rounded-lg'>
    <header className='bg-linear-to-b from-gray-900 via-gray-900 to-gray-950 shadow-lg border-b border-[#1f1f1f]'>
        <div className='max-w-7xl mx-auto py-4 px-4 sm:px-6 flex items-center justify-between'>
            <h1 className='text-lg sm:text-xl lg:text-1xl font-semibold text-gray-50'>Cloud Chronicle</h1>

{/* <header className='bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 shadow-lg border-b border-[#1f1f1f] mx-4 sm:mx-6 lg:mx-8 rounded-lg w-full'>
    <div className='w-full max-w-[90%] mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between'>
        <h1 className='text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold text-gray-50'>
            AKSiQ
        </h1> */}

        <div className='flex items-center space-x-3 sm:space-x-6'>
            <Image 
            src= '/vercel.svg'
            alt="uk flag"
            width={32}
            height={32}
            className='rounded-full shadow-md cursor-pointer'
            />   
        </div>
        </div>
    </header>
  )
}

export default Header;
