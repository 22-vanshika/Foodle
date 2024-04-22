import React, { useState, useEffect } from "react";
import Card from "./Card";

const Regularmenu = () => {
  const [isSticky, setSticky] = useState(false);
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    fetch("/regular.json")
      .then((res) => res.json())
      .then((data) => {
        const specials = data.filter((item) => item.category === "popular");
        setRecipes(specials);
      });
  }, []);

  return (
    <div className="px-24 pt-36 bg-slate-50">
      <div>
        <div className="flex gap-80">
          <div className="flex flex-col ">
            <div className=" text-6xl text-gray-700 w-80 ">
              <h1>
                Our <span className="text-red-500">Regular</span> Menu
              </h1>
            </div>
            <div className=" text-stone-500 text-lg  mt-5">
              <h2>You can order anything you like!</h2>
            </div>
          </div>

          <div className="pl-96 ">
            <a href="/menu">
              <button className="border-2 border-red-500 m-12 px-4 py-2 rounded-full text-slate-50 bg-red-500">
                See All &gt;
              </button>
            </a>
          </div>
        </div>

        <div className="flex flex-wrap gap-24 pt-24 justify-center ">
          {recipes.map((item, i) => (
            <Card key={i} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Regularmenu;
