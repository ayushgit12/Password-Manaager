import React from 'react'

function Navbar() {
     return (
          <nav className='bg-purple-200'>
               <div className='mycontainer flex justify-between px-4 py-5 min-h-14 items-center'>
                    <div className="logo font-bold text-2xl">
                         <span className='text-purple-600'>&lt;</span>Pass<span className='text-purple-600'>OP / &gt;</span>
                    </div>
                    <ul className='hidden md:block'>
                         <li className='flex gap-4 '>
                              <a href="/" className='hover:font-bold'>Home</a>
                              <a href="/" className='hover:font-bold'>About</a>
                              <a href="/" className='hover:font-bold'>Contact</a>
                         </li>
                    </ul>
                    <button className="logo bg-purple-600 text-white flex gap-3 p-2 rounded-full items-center">
                         <img src="src/assets/github.png" className='' width={'30px'} alt="" />Github
                    </button>
               </div>
          </nav>
     )
}

export default Navbar
