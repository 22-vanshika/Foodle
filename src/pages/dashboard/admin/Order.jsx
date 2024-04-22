import React from "react";
import Navbar from "../../../components/Navbar";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const Order = () => {
  const token=localStorage.getItem('access-token')
  const {user} = useAuth();
  console.log(user.phoneNumber);
    const { refetch, data:orders = []} = useQuery({
        queryKey:['orders',user?.phoneNumber],
        queryFn: async () => {
            const data = await fetch(`https://foodle-backend.onrender.com/payments`,{
              headers:{
                authorization:`Bearer ${token}`
              }
            })
            return data.json();
          },
    })
    console.log("baby")

    console.log(orders)

    const formatDate=(createdAt)=>{
      const createAtDate=new Date(createdAt);
      return createAtDate.toLocaleDateString()
    }
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex flex-col justify-center items-center py-16 gap-12">
        <div className="text-gray-700 text-6xl">
          <h1>
            Track all <span className="text-red-600">Orders!</span>
          </h1>
        </div>

      {
        (orders.length > 0) ? 
      <div className="flex flex-col justify-center items-center py-16 gap-12 w-full px-32">
        <div className="overflow-x-auto w-full ">
          <table className="table ">
            {/* head */}

            <thead className="text-gray-700  text-2xl bg-red-50 ">
              <tr>
                <th>#</th>
                <th>Order Date</th>
                <th>Transaction Id</th>
                <th>Prices</th>
                <th>Status</th>

              </tr>
            </thead>

            <tbody className="text-lg">
              {/* row 1 */}

              {orders.map((item, index) => (
                <tr>
                  <th>{index + 1}</th>
                  <td>
                   {formatDate(item.createdAt)}
                  </td>
                  <td className="">{item.transactionId}</td>
                  <td >
                {item.price} Rs.
                  </td>
                  <td>{item.status}</td>

         
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
        
           : <div className="text-center text-gray-700 text-5xl flex justify-center flex-col items-center mt-60">
           {/* <p>Cart is empty.  <span className="text-red-600">Please add products.</span> </p>
           <Link to="/menu"><button className="btn border-2 border-red-600 mt-6">Back to Menu</button></Link> */}
         </div>
      }
      </div>
    </div>
  );
};

export default Order;
