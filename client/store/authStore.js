import React, { useEffect, useState } from "react";
import { useContext } from "react";
const { DateTime } = require('luxon');

const AuthContext = React.createContext({
  isLoggedIn: false,
  userType: "",
  login: (data) => {},
  logout: () => {},
});
export const AuthContextProvider = (props) => {
  const [token, setToken] = React.useState("");
      const [isSidebarOpen, setIsSidebarOpen] = useState(false);
      const [airTimeData, setAirTimeData] = useState([]);
      const [person, setPerson] = useState({username: ""});


    const openSidebar = ()=> {
        setIsSidebarOpen(true)
    }
    const closeSidebar = ()=> {
        setIsSidebarOpen(false)
    }

  const userIsLoggedIn = !!token;

  let type = "";
  useEffect(() => {
    type = localStorage.getItem("accountType");
  }, [userIsLoggedIn, token]);
  const [accountType, setAccountType] = React.useState(type);

  const loginHandler = (data) => {
    setToken(data.data.token);
    localStorage.setItem("token", data.data.token);
    setAccountType(data.data.userType);
    localStorage.setItem("accountType", data.data.userType);
    console.log(data.data.userType, "loginHandler");
  };
  const generateRequestId = () => {
    const nigeriaTimeZone = 'Africa/Lagos';
    const now = DateTime.now().setZone(nigeriaTimeZone);
    
    const currentDate = now.toFormat('yyyyMMdd');
    const currentTime = now.toFormat('HHmmss');
    const currentSeconds = now.toFormat('ss');
    const newDate = now.toMillis();
  
    const formattedString = `${currentDate}${currentTime}${currentSeconds}${newDate}${'YourAdditionalTextHere'}`;
  
    // return formattedString;
  
    if (formattedString.length >= 15) {
      return formattedString.substring(0, 35);
    }
  
    return null; // Return null if the generated string is not at least 12 characters
  }

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
    setAccountType("");
    localStorage.removeItem("accountType");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: userIsLoggedIn,
        userType: accountType,
        login: loginHandler,
        logout: logoutHandler,
        requestId: generateRequestId(),
        airTimeData,
        setAirTimeData,
        openSidebar,
        closeSidebar,
        isSidebarOpen, 
        setIsSidebarOpen,
        person, setPerson
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export const useGlobalContext =()=> {
return useContext(AuthContext)
}

export default AuthContext;
