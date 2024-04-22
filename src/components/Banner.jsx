import React from 'react'
import omlet from "/omlet.png"
import chef from "/chef.png"
import purse from "/purse.png"
import play from "/play.png"
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


const Banner = () => {
    const[isSticky,setSticky]= useState(false);
    useEffect(()=>{
        const handleScroll=()=>{
            const offset = window.scrollY;
            if(offset>0){
                setSticky(true);
            }
            else{
                setSticky(false);
            }
        }
        window.addEventListener("scroll",handleScroll);
        return()=>{
             window.addEventListener("scroll",handleScroll);
        }
    },[])

  return (
    <div className=' bg-red-50  py-24'>
        
        <div className=' h-full  flex '>
            <div className='  pl-28 pt-10 w-3/5 ' >
                    <h1 className='text-7xl text-red-500 ' >Serving <span className=' text-yellow-500'>smiles</span>, one plate at a time!</h1>
                    <div className='flex mt-16 w-96' >
                    <a  className=" " href="/">
                        <img  src={chef} alt="yo" />
                    </a>   
                    <h2 className='text-stone-500 ' >Step into FOODLE, where we turn ordinary meals into taste adventures, cooking up smiles and good times on every plate.</h2>
                    </div>
                    <div className='flex gap-20 mt-16 pl-10 text-stone-500'> 
                        <div className='border-2 border-red-500  rounded-full pl-2 pr-5 py-2 flex items-center'>
                            <a  className=" size-10" href="/">
                                <img  src={purse} alt="yo" />
                            </a> 
                            <Link to={"/menu"} className=''>Order Now</Link>
                        </div>
                        <div className=' pl-3 pr-5 py-2  flex items-center gap-4 text-stone-500'>
                            <a  className=" size-7" href="/">
                                <img  src={play} alt="yo" />
                            </a> 
                            <button className=''>Watch Video</button>
                        </div>
                    </div>

            </div>
                    <a   className={` ${isSticky ?"":"w-2/5 pt-14 animate-bounceSlow"}`}href="/">
                    <img  src={omlet} alt="yo" />
                    </a>
        </div>
    </div>
  )
}

export default Banner