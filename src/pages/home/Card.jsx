import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import Swal from 'sweetalert2'
import useCart from "../../hooks/useCart";



// or via CommonJS
  // const navigate= useNavigate();
  // const loaction= useLocation();
  

const Card = ({ item }) => {
  const [cart,refetch] =useCart()

  const { user } = useContext(AuthContext);
  const handleAddToCart = (item) => {

    // if(user){
    console.log("bro");
    const { name, image, category, price } = item;
    
      const cartItem = {
        // itemId: _id,
        name,
        image,
        price,
        quantity: 1

      };
      console.log(cartItem)
      fetch("https://foodle-backend.onrender.com/carts", {
        method: "POST",
        headers: {
          'content-type': "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => {
          if(res.status === 200)
          {
            console.log("bro2");
            Swal.fire({
              title: "Item added to Cart!",
              width: 600,
              padding: "3em",
              confirmButtonColor: 'rgb(100 116 139)',
              color: "rgb(100 116 139)",
              background: "rgb(248 250 252) ",
              backdrop: `
              rgba(252 165 165/0.2)
              url("/images/nyan-cat.gif")
              left top
              no-repeat
              `
            });
            refetch()
        }
        else{
          Swal.fire({
            title: "Already added!",
            width: 600,
            padding: "3em",
            confirmButtonColor: 'rgb(100 116 139)',
            color: "rgb(100 116 139)",
            background: "rgb(248 250 252) ",
            backdrop: `
            rgba(252 165 165/0.2)
            url("/images/nyan-cat.gif")
            left top
            no-repeat
            `
          });
          refetch()
        }
          return res.json()})
        .then((data) => {
          // if(data.status === 200)
          //   {
          //     console.log("bro2");
          //     Swal.fire({
          //       title: "Item added to Cart!",
          //       width: 600,
          //       padding: "3em",
          //       confirmButtonColor: 'rgb(100 116 139)',
          //       color: "rgb(100 116 139)",
          //       background: "rgb(248 250 252) ",
          //       backdrop: `
          //       rgba(252 165 165/0.2)
          //       url("/images/nyan-cat.gif")
          //       left top
          //       no-repeat
          //       `
          //     });
          //     refetch()
          // }
          // else{
          //   Swal.fire({
          //     title: "Already added!",
          //     width: 600,
          //     padding: "3em",
          //     confirmButtonColor: 'rgb(100 116 139)',
          //     color: "rgb(100 116 139)",
          //     background: "rgb(248 250 252) ",
          //     backdrop: `
          //     rgba(252 165 165/0.2)
          //     url("/images/nyan-cat.gif")
          //     left top
          //     no-repeat
          //     `
          //   });
          //   refetch()
          // }
        });
      // }
      // else{
      //   Swal.fire({
      //     title: "Please Login to add items to cart!",
      //     width: 600,
      //     padding: "3em",
      //     confirmButtonColor: 'rgb(100 116 139)',
      //     color: "rgb(100 116 139)",
      //     background: "rgb(248 250 252) ",
      //     backdrop: `
      //     rgba(252 165 165/0.2)
      //       url("/images/nyan-cat.gif")
      //       left top
      //       no-repeat
      //     `
      //   });
      // }
  };
  return (
    <div>
      <div className="bg-slate-50 rounded-3xl flex flex-col justify-center items-center h-64 w-60 shadow-lg  shadow-red-100 ">
        <div className=" rounded-full h-3/5 pt-5">
          {/* <Link to={`/regular/${item.id}`}> */}
          <figure>
            <img
              src={item.image}
              alt=""
              className=" rounded-full w-24 h-24 hover:border-2 border-red-500 hover:scale-125 transition-all duration-200"
            />
          </figure>
          {/* </Link> */}
        </div>

        <div className="flex items-center text-center text-lg text-gray-700 h-1/5  px-5">
          <h2>{item.name}</h2>
          {/* <p className="text-stone-500">{item.recipe}</p> */}
        </div>
        <div className="flex items-center gap-7  py-5">
          <div className=" text-gray-500 text-lg">
            <h5>
              <span>₹ </span>
              {item.price}
            </h5>
          </div>
          <div className="text-red-500 border-2 border-gray-700 p-2 rounded-3xl text-xs hover:scale-125 transition-all duration-200"
          onClick={() => handleAddToCart(item)}
          >
            <button 
            >
              Add To Cart {">"}{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
