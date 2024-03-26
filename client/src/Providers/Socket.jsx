import {createContext, useContext, useMemo} from "react"
import {io} from 'socket.io-client'

const socketContext = createContext(null)

export const useSocket = () => {
    return useContext(socketContext)
}
const SocketContextProvider = (props) =>{
    // const socket = useMemo(() => { io('http://localhost:3001')}, [io])
    const socket = useMemo(() => io('http://localhost:3001'), [io]);
    
    console.log("socket from provider", socket);
    return (
        <socketContext.Provider value = {{socket}}>
            {props.children}
        </socketContext.Provider>
    )
}

export default SocketContextProvider;