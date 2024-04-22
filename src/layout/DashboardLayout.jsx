import React from "react";
import { Link, Outlet } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaCartPlus, FaHome, FaLocationArrow, FaQuestionCircle, FaUser, FaUsers } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import logo from "/logo.png";
import Modal from "../components/Modal";
import Swal from "sweetalert2";
// import useAdmin from "../hooks/useAdmin";
// import useAuth from "../hooks/useAuth";
const sharedLinks=(
  <>
  <li>
    <Link to='/'>
        <MdDashboard/> Home
    </Link>
  </li>
  <li>
    <Link to='/cart-page'>
        <FaCartPlus/> Cart
    </Link>
  </li>
  <li>
    <Link to="/menu">
        <FaLocationArrow/> Order Tracking
    </Link>
  </li>
  <li>
    <Link to="/menu">
        <FaQuestionCircle/> Customer Support
    </Link>
  </li>
  </>  
);

const DashboardLayout = () => {

  // const {loading}= useAuth()
  // const[isAdmin,isAdminLoading]=useAdmin();
  const isAdmin=true;

  return (
    <div>

      {
        isAdmin?
      <div className="drawer lg:drawer-open bg-slate-50 text-gray-700">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-start justify-start px-16 py-10 ">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
          <Outlet />
        </div>

        <div className="drawer-side text-gray-700">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <ul className="menu p-4 rounded-xl min-h-full bg-red-50  text-md text-gray-700">
            <li className="flex flex-row justify-center items-center mb-5 text-3xl">
              <Link to="/dashboard">
                <img className="w-10" src={logo} alt="yo" />
                <p className="\">Foodle</p>
                <span className="badge border-2 border-red-500 bg-red-50">Admin</span>
              </Link>
            </li>
            {/* Sidebar content here */}
            <li>
              <Link to="/dashboard">
                <MdDashboard />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/dashboard/manage-bookings">
                <FaShoppingBag />
                Manage Bookings
              </Link>
            </li>
            <li>
              <Link to="/dashboard/add-menu">
                <FaPlusCircle />
                Add Menu
              </Link>
            </li>
            <li>
              <Link to="/dashboard/manage-items">
                <FaEdit />
                Manage items
              </Link>
            </li>
            <li className="mb-3">
              <Link to="/dashboard/user">
                <FaUsers />
                All Users
              </Link>
            </li>

    <hr  />
            {/* shared */}

            {
                sharedLinks
            }
          </ul>
        </div>
      </div>:
      <div className=" bg-red-50 h-screen justify-center flex items-center text-center">
        <div className="justify-center flex items-center text-center bg-slate-50 size-80 rounded-2xl shadow-2xl shadow-gray-500 ">

        <div className="justify-center items-center text-center border-2 border-gray-300 size-64 flex flex-col rounded-xl  ">
            <p  className=" text-3xl mb-5">Only For Admin!</p>
            <Link className="rounded-full px-3 py-1 border-2 border-red-500 flex items-center justify-center gap-1 hover:scale-125 transition-all ease-in-out mb-1"  to='/'>
              <p> <FaHome/>
                </p>
                <p>Go Back to Home 
                  </p></Link>
            <button
                    className="rounded-full px-3 py-1 border-2 border-red-500 flex items-center justify-center hover:scale-125 transition-all ease-in-out"
                    onClick={() =>
                      document.getElementById("my_modal").showModal()
                    }
                  >
                    <FaUser className="size-3 " />
                    <p className="px-1 ">Login for Admin</p>
                  </button>
                      <Modal /> 
        </div>
        </div>
        
       {/* <button
                    className="rounded-full px-3 py-1 border-2 border-red-500 flex items-center justify-center hover:scale-125 transition-all ease-in-out"
                    onClick={() =>
                      document.getElementById("my_modal").showModal()
                    }
                  >
                    <FaUser className="size-3 " />
                    <p className="px-1 text-stone-500">Login for Admin</p>
                  </button>
                      <Modal /> */}

      </div>
      }
    </div>
  );
};

export default DashboardLayout;
