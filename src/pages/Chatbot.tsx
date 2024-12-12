import React, { useState } from 'react';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string, text: string }[]>([]);
  const [input, setInput] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;

    // Add user message to the chat
    const userMessage = { sender: 'User', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Simulate a bot response
    const botMessage = { sender: 'Bot', text: `You said: ${input}` };
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);

    // Clear input field after sending
    setInput('');
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        {messages.map((message, index) => (
          <div key={index} style={styles.messageContainer}>
            <strong>{message.sender}:</strong> {message.text}
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          style={styles.input}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage} style={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

// Inline styles for the component
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '400px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  chatBox: {
    flex: 1,
    maxHeight: '300px',
    overflowY: 'auto',
    marginBottom: '10px',
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    backgroundColor: '#f9f9f9',
  },
  messageContainer: {
    marginBottom: '5px',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    outline: 'none',
    marginRight: '5px',
  },
  sendButton: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default Chatbot;
