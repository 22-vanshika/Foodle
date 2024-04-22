import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../contexts/AuthProvider'
import { useQuery } from '@tanstack/react-query'

const useCart = () => {
    const token=localStorage.getItem('access-token')
    const {user} = useContext(AuthContext);
    const { refetch, data:cart = []} = useQuery({
        queryFn: async () => {
            const data = await fetch(`https://foodle-backend.onrender.com/carts`,{
              headers:{
                authorization:`Bearer ${token}`
              }
            })
            return data.json();
          },
    })

  return [cart,refetch]
}

export default useCart