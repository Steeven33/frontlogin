import React, { useState } from "react";

const Context = React.createContext({})

export function Provider ({children}){
    const [info, setInfo] = useState([]);
    return <Context.Provider value={{info, setInfo}}>
        {children}
    </Context.Provider>
}
export default Context