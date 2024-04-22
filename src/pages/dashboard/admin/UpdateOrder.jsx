import React from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUtensils } from 'react-icons/fa';


const UpdateOrder = () => {
  
    const item = useLoaderData();
    const { register, handleSubmit, reset } = useForm();
    const axiosSecure = useAxiosSecure();

    const navigate = useNavigate()
    const onSubmit = async (data) => {
        const order = {
               status:data.status
        };
        const postMenuItem = axiosSecure.patch(`/payments/${item._id}`, order);
        if(postMenuItem){
          reset()
          Swal.fire({
            position: "centre",
            icon: "success",
            title: "Your item updated successfully!",
            showConfirmButton: false,
            timer: 1500
          });
          navigate("/dashboard/manage-bookings")
        }
    };
  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Update <span className="text-green">Status</span>
      </h2>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>

            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Status*</span>
              </label>
              <select
                {...register("status", { required: true })}
                className="select select-bordered"
                defaultValue={item.status}
              >
                <option disabled value="default">
                  Select a Status
                </option>
                <option value="Order Pending!">Order Pending!</option>
                <option value="Order Processing!">Order Processing!</option>
                <option value="Order Deliverd!">Order Deliverd!</option>
                {/* <option value="dessert">dessert</option>
                <option value="drinks">Drinks</option>
                <option value="popular">Popular</option> */}
              </select>
            </div>

          <button className="btn border-2 border-red-600 px-6 mt-5">
            Update Item <FaUtensils />
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateOrder