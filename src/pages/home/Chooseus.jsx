import React from "react";
import bowl from "/bowl.png";
import delivery from "/delivery.png";
import quality from "/quality.png";

const Chooseus = () => {
  return (
    <div className="bg-slate-50 px-24 pt-36 py-10">
      <div>
        <div className="  flex justify-around">
          <div className=" text-6xl pr-16 text-gray-700">
            <h1>
              Why <span className="text-red-500">Choose</span> Us
            </h1>
          </div>
          <div className=" pl-96  text-stone-500 pt-10 text-lg">
            <h2>
              Indulge in a global culinary journey at Foodle, where quality
              meets affordability.
            </h2>
          </div>
        </div>
        <div className=" flex pt-32 px-10 gap-28 justify-center ">
          <div className=" rounded-3xl shadow-lg shadow-stone-300 w-1/3 flex flex-col justify-center  items-center p-7 hover:-translate-y-4 duration-300 transition-all">
            <img className="h-16" src={bowl} alt="ye" />
            <h2 className="text-3xl mt-7 text-gray-700">Cuisine and Menu</h2>
            <div className="flex justify-center flex-col items-center mt-5 text-stone-500">
              <p>Diverse, mouthwatering options</p>
              <p>Palate-perfect menu</p>
            </div>
          </div>
          <div className="rounded-3xl shadow-lg shadow-stone-300 w-1/3 flex flex-col justify-center  items-center p-7 hover:-translate-y-4 duration-300 transition-all">
            <img className="h-16 " src={quality} alt="ye" />
            <h2 className="text-3xl mt-7 text-gray-700">Quality of Food</h2>
            <div className="flex justify-center flex-col items-center mt-5 text-stone-500">
              <p>Finest, top-notch ingredients</p>
              <p>Delicious, high-quality dishes</p>
            </div>
          </div>
          <div className=" rounded-3xl shadow-lg shadow-stone-300 w-1/3 flex flex-col justify-center  items-center p-7 hover:-translate-y-4 duration-300 transition-all">
            <img className="h-16" src={delivery} alt="ye" />
            <h2 className="text-3xl mt-5 text-gray-700">Service</h2>
            <div className="flex justify-center flex-col items-center mt-5 text-stone-500">
              <p>Seamless, enjoyable experience</p>
              <p>Exceptional customer priority</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chooseus;
