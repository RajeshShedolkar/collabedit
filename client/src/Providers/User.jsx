import { useMemo, useState, useContext } from "react";

const UserContext = useContext()

const UserContextProvider = (props) => {
    const [userList, setUserList] = useState([])
    const [textData, setTextData] = useState("")
    return (
        <UserContext.Provider value = {{userList}}>
            {props.childern}
        </UserContext.Provider>
    )
}

export default UserContextProvider;
