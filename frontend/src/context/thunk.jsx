import { createContext, useContext, useState, useEffect } from "react";
import {
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../config/firebase";

export const UserContext = createContext({});

export const useUserContext = () => {
  return useContext(UserContext)
};

export const UserContextProvider = ({children}) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState("")

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (res) => {
      if (res) {
        setUser(res);
      } else {
        setUser(null);
      }
      setError("");
      setLoading(false);
    });
    return unsubscribe;
  }, []);


  const forgotPassword = (email) => {
    return sendPasswordResetEmail(auth, email)
  }

  const contextValue = {
    user,
    forgotPassword
  }

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  )
}
