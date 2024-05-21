import React from 'react'
import Navbar from '../../components/Navbar'

const Offers = () => {
  return (
    <>
    <Navbar/>
    <div className='min-h-screen pt-48 flex flex-col text-center gap-6'>
    <h1 className='text-3xl text-red-600'>No Offers available for now</h1>
    <h2 className='text-5xl'>Keep Visiting for upcoming offers!</h2>
    </div>
    </>
  )
}

export default Offers
