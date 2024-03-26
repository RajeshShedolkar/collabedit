import React, { useCallback, useState, useEffect } from 'react';
import { useSocket } from '../Providers/Socket';
import { useLocation } from 'react-router-dom';

const DocPage = () => {
    const location = useLocation();
    const [text, setText] = useState('');
    const [nameList, setNameList] = useState([]);
    const [pageId] = useState(location.pathname.split("/")[2]);
    const { socket } = useSocket();
    const [currName, setCurrName] = useState(null);


    useEffect(() => {
        // Check if currName is null, undefined, or empty string
        const getLocalName = localStorage.getItem('items')

        if (!getLocalName && !currName) {
            const name = prompt("Please enter your name:");
            if (!currName) {
                setCurrName(name);
                localStorage.setItem('items', name);
                // Optionally, add the name to the nameList or perform other actions
                setNameList([...nameList, name]);
                console.log("nameList and name", nameList, name);
            }
        } else{
            if (!currName){
                setCurrName(getLocalName);
                setNameList([...nameList, getLocalName]);
            }
            console.log("nameList and name", nameList);
        }
    }, [currName]); // This effect depends on currName

    // const addName = useCallback((name) => {
    //     setNameList(prevNames => [...prevNames, name]);
    // }, []);

    const handleNewUserJoined = useCallback(async (data) => {
        socket.emit("openNewDoc", { clientName: currName, pageId });
    }, [currName, socket])
    

    const handleTextChange = (e) => {
        setText(e.target.value);
        console.log("Text Editor Data:", e.target.value);
        // Emit the changes to the server via WebSocket
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
            <header style={{ padding: '20px', backgroundColor: '#3CA0D0', textAlign: 'center' }}>
                <h1 style={{ color: 'white', fontSize: '30px' }}>Collaborative Document Editor</h1>
                <h3 style={{ color: 'white', fontSize: '15px' }}>PageID: {pageId}</h3>
            </header>
            <div style={{ display: 'flex', flexGrow: 1, padding: '20px' }}>
                <textarea
                    value={text}
                    onChange={handleTextChange}
                    style={{ flexGrow: 1, marginRight: '20px', padding: '10px', fontSize: '16px', boxSizing: 'border-box', border: '2px solid #ccc', borderRadius: '4px' }}
                />
                <div style={{ width: '200px', height: '50%', borderLeft: '1px solid #ccc', paddingLeft: '20px', boxSizing: 'border-box', border: '2px solid #ccc', borderRadius: '4px' }}>
                    <h2>Collaborators</h2>
                    <ul>
                    {nameList.map((name, index) => (
                            <li key={index}>{name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DocPage;
