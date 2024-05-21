import React from 'react'
import Navbar from '../../components/Navbar'

import review from "/review.png";
import customer from "/customer.png";
import star from "/star.png";
const About = () => {
  return (

    <>
    <Navbar/>
    <div className='min-h-screen'>
    <div className=" bg-slate-50 flex justify-center px-24 pt-40 pb-60 flex-row-reverse">
      <div className="hover:scale-105 transition-all duration-200 w-2/ ">
        <a className=" " href="">
          <img src={review} alt="yo" />
        </a>
      </div>
      <div className=" text-left flex flex-col w-3/5 gap-10">
        <p className="text-6xl text-gray-700 ">About Us</p>
        {/* <h2 className="text-3xl text-red-500 ">
          What Our Customers Say About Us
        </h2> */}
        <blockquote className=" text-stone-500 mt-12 mb-10">
          "Foodle is a fantastic place with super tasty food like the special
          dish they have. The staff is really nice, and the place looks cool,
          making it a perfect spot for a yummy and fun dining experience!"
        </blockquote>
<div>
    <p >
        Created by :
        <hr />
        Vanshika Sharma &

        Aman Tiwari
    </p>
</div>
      </div>
    </div>
</div>
    </>
  )
}

export default About