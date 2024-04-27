import React, { FC, useState } from 'react';
import styled from 'styled-components';


const ChatLayout = styled.div`
  display: flex;
  height: 80vh;
  max-width: 800px;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 2rem auto;
  background-color: #f8f9fa;
`;

const ChatList = styled.div`
  width: 25%;
  background-color: #e9ecef;
  overflow-y: auto;
  border-right: 1px solid #ccc;
`;

const ChatListItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  &:hover {
    background-color: #d8ddf0;
  }
`;

const MessageArea = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const Messages = styled.div`
  flex-grow: 1;
  padding: 10px;
  overflow-y: auto;
`;

const InputArea = styled.div`
  display: flex;
  padding: 10px;
`;

const Input = styled.input`
  flex-grow: 1;
  padding: 8px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SendButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;


const ChatForm: FC = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [activeChat, setActiveChat] = useState('chat1');

    const sendNewMessage = () => {
        setMessages([...messages, newMessage]);
        setNewMessage('');
    };

    return (
    <ChatLayout>
      <ChatList>
        {['chat1', 'chat2', 'chat3', 'doctor2'].map(chat => (
          <ChatListItem key={chat} onClick={() => setActiveChat(chat)}>
            {chat}
          </ChatListItem>
        ))}
      </ChatList>
      <MessageArea>
        <Messages>
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </Messages>
        <InputArea>
          <Input 
            type="text" 
            value={newMessage} 
            onChange={(e) => setNewMessage(e.target.value)} 
            onKeyPress={(e) => e.key === 'Enter' ? sendNewMessage() : null}
          />
          <SendButton onClick={sendNewMessage}>Send</SendButton>
        </InputArea>
      </MessageArea>
    </ChatLayout>
  );
};

export default ChatForm;
