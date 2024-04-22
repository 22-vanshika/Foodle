import React from "react";
import { FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const AddMenu = () => {
    
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  // image hosting key
//   const image_hosting_key = "af1059ba728ef08775550247d368fcb2";
//   console.log(image_hosting_key);
//   const image_hosting_api = `https://api.imgbb.com/1/upload?key=af1059ba728ef08775550247d368fcb2`;
  const onSubmit = async (data) => {
    // console.log(data);
    // const imageFile = { image: data.image[0] };
    // const hostingImg = await axiosPublic.post(image_hosting_api, imageFile, {
    //   headers: {
    //     "content-type": "multipart/form-data",
    //   },
    // });
    // // console.log(hostingImg.data)
    // if (hostingImg.data.success) {
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        image: 'https://newsinhealth.nih.gov/sites/nihNIH/files/styles/featured_media_breakpoint-large/public/2023/August/aug-2023-cover-illustration-different-types-foods-five-food-groups-vegetables-fruits-dairy-products-oils-proteins.jpg?itok=1I_7PRfJ',
      };

      // console.log(menuItem);
      const postMenuItem = axiosSecure.post("/menu", menuItem);
      if (postMenuItem) {
        reset();
        Swal.fire({
          position: "centre",
          icon: "success",
          title: "Your Item is inserted successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    // }
  };

  return (
    <div className="w-full max-auto ">
      <h2 className="text-3xl py-4 ">
        Upload a New <span className="text-red-600">Menu Item</span>
      </h2>
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full py-3">
            <label className="label">
              <span className="label-text text-xl ">Item Name</span>
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="name"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control flex flex-col  gap-5 py-3 w-full">
            <div className="form-control w-1/2 ">
              <label className="label ">
                <span className="label-text text-xl">Choose Category</span>
              </label>
              <select
                {...register("category", { required: true })}
                className="select select-bordered"
                defaultValue="default"
              >
                <option disabled value="default">
                  Select a category
                </option>
                <option value="Burger">Burger</option>
                <option value="Fries">Fries</option>
                <option value="Pizza">Pizza</option>
                <option value="Starters">Starters</option>
                <option value="Soup">Soup</option>
                <option value="South">South Indian</option>
                <option value="Main Course">Main Course</option>
                <option value="Indian Bread">Indian Bread</option>
                <option value="Rice">Rice</option>
                <option value="Dessert">Dessert</option>
              </select>
            </div>

            <div className="form-control  w-1/2">
              <label className="label">
                <span className="label-text text-xl ">Price</span>
              </label>
              <input
                type="number"
                {...register("price", { required: true })}
                placeholder="Price"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div> */}
            {/* <File/> */}
          {/* <div className="form-control w-full py-3 mb-10 ">
            <label className="label">
              <span className="label-text text-xl">Pick a file</span>
            </label>
            <input
              {...register("image", { required: false })}
              type="file"
              className="file-input w-full max-w-xs"
            /> 
          </div> */}

          <button className="btn border-2 border-red-600 text-lg rounded-3xl mt-10">
            <FaUtensils /> Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMenu;
