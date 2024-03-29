import React, { useCallback, useState, useEffect } from 'react';
import { useSocket } from '../Providers/Socket';
import { useLocation } from 'react-router-dom';
import './doc.css'

const DocPage = () => {
    const location = useLocation();
    const [text, setText] = useState('');
    const [nameList, setNameList] = useState([]);
    const [pageId] = useState(location.pathname.split("/")[2]);
    const { socket } = useSocket();
    const [currName, setCurrName] = useState(null);


    useEffect(() => {
        // Check if currName is null, undefined, or empty string
        const getLocalName = localStorage.getItem('curr_name')
        console.log("How many times useEffect runs")

        if (!currName && getLocalName){
            setCurrName(getLocalName);
            setNameList([...nameList, getLocalName]);
        }

        if (!currName) {
            const name = prompt("Please enter your name:");
            setCurrName(name);
            setNameList([...nameList, name]);
        } else{
            
        }
        
        window.addEventListener("error", (e) => {
            console.log("Error", e)
        });

        return () => {
            // Removes the listener from the listener array for 
            // the event named NewUserJoined.
            // socket.off("NewUserJoined", handleNewUserJoined);
        }
    }, []);

    const handleNewUserJoined = useCallback((data) => {
        console.log("New User has joined with data:", data)
        const {clientName, pageId} = data
        if (currName!==clientName) {
            setNameList([...nameList, clientName])
            console.log("socket value when user joined", socket);
            socket.emit("NewUserConnectedAck", {clientName: currName, pageId})
        }

    }, [currName, socket])

    const handleNewUserJoinedAck = useCallback((data) => {
        console.log("New User has joined with data:", data)
        const {clientName, pageId} = data
        console.log("Ack data", data)
        if (currName!==clientName){
            setNameList([...nameList, clientName])
            console.log("socket value when user joined and ack", socket);
            // socket.emit("NewUserConnectedAck", {clientName: currName, pageId})
        }

    }, [currName, socket])

    useEffect(() => {
        
        socket.emit("openNewDoc", { "clientName": currName, pageId });
        socket.on("NewUserJoined", handleNewUserJoined);
        socket.on("NewUserJoinedAckRes", handleNewUserJoinedAck);
        window.addEventListener("error", (e) => {
            console.log("Error from othr useEffect", e)
        });
        return () => {
            socket.off("NewUserJoined", handleNewUserJoined);
            socket.off("NewUserJoinedAckRes", handleNewUserJoinedAck);
        }
    }, [socket, handleNewUserJoinedAck])
    
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
                <textarea value={text} onChange={handleTextChange} />
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
