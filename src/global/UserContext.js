import { createContext } from "react";

export const UserContext = createContext(null);

const UserProvider = ({children, value}) => (
    <UserContext.Provider value={value}>
        {children}
    </UserContext.Provider>
)

export default UserProvider;