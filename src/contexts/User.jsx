import { createContext, useEffect, useState } from "react"

export const UserContext = createContext()


const getLocalStorage = (key) => {
    const user = localStorage.getItem(key)
    if (user) return JSON.parse(user)
    else return {}
}
const setLocalStorage = (key, value) => {
    if (value) localStorage.setItem(key, JSON.stringify(value))
    else localStorage.removeItem('loggedInUser')
}


export const UserProvider = (props) => {
    const [loggedInUser, setLoggedInUser] = useState(() => getLocalStorage('loggedInUser'))
    const isLoggedIn = Object.keys(loggedInUser).length > 0


    useEffect(() => {
        setLocalStorage("loggedInUser", loggedInUser)
    }, [loggedInUser])

    return (
        <UserContext.Provider value={{loggedInUser, setLoggedInUser, isLoggedIn}}>
            {props.children}
        </UserContext.Provider>
    )
}