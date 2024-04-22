import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaTrash, FaUser, FaUsers } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const User = () => {

  const axiosSecure = useAxiosSecure();
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(`https://foodle-backend.onrender.com/users`);
      console.log('ye')
      return res.json();
    },
  });
  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Enable admin access?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(100 116 139)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
      cancelButtonText: "No",

    }).then((result) => {
      if (result.isConfirmed) {

      axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
        refetch();
        // alert(`${user.phoneNumber} is now admin`);
        refetch();
      });
    }
    });
    
  };
  const handleDeleteUser = (user) => {



    Swal.fire({
      title: "Are you sure?",

      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(100 116 139)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete User!",
    }).then((result) => {
      if (result.isConfirmed) {
          axiosSecure.delete(`/users/${user._id}`).then((res) => {
            // alert(`${user.phoneNumber} is removed from database`);
            refetch();
          });

      }
    });
  };
  return (
    <div className="flex flex-col gap-16 text-lg">
      <div className="flex justify-between text-stone-700 ">
        <p>All Users</p>
        <p>Total Users:{users.length}</p>
      </div>

      <div className="overflow-x-auto ">
        <table className="table w-[870px] ">
          {/* head */}
          <thead className="bg-red-50 text-stone-700 text-lg ">
            <tr>
              <th>#</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="text-md">
            {users.map((user, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{user.phoneNumber}</td>
                <td>
                  {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button
                      onClick={()=>handleMakeAdmin(user)}
                      className="btn btn-s btn-circle bg-yellow-600 text-white"
                    >
                      <FaUsers />
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={()=>handleDeleteUser(user)}
                    className="btn  btn-s  text-red-600"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
            {/* {/* row 1 */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
