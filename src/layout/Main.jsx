import React, { useContext } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../pages/home/Footer'
// import { AuthContext } from "../contexts/AuthProvider";
// import LoadingSpinner from "../components/LoadingSpinner";
const Main=()=>{
    // const {loading} = useContext(AuthContext);
    return (
        // <div className="bg-prigmayBG">
     
        <div>

        <Outlet />
        <Footer />
      </div>
       
    // </div>
    )
  }
  export default Main
  
//   {loading ? (
//     <LoadingSpinner />
//   ) : (
// )}