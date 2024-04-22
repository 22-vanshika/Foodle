import React from "react";
import Navbar from "../../../components/Navbar";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaEdit, FaTrash, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const ManageBookings = () => {
  const token=localStorage.getItem('access-token')
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure();


    const { refetch, data:orders = []} = useQuery({
        queryKey:['orders'],
        queryFn: async () => {
            const data = await fetch(`https://foodle-backend.onrender.com/payments`,{
              headers:{
                authorization:`Bearer ${token}`
              }
            })
            return data.json();
          },
    })


    const handleDeleteItem = (item) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
          if (result.isConfirmed) {
            const res = await axiosSecure.delete(`/payments/${item._id}`);
            // console.log(res);
           if(res) {
            refetch();
            // Swal.fire({
            //   title: "Deleted!",
            //   text: "Your file has been deleted.",
            //   icon: "success",
            // });
           }
          }
        });
      };
    console.log("baby")

    console.log(orders)

    const formatDate=(createdAt)=>{
      const createAtDate=new Date(createdAt);
      return createAtDate.toLocaleDateString()
    }
  return (
    <div className="min-h-screen w-full">

   
        <div className="text-gray-700 text-3xl ">
          <h1>
            Track all <span className="text-red-600 ">Orders!</span>
          </h1>


      {
        (orders.length > 0) ? 
      <div className="flex flex-col justify-center items-center  w-full mt-16">
        <div className="overflow-x-auto  ">
          <table className="table ">
            {/* head */}

            <thead className="text-gray-700  text-xl bg-red-50 ">
              <tr>
                <th>#</th>
                <th>Order Date</th>
                <th>Transaction Id</th>
                <th>Prices</th>
                <th>Status</th>
                <th>Edit Status</th>
                <th>Action</th>

              </tr>
            </thead>

            <tbody className="text-md">
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

                    <td className="text-center">
                    <Link to={`/dashboard/update-order/${item._id}`}>
                      <button className="btn btn-ghost btn-xs bg-yellow-600 text-white">
                        <FaEdit />
                      </button>
                    </Link>
                    </td>
                    <td>
                    <button
                      onClick={() => handleDeleteItem(item)}
                      className="btn btn-ghost btn-xs text-red"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
        
           : <div className="text-center text-gray-700 text-5xl flex justify-center flex-col items-center mt-60">
           <p>No Orders! </p>
           {/* <Link to="/menu"><button className="btn border-2 border-red-600 mt-6">Back to Menu</button></Link> */}
         </div>
      }
      </div>
    </div>
  );
};

export default ManageBookings;
