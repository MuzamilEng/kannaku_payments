const { createContext, useContext, useState } = require("react");


const AppContext = createContext();
export const AppProvider = (props)=> {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [person, setPerson] = useState("");

    const openSidebar = ()=> {
        setIsSidebarOpen(true)
    }
    const closeSidebar = ()=> {
        setIsSidebarOpen(false)
    }

    return (
        <AppContext.Provider value={{
            openSidebar,
            closeSidebar,
            isSidebarOpen, 
            setIsSidebarOpen,
            person, setPerson
        }}>
            {props.children}
        </AppContext.Provider>
    )
}

export const useGlobalContext =()=> {
return useContext(AppContext)
}

export default AppContext