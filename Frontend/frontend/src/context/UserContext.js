import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);

  return (
    <UserContext.Provider value={{ user, setUser, btnLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserData = () => {
  return useContext(UserContext);
};