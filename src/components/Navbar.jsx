import React, { useEffect, useState, useContext } from "react";
import "./navbar.css";
import logo from "/logo.png";
import cart from "/cart.png";
import search from "/search.png";
import call from "/call.png";
import { FaUser } from "react-icons/fa";
import Modal from "./Modal";
import { AuthContext } from "../contexts/AuthProvider";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);
  const { user,loading } = useAuth();
  const [cart, refetch] = useCart();
  // console.log(cart)
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={`z-10 ${
        isSticky
          ? " bg-red-50 fixed top-0 left-0 right-0 transition-all duration-1000 ease-in-out "
          : ""
      }`}
    >
      <header>
        <div className="bg-red-50  px-16 py-8 shadow-lg  ">
          <div className="flex flex-row gap-9 mr-15">
            <span className=" text-4xl flex flex-row gap-2 items-center text-black">
              <a className="size-12 pt-2" href="/">
                <img src={logo} alt="yo" />
              </a>
              <h1>
                <a href="/">Foodle</a>
              </h1>
            </span>

            <div className="flex flex-row justify-center w-full gap-28 items-center text-stone-500 text-lg">
              <p className="text-black  ">
                <a href="/">HOME</a>
              </p>
              <button>
                <a className="hover:text-black" href="/menu">
                  Menu
                </a>
              </button>
              <p className="hover:text-black  ">Services</p>
              <p className="hover:text-black">Offers</p>
            </div>

            <div className="flex gap-3 items-center justify-center text-stone-500 ">
              <button
                className={`btn btn-ghost btn-circle hidden lg:flex ${
                  !user ? " w-12 " : "w-12"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              <Link to="/cart-page">
                <label
                  tabIndex={0}
                  className={` btn btn-ghost btn-circle hidden lg:flex items-center justify-center 
                
                `}
                >
                  <div className="indicator">
                    {/* <a href="">
                    <img
                      className={` ${!user ? " w-6 " : "w-6"}`}
                      src={cart}
                      alt="yo"
                    /> */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      // className={` ${!user ? " w-20 " : "w-30"}`}
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    {/* </a> */}
                    <span className="badge badge-sm indicator-item">
                      {cart.length || 0}
                    </span>
                  </div>
                </label>
              </Link>

              <div className="">
                {user ? (
                  <Profile user={user} />
                ) : (
                  <button
                    className="rounded-full px-3 py-1 border-2 border-red-500 flex items-center justify-center hover:scale-125 transition-all ease-in-out"
                    onClick={() =>
                      document.getElementById("my_modal").showModal()
                    }
                  >
                    <FaUser className="size-3 " />
                    <p className="px-1 text-stone-500">Login</p>
                  </button>
                )}
              </div>
            </div>

            <Modal />
          </div>
        </div>
      </header>
      <footer></footer>
    </div>
  );
};

export default Navbar;
