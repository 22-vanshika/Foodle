import React from 'react'
import { useLoaderData, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaUtensils } from 'react-icons/fa';


const UpdateMenu = () => {
  
    const item = useLoaderData();
    console.log(item);
    const { register, handleSubmit, reset } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const navigate = useNavigate()
    const onSubmit = async (data) => {
        const menuItem = {
          name: data.name,
          category: data.category,
          price: parseFloat(data.price), 
        };
        const postMenuItem = axiosSecure.patch(`/menu/${item._id}`, menuItem);
        if(postMenuItem){
     
          reset()
          Swal.fire({
            position: "centre",
            icon: "success",
            title: "Your item updated successfully!",
            showConfirmButton: false,
            timer: 1500
          });

          navigate("/dashboard/manage-items")
        }
    //   }
    };
  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Update This <span className="text-green">Menu Item</span>
      </h2>

      {/* form here */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input
              type="text"
              defaultValue={item.name}
              {...register("name", { required: true })}
              placeholder="Recipe Name"
              className="input input-bordered w-full "
            />
          </div>

          {/* 2nd row */}
          <div className="flex items-center gap-4">
            {/* categories */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                {...register("category", { required: true })}
                className="select select-bordered"
                defaultValue={item.category}
              >
                <option disabled value="default">
                  Select a category
                </option>
                <option value="Soup">Soup</option>

                <option value="Starters">Starters</option>
                <option value="Pizza">Pizza</option>
                <option value="Burger">Burger</option>
                <option value="Fries">Fries</option>
                <option value="Bread">Bread</option>
                <option value="Dessert">Dessert</option>
                <option value="Rice">Rice</option>
                <option value="Main Course">Main Course</option>
              </select>
            </div>

            {/* prices */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                type="number"
                defaultValue={item.price}
                {...register("price", { required: true })}
                placeholder="Price"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* 3rd row */}
          {/* <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Details</span>
            </label>
            <textarea
             defaultValue={item.recipe}
              {...register("recipe", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Tell the worlds about your recipe"
            ></textarea>
          </div> */}

          {/* 4th row */}
          {/* <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div> */}

          <button className="btn border-2 border-red-600 px-6 mt-5">
            Update Item <FaUtensils />
          </button>
        </form>
      </div>
    </div>
  )
}

export default UpdateMenu