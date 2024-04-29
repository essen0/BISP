import React, { FC, useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { IUser } from '../models/IUser';
import UserService from '../services/UserService';
import { IMessage } from '../models/IMessage';


const ChatLayout = styled.div`
  display: flex;
  height: 80vh;
  max-width: 1200px; // Increased width for a wider layout
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 2rem auto;
  background-color: #f8f9fa;
`;

const ChatList = styled.div`
  width: 20%; // Slightly narrower chat list
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

const ConversationHeader = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ccc;
  font-weight: bold;
`;

const Messages = styled.div`
  flex-grow: 1;
  padding: 10px;
  overflow-y: auto;
`;

const InputArea = styled.div`
  display: flex;
  border-top: 1px solid #ccc;
  padding: 10px;
  background-color: #fff;
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
  const [doctors, setDoctors] = useState<IUser[]>([]);
  const [activeDoctor, setActiveDoctor] = useState<IUser | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');



  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await UserService.getDoctorsChat();
        setDoctors(response.data);
        if (response.data.length > 0) {
          setActiveDoctor(response.data[0]);
        }
      } catch (error) {
        console.error('Failed to fetch doctors:', error);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (activeDoctor) {
      intervalId = setInterval(() => {
        fetchMessages();
      }, 1000); 
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId); 
      }
    };
  }, [activeDoctor]);

  const fetchMessages = async () => {
    if (activeDoctor?._id) {
      try {
        const response = await UserService.getMessages(activeDoctor._id);
        console.log(response);
        setMessages(response.data.map((message: IMessage) => message.message));
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    }
  };


  const handleChatItemClick = async (user: IUser) => {
    setActiveDoctor(user);
    window.history.pushState({}, '', `/messages/${encodeURIComponent(user._id)}`);
    try {
      const response = await UserService.getMessages(user._id);
      setMessages(response.data.map((message: IMessage) => message.message));
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    }
  };



  const sendNewMessage = async () => {
    if (newMessage.trim() && activeDoctor?._id) {
      try {
        const response = await UserService.sendMessage(activeDoctor._id, newMessage);
        if (response) {
          setMessages([...messages, newMessage]);
          setNewMessage('');
        }
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    }
  };
  return (
    <ChatLayout>
      <ChatList>
        {doctors.map((user) => (
          <ChatListItem key={user._id} onClick={() => handleChatItemClick(user)}>
            {user.email}
          </ChatListItem>
        ))}
      </ChatList>
      <MessageArea>
        <ConversationHeader>
          Conversation with {activeDoctor?.email || 'Select a User'}
        </ConversationHeader>
        <Messages>
          {messages.map((msg, index) => (
            <div key={index}>{msg}</div> 
          ))}
        </Messages>
        <InputArea>
          <Input
            type="text"
            placeholder="Type a message"
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