import React, { useState } from 'react';
// import io from 'socket.io-client';

const TextEditor = () => {
  const [text, setText] = useState('');
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     const newSocket = io('http://localhost:3000'); // Your server address
//     setSocket(newSocket);

//     return () => newSocket.close();
//   }, []);

//   useEffect(() => {
//     if (!socket) return;

//     socket.on('text-update', (updatedText) => {
//       setText(updatedText);
//     });

//     return () => socket.off('text-update');
//   }, [socket]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);
    // socket.emit('text-change', newText);
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={handleTextChange}
        style={{ width: '100%', height: '400px' }}
      />
    </div>
  );
};

export default TextEditor;

