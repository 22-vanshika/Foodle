import React, { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPhoneNumber,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import axios from "axios";
export const AuthContext = createContext();
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (phone, recaptcha) => {
    console.log("hm2")
    return signInWithPhoneNumber(auth, phone, recaptcha);
    
  };
  const logOut = () => {
    return signOut(auth);
  };

  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // if (currentUser) {
      //   const userInfo = { phoneNumber: currentUser.phoneNumber };
      //   axios.post("http://localhost:6001/jwt", userInfo)
      //   .then((response) => {
      //     // console.log(response.data.token);
      //     if(response.data.token){
      //       localStorage.setItem("access-token",response.data.token)
      //     }
      //   });
      // } else {
      //   localStorage.removeItem("access-token")
      // }
      setLoading(false);
    });

    return () => {
      return unsubscribe();
    };
  }, []);

  const authInfo = {
    user,
    login,
    logOut,
    updateUserProfile,
    loading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
