import React, { useState } from 'react';
// import io from 'socket.io-client';

const TextEditor = () => {
  const [text, setText] = useState('');

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

