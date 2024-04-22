import { FcCancel } from "react-icons/fc";
import React, { useContext, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useForm } from "react-hook-form";
import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { AuthContext } from "../contexts/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
// import useAxiosPublic from "../hooks/useAxiosPublic";
// import User from "../pages/dashboard/admin/User";

const Modal = () => {
  const {
    formState: { errors },
  } = useForm();
  const { login, updateUserProfile,user} = useContext(AuthContext);
  const [phone, setPhone] = useState("");
  const [User, setUser] = useState(null);
  const [otp, setOtp] = useState("");
  const [flag, setFlag] = useState(false);
  const [flag2, setFlag2] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  // const axiosPublic = useAxiosPublic();

  const sendOtp = async () => {
    try {
      setErrorMessage("");
      if (phone === "" || phone == undefined) {
        // const errorMessage = error.message;
        setErrorMessage("Provide a Phone Number!");
        console.log("bro");
        return;
      }
      const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {
        size: "invisible",
        callback: () => {},
      });
      console.log("hm1");

      const confirmation = await login(phone, recaptcha);
      console.log("hm");
      setFlag(true);
      setUser(confirmation);
    } catch (error) {
      // setErrorMessage(error);
    }
  };
  const verifyOtp = async () => {
    setErrorMessage("");

    try {
      const data = await User
        .confirm(otp)
        .then((result) => {

          const user = result.user;
          try {
            updateUserProfile("User", "").then(() => {

              const userInfor = {
                phoneNumber: user.phoneNumber
              };
              console.log('puchu')
              console.log(userInfor)
              axios
                .post("https://foodle-backend.onrender.com/users", userInfor)
                .then((response) => {
                  // console.log(response);
                   console.log('puchu2')
                  alert("Signin successful!");
                  // navigate(from, { replace: true });
                });
            });
          } catch (error) {
            console.log("error hai!");
          }

          // ...
          setFlag2(true);
          document.getElementById("my_modal").close();
          navigate(from, { replace: true });
        })
        .catch((error) => {
          const errorMessage = error.message;
          setErrorMessage("Please Enter Correct OTP!");
          // User couldn't sign in (bad verification code?)
          // ...
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = () => {
    verifyOtp()
      .then((result) => {
        // const user = result.user;
      })
      .catch((error) => console.log(error));
  };

  // const {signUpWithGmail, login} = useContext(AuthContext);
  // const [errorMessage, setErrorMessage] = useState("");

  // const location = useLocation();
  // const navigate = useNavigate();
  // const from = location.state?.from?.pathname || "/";
  // const onSubmit = (data) => {
  //   const email = data.email;
  //   const password = data.password;

  //   login(email, password).then((result) => {
  //     const user = result.user;
  //     alert("Login successfull");
  //     document.getElementById("my_modal_5").close()
  //     navigate(from, {replace: true})
  //   }).catch((error) => {
  //     const errorMessage = error.message;
  //     setErrorMessage("Provide a correct email and password!")
  //   })
  // };

  //   const handleLogin = () => {
  //     signUpWithGmail().then((result) => {
  //       const user = result.user;
  //       alert("Login successfull!")
  //       navigate(from, {replace: true})
  //     }).catch((error) => console.log(error))
  //   }
  return (
    <div>
      <dialog
        id="my_modal"
        className=" rounded-2xl bg-red-50 py-8 px-8 w-96 -z-50"
      >
        <div className="">
          <div className="flex flex-col pb-3">
            <form
              className=" flex flex-row justify-between text-3xl items-center "
              method="dialog"
            >
              <div>
                <p>Please Login!</p>
              </div>
              <div className="pt-2 ">
                <form method="dialog">
                  <button
                    className=" hover:scale-150 transition-all ease-in-out"
                    onClick={() => document.getElementById("my_modal").close()}
                  >
                    <FcCancel className="size-7 " />
                  </button>
                </form>
              </div>
            </form>
          </div>

          <div className={` ${flag ? " hidden" : ""}`}>
            <div id="recaptcha" className="pb-3 z-auto"></div>
            <div className="form-control flex flex-col items-start   ">
              <label className="label ">
                <span className="label-text text-md">Enter Phone Number</span>
              </label>
              <PhoneInput
                country={"in"}
                value={phone}
                onChange={(phone) => setPhone("+" + phone)}
              />
            </div>
            {errorMessage ? (
              <p className="text-red-600 text-xs italic pt-2">{errorMessage}</p>
            ) : (
              ""
            )}
            <div className=" flex justify-center items-center">
              <button
                onClick={sendOtp}
                className=" border-2 border-red-600 text-stone-500 rounded-3xl px-2 py-1 mt-8  "
              >
                Send Otp
              </button>
            </div>
          </div>

          <div className={` ${flag ? " " : "hidden"}`}>
            <div className="form-control flex flex-col items-start ">
              <label className="label ">
                <span className="label-text text-md">Enter the OTP</span>
              </label>
              <input
                onChange={(e) => setOtp(e.target.value)}
                type="otp"
                // placeholder="otp"
                className="input input-bordered w-full rounded-md "
                // {...register("otp")}
              />
            </div>
            {errorMessage ? (
              <p className="text-red-600 text-xs italic pt-2">{errorMessage}</p>
            ) : (
              ""
            )}
            <div className=" flex justify-center items-center">
              <div className="flex flex-col gap-3">
                <button
                  onClick={verifyOtp}
                  className=" border-2 border-red-600 text-stone-500 rounded-3xl px-2 py-1 mt-8 "
                >
                  Verify otp
                </button>
                {/* 
                <div
                  className={`text-sm text-green-500 ${flag2 ? " " : "hidden"}`}
                >
                  <a href="/">Logged In Successfully! Go to Homepage -{">"}</a>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
