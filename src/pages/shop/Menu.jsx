import React, { useEffect, useState } from "react";
import Card from "../home/Card";
import sort from "/sort.png";
import logo from "/logo.png";
import Navbar from "../../components/Navbar";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await fetch("https://foodle-backend.onrender.com/menu");
        const data = await response.json();
        setMenu(data);
        setFilteredItems(data);
        setLoading(false);
      } catch (error) {
        console.log("Error Fetching data", error);
        setLoading(false);
      }
    };
    fetchdata();
  }, []);

  const filtering = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((items) => items.category === category);
    setFilteredItems(filtered);
    setSelectedCategory(category);
  };

  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
  };

  const handleSortChange = (option) => {
    setSortOption(option);
    let sortedItems = [...filteredItems];
    switch (option) {
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    setFilteredItems(sortedItems);
  };
  const [isSticky, setSticky] = useState(false);
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
  // ${isSticky ?" bg-red-50 fixed top-0 left-0 right-0 transition-all duration-1000 ease-in-out ":""}
  return (
    <div className="bg-slate-50 w-full pb-16">
      <Navbar/>
      <div className=" bg-red-50  shadow-md shadow-gray-200 flex flex-col justify-center items-center pb-14 pt-6 px-16 ">
        {/* <div className="">
        
          <span className=" text-4xl flex flex-row gap-2 items-center mb-8 text-black">
            <a className="size-12 pt-2" href="/">
              <img src={logo} alt="yo" />
            </a>
            <h1>
              <a href="/">Foodle</a>
            </h1>
          </span>
        </div> */}


        <div 
        className={`" flex gap-6 items-center justify-center text-stone-500 py-5 " ${
          isSticky
            ? "z-20 bg-red-50 fixed top-0 left-0 right-0  px-24 pt-10 pb-12 transition-all ease-in-out duration-0":" "
            
        }`}
        // className=" flex gap-6 items-center justify-center text-stone-500 py-5"
        >
          <div
            onClick={showAll}
        
            className="w-1/12 flex flex-col justify-center items-center gap-2 text-lg text-center "
          >
            <img
              src="/images/recipes/bro.png"
              className="rounded-full h-20 w-20 hover:shadow-xl hover:shadow-slate-500 hover:-translate-y-5 hover:scale-110 duration-100 transition-all ease-in-out"
              alt="yo"
            />

            <button className="max-h-5  ">All</button>
          </div>

          <div
            onClick={() => filtering("Burger")}
            className="w-1/12 flex flex-col justify-center items-center gap-2 text-lg text-center "
          >
            <img
              src="/images/recipes/burger.png"
              className="rounded-full h-20 w-20 hover:shadow-xl hover:shadow-slate-500 hover:-translate-y-5 hover:scale-110 duration-100 transition-all ease-in-out"
              alt="yo"
            />
            <button className=" max-h-5">Burgers</button>
          </div>
          <div
            onClick={() => filtering("Fries")}
            className="w-1/12  flex flex-col justify-center items-center gap-2  text-lg text-center"
          >
            <img
              src="/images/recipes/fries.png"
              className="rounded-full h-20 w-20  hover:shadow-xl hover:shadow-slate-500 hover:-translate-y-5 hover:scale-110 duration-100 transition-all ease-in-out"
              alt="yo"
            />
            <button className=" max-h-5">Fries</button>
          </div>
          <div
            onClick={() => filtering("Pizza")}
            className="w-1/12  flex flex-col justify-center items-center gap-2  text-lg text-center"
          >
            <img
              src="/images/recipes/pizza2.png"
              className="rounded-full h-20 w-20 hover:shadow-xl hover:shadow-slate-500 hover:-translate-y-5 hover:scale-110 duration-100 transition-all ease-in-out"
              alt="yo"
            />
            <button className=" max-h-5 ">Pizza</button>
          </div>
          <div
            onClick={() => filtering("Starters")}
            className="w-1/12  flex flex-col justify-center items-center gap-2 text-lg text-center"
          >
            <img
              src="/images/recipes/starter.png"
              className="rounded-full h-20 w-20 hover:shadow-xl hover:shadow-slate-500 hover:-translate-y-5 hover:scale-110 duration-100 transition-all ease-in-out"
              alt="yo"
            />
            <button className=" max-h-5 ">Starters</button>
          </div>
          <div
            onClick={() => filtering("Soup")}
            className="w-1/12  flex flex-col justify-center items-center gap-2 text-lg text-center"
          >
            <img
              src="/images/recipes/soup.png"
              className="rounded-full h-20 w-20 hover:shadow-xl hover:shadow-slate-500 hover:-translate-y-5 hover:scale-110 duration-100 transition-all ease-in-out"
              alt="yo"
            />
            <button className=" max-h-5">Soups</button>
          </div>
          <div
            onClick={() => filtering("South")}
            className="w-1/12  flex flex-col justify-center items-center  gap-2 text-lg text-center "
          >
            <img
              src="/images/recipes/dosa.png"
              className="rounded-full h-20 w-20 hover:shadow-xl hover:shadow-slate-500 hover:-translate-y-5 hover:scale-110 duration-100 transition-all ease-in-out"
              alt="yo"
            />

            <button className=" max-h-5 ">South Indian</button>
          </div>
          <div
            onClick={() => filtering("Main Course")}
            className="w-1/12  flex flex-col justify-center items-center gap-2 text-lg text-center"
          >
            <img
              src="/images/recipes/maincourse.png"
              className="rounded-full h-20 w-20 hover:shadow-xl hover:shadow-slate-5000 hover:-translate-y-5 hover:scale-110 duration-100 transition-all ease-in-out"
              alt="yo"
            />
            <button className=" max-h-5 ">Main Course</button>
          </div>
          <div
            onClick={() => filtering("Bread")}
            className="w-1/12  flex flex-col justify-center items-center gap-2 text-lg text-center "
          >
            <img
              src="/images/recipes/roti.png"
              className="rounded-full h-20 w-20 hover:shadow-xl hover:shadow-slate-500 hover:-translate-y-5 hover:scale-110 duration-100 transition-all ease-in-out"
              alt="yo"
            />
            <button className=" max-h-5">Indian Bread</button>
          </div>
          <div
            onClick={() => filtering("Rice")}
            className="w-1/12  flex flex-col justify-center items-center gap-2 text-lg text-center"
          >
            <img
              src="/images/recipes/rice.png"
              className="rounded-full h-20 w-20 hover:shadow-xl hover:shadow-slate-500 hover:-translate-y-5 hover:scale-110 duration-100 transition-all ease-in-out"
              alt="yo"
            />
            <button className=" max-h-5">Rice</button>
          </div>
          <div
            onClick={() => filtering("Dessert")}
            className="w-1/12  flex flex-col justify-center items-center gap-2 text-lg text-center"
          >
            <img
              src="/images/recipes/dessert.png"
              className="rounded-full h-20 w-20 hover:shadow-xl hover:shadow-slate-500 hover:-translate-y-5 hover:scale-110 duration-100 transition-all ease-in-out"
              alt="yo"
            />
            <button className=" max-h-5">Desserts</button>
          </div>
        </div>
      </div>

      <div className="relative pt-10  text-sm">
        <div
          className={`absolute right-32  border-2 border-stone-500 rounded-3xl flex justify-center items-center pl-4 pr-2 py-1 gap-1 `}
        >
          <a className="size-3 mt-1 " href="">
            <img src={sort} alt="yo" />
          </a>
          <select
            name="Sort"
            id="Sort"
            onChange={(e) => handleSortChange(e.target.value)}
            value={sortOption}
            className=" text-stone-500 bg-slate-50"
          >
            <option value="default">Default</option>
            <option value="low-to-high">Low to High</option>
            <option value="high-to-low">High to Low</option>
            <option value="A-Z">A-Z</option>
            <option value="Z-A">Z-A</option>
          </select>
        </div>
      </div>

    <div className="py-20">
        {loading ? (
          <div className="flex justify-center items-center">
            <AiOutlineLoading3Quarters className="animate-spin text-4xl text-gray-500" />
          </div>
        ) : (
          <div className="flex flex-wrap px-28 gap-20 justify-center">
            {filteredItems.map((item) => (
              <Card key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
