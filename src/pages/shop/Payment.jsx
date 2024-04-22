import React from 'react'
import Navbar from '../../components/Navbar'
import {Elements} from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'
import {loadStripe} from '@stripe/stripe-js';
import useCart from '../../hooks/useCart';

const stripePromise=loadStripe('pk_test_51OxXRKSCCkZ2sa3SdCqoRqHyHDQxM9eJ2a6se6qcQzW4nmP41Y5cJH9nHYU6ySk3uMYHwGdTnG1n0O89KxMjKKJj0079j2vpkV')

const Payment = () => {
  const[cart]=useCart();
  const cartTotal=cart.reduce((sum,item)=>sum+item.price,0)
  console.log(cartTotal);
  return (
    <div>
        <Navbar/>
        <div className='px-20 py-16 min-h-screen'>
            <Elements stripe={stripePromise}>
                <CheckoutForm price={cartTotal} cart={cart}/>
            </Elements>
        </div>
    </div>
  )
}

export default Payment