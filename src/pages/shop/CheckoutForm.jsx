import React, { useEffect, useState } from "react";
import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FaPaypal } from "react-icons/fa";
import { set } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const CheckoutForm = ({ price, cart }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (typeof price !== "number" || price < 1) {
      console.log("Price is not a number or is less than 1!");
      return;
    }
    axiosSecure.post("/create-payment-intent", { price }).then((res) => {
      console.log(res.data.clientSecret);
      setClientSecret(res.data.clientSecret);
    });
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
    } else {
      setCardError("");
      console.log("[PaymentMethod]", paymentMethod);
    }
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName || "anonymous",
          },
        },
      });
    if (confirmError) {
      console.log(confirmError.payment_intent.status);
    }
    if (confirmError.payment_intent.status == "requires_payment_method") {
      console.log(confirmError.payment_intent.id);
      // setCardError(`Your transaction Id is ${confirmError.payment_intent.id}`);

      const paymentInfo = {
        phoneNumber: user.phoneNumber,
        transactionId: confirmError.payment_intent.id,
        price,
        quantity: cart.length,
        status: "Order Pending!",
        itemName: cart.map((item) => item.name),
        cartItems: cart.map((item) => item._id),
      };
      console.log(paymentInfo);
      axiosSecure.post("/payments", paymentInfo).then((res) => {
        console.log(res.data);
        alert("payment Successful!");
        navigate('/order')
      });
    }
  };
  return (
    <div className="flex gap-40 w-full mt-16">
      {/* //left */}
      <div className="hover:-translate-y-6 transition-all ease-in-out bg-red-50 shadow-xl shadow-red-100 rounded-2xl w-1/3 text-3xl flex flex-col justify-center items-center">
        <h4 className="text-5xl pb-14">Order summary</h4>
        <p className="pb-5">Total Price: ₹{price} </p>
        <p>Number of Items: {cart.length}</p>
      </div>
      {/* //right */}
      <div className=" rounded-2xl w-2/3 bg-red-50 shadow-xl shadow-red-100  
      text-xl flex flex-col  text-center px-5 py-10 gap-5">
        <p className="text-4xl ">Process your Payment!</p>
        <h5 className="">Credit/Debit Card</h5>
        <form className="mx-20" onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button type="submit" className="btn w-1/3 border-2 border-red-400 mt-5" disabled={!stripe}>
            Pay
          </button>
        </form>
        {cardError ? <p className="text-red-600">{cardError}</p> : ""}
        {/* paypla */}
          <hr />
          <div className="w-full flex  items-center justify-center text-center ">
        <div className="flex flex-col w-1/3  ">
          <button type="submit" className="btn mt-5 border-2 border-red-400">
            Use QR-code for UPI Payments
          </button>
          <button type="submit" className="btn mt-5 border-2 border-red-400">
            Pay Offline
          </button>
        </div>

          </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
