import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import useCart from "../../hooks/useCart";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cart, refetch] = useCart();
  const [cartItems,setcartItems]=useState([])

  const calculatePrice=(item)=>{
    return item.price*item.quantity;

  }

  const calsubtotal=cart.reduce((total,item)=>{
    return total+calculatePrice(item);

  },0);
  const orderTotal=calsubtotal;

  
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(100 116 139)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        refetch();

        fetch(`https://foodle-backend.onrender.com/carts/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
            }
          });
          refetch();

      }
    });
  };

  const handleDec = (item) => {
    if(item.quantity>1){

        fetch(`https://foodle-backend.onrender.com/carts/${item._id}`,{
            method:"PUT",
            headers:{
                "Content-type":"application/json; charset=UTF-8"
            },
            body:JSON.stringify({quantity:item.quantity-1})
        }).then(res=>res.json()).then(data=>{
            const updateCart=cartItems.map((cartItem)=>{
                if(cartItem.id===item.id){
        refetch()
    
                    return{
                        ...cartItem,
                        quantity:cartItem.quantity-1
    
                    }
                }
        refetch()
    
                return cartItem;
            })
        refetch()
    
            setcartItems(updateCart)
        })
        refetch()
    }
    else{
        
        Swal.fire({
            title:"Item quantity cannot be ZERO!",
            confirmButtonColor: "rgb(100 116 139)"});
    }
  };
  const handleInc = (item) => {

    fetch(`https://foodle-backend.onrender.com/carts/${item._id}`,{
        method:"PUT",
        headers:{
            "Content-type":"application/json; charset=UTF-8"
        },
        body:JSON.stringify({quantity:item.quantity+1})
    }).then(res=>res.json()).then(data=>{
        const updateCart=cartItems.map((cartItem)=>{
            if(cartItem.id===item.id){
    refetch()

                return{
                    ...cartItem,
                    quantity:cartItem.quantity+1

                }
            }
    refetch()

            return cartItem;
        })
    refetch()

        setcartItems(updateCart)
    })
    refetch()
  };
  return (
    <div className="min-h-screen bg-slate-50 ">
      <Navbar />



      {
        (cart.length > 0) ? 
      <div className="flex flex-col justify-center items-center py-16 gap-12">
          
        <div className="text-gray-700 text-6xl">
          <h1>
            Items added to the <span className="text-red-600">Cart</span>
          </h1>
        </div>

        <div className="flex flex-col items-center justify-center gap-3">
          <h3 className="text-xl text-gray-700 underline">Shopping Details</h3>
          <p>
            Total Items : <span className="text-red-600">{cart.length}</span>
          </p>
          <p>
            Total Price : <span className="text-red-600">${orderTotal} Rs.</span>
          </p>
          <Link to='/process-checkout'>
          <button className="btn border-2 border-red-600 rounded-full">
            Proceed Checkout -&gt;
          </button>
          </Link>
        </div>
        <div className="overflow-x-auto w-full px-32">
          <table className="table">
            {/* head */}

            <thead className="text-gray-700  text-2xl bg-red-50">
              <tr>
                <th>#</th>
                <th>Food</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody className="text-lg">
              {/* row 1 */}

              {cart.map((item, index) => (
                <tr>
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-16 h-16">
                          <img src={item.image} alt="" />
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="">{item.name}</td>
                  <td >
                    <button
                      className="btn btn-s "
                      onClick={() => handleDec(item)}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={() => console.log(item.quantity)}
                      className="w-10 mx-2 text-center overflow-hidden appearance-none"
                    />
                    <button className="btn btn-s "
                     onClick={()=>handleInc(item)}
                      >+</button>
                  </td>
                  <td>{calculatePrice(item)} Rs.</td>

                  <th>
                    <button
                      className="btn btn-ghost btn-lg text-red-500 rounded-full"
                      onClick={() => handleDelete(item)}
                    >
                      <FaTrash />
                    </button>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
        
           : <div className="text-center text-gray-700 text-5xl flex justify-center flex-col items-center mt-60">
           <p>Cart is empty.  <span className="text-red-600">Please add products.</span> </p>
           <Link to="/menu"><button className="btn border-2 border-red-600 mt-6">Back to Menu</button></Link>
         </div>
      }
      </div>
  );
};

export default CartPage;
