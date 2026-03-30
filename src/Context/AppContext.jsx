import { createContext, useState } from "react";

const AppContext = createContext(null);

export const AppProvider = ({ children }) =>
{
  const [user, setUser] = useState(null);

  const clearUser = () => setUser(null);

  const contextValue = {
    user,
    setUser,
    clearUser
  };

  return (
      <AppContext.Provider value={contextValue}>
        {children}
      </AppContext.Provider>
  );
};

export default AppContext;