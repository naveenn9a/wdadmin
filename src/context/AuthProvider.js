import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  let authObj = localStorage.getItem('token')
  try {
    authObj = JSON.parse(localStorage.getItem('token'))
  } catch(e) {
    authObj = {}
  }

  const [auth, setAuth] = useState(authObj);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;