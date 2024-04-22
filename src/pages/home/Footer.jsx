import React from 'react'
import logo from "/logo.png"
const Footer = () => {
  return (
    <div className='bg-red-50 text-slate-700 flex p-20 '>
        <div className='w-2/5 flex flex-col pl-10'>
            <div className='flex flex-row items-center gap-3 mb-8 '>
                <a  className="size-12 pt-2 " href="/">
                    <img  src={logo} alt="yo" />
                </a>
                <h1 className='text-5xl text-black'>Foodle</h1>
            </div>
            <div>
                <p>AV Industries Ltd.</p>
            </div>
            <div>
                <p>Providing Reliable tech!</p>
            </div>
        </div>
        <div className='w-1/5 '>
            <div> 
                <h1 className='text-red-500  mb-6 text-2xl'>Services</h1>
            </div>
            <div className='flex gap-4 flex-col'>
                <p>Branding</p>
                <p>Design</p>
                <p>Marketing</p>
                <p>Advertisements</p>
            </div>
        </div>
        <div className='w-1/5'>
        <div> 
                <h1 className='text-red-500 mb-6 text-2xl'>Company</h1>
            </div>
            <div className='flex gap-4 flex-col'>
                <p>About Use</p>
                <p>Contact</p>
                <p>Jobs</p>
            </div>
        </div>
        <div className='w-1/5'>
        <div> 
                <h1 className='text-red-500 mb-6 text-2xl'>Legal</h1>
            </div>
            <div className='flex gap-4 flex-col'>
                <p>Terms of Use</p>
                <p>Privacy Policy</p>
                <p>Cookie Policy</p>
            </div>
        </div>
    </div>
  )
}

export default Footer