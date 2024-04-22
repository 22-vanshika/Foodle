import React from "react";
import pizza from "/pizza.png";
import fries from "/fries.png";
import burger from "/burger.png";
import { Link } from "react-router-dom";

const Categories = () => {
  const popular = [
    { id: 1, title: "Burger", des: "Order Now >", image: "/burger.png" },
    { id: 1, title: "South Indian", des: "Order Now >", image: "/dosa.png" },
    { id: 1, title: "Dessert", des: "Order Now >", image: "/dessert.png" },
  ];
  return (
    <>
      <div className="bg-slate-50 pt-32">
        <div className=" px-24 flex justify-around">
          <div className=" text-6xl  text-gray-700">
            <h1>
              Best <span className="text-red-500">Delivered</span> Categories
            </h1>
          </div>
          <div className=" pl-96  text-stone-500 pt-16 text-lg">
            <h2>
              Discover our most beloved dishes – Order now and treat yourself to
              the flavors everyone can't get enough of!
            </h2>
          </div>
        </div>
        <div className=" flex px-16 pt-32 justify-center items-center">
          {popular.map((item, i) => (
            <div
              key={i}
              className="flex flex-col justify-center items-center h-96 w-1/3 gap-7 "
            >
              <div className=" hover:animate-bounceSlow size-64 border-2 border-gray-700 rounded-full  shadow-lg shadow-red-200">
                <img src={item.image} alt="" />
              </div>
              <div className="flex flex-col justify-center items-center gap-2 ">
                <h3 className="text-3xl text-gray-700">{item.title}</h3>
                <Link to={"/menu"} className="text-red-500">{item.des}</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
