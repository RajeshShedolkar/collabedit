import {createContext, useMemo} from "react"
import {io} from 'socket.io-client'

const socketContext = createContext()

const SocketContextProvider = (props) =>{

    const socket = useMemo(() => { io('http://localhost:3001')}, [io])

    return (
        <socketContext.Provider value = {{socket}}>
            {props.children}
        </socketContext.Provider>
    )
}

export default SocketContextProvider;

