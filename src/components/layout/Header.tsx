import React from 'react'
import Image from 'next/image'
import logo from 'vercel.svg'

export const Header = () => {
  return (

    // header color =bg-gray-900\  bg-[#1e1e1e]
        // <="h-full bg-linear-to-b from-gray-900 via-gray-900 to-gray-950 backdrop-blur-md p-6 flex flex-col border-r border-gray-800 shadow-2xl">

    // <header className='bg-linear-to-b from-gray-900 via-gray-900 to-gray-950 shadow-lg border-b border-[#1f1f1f] mx-4 sm:mx-6 lg:mx-8 rounded-lg'>
<header className="bg-linear-to-b from-gray-900 via-gray-900 to-gray-950 shadow-lg border-b border-[#1f1f1f]">
  <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 flex items-center justify-between">
    
    {/* Title / Logo */}
    <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-wide">
      
    </h1>

    {/* Right side: user / icon */}
    <div className="flex items-center space-x-4 sm:space-x-6">
      <Image
        src="/vercel.svg"
        alt="User Icon"
        width={40}
        height={40}
        className="rounded-full shadow-lg cursor-pointer hover:scale-105 transition-transform duration-200"
      />
      
    </div>
  </div>
</header>
  )
}

export default Header;
