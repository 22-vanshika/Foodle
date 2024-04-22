import React from "react";
import review from "/review.png";
import customer from "/customer.png";
import star from "/star.png";

const Testimonal = () => {
  return (
    <div className=" bg-slate-50 flex justify-center px-24 pt-40 pb-60 flex-row-reverse">
      <div className="hover:scale-105 transition-all duration-200 w-2/ ">
        <a className=" " href="">
          <img src={review} alt="yo" />
        </a>
      </div>
      <div className=" text-left flex flex-col w-3/5 gap-10">
        <p className="text-6xl text-gray-700 ">Testimonials</p>
        <h2 className="text-3xl text-red-500 ">
          What Our Customers Say About Us
        </h2>
        <blockquote className=" text-stone-500 mt-12">
          "Foodle is a fantastic place with super tasty food like the special
          dish they have. The staff is really nice, and the place looks cool,
          making it a perfect spot for a yummy and fun dining experience!"
        </blockquote>

        <div className="flex flex-col items-left justify-center h-16">
          <div className="flex items-center justify-left gap-3">
            <a href="">
              <img className="h-12" src={customer} alt="yo" />
            </a>
            <div>
              <p className="text-gray-500">Customer Feedbacks </p>
            </div>
          </div>

          <div className="flex flex-col ">
            <div className="flex items-baseline">
              <a className=" size-8" href="">
                <img src={star} alt="yo" />
              </a>
              <p className="text-gray-500">4.9 (18.6 Reviews)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonal;
