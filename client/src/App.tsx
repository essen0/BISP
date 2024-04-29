import React, { FC, useContext, useEffect, useRef, useState } from "react";
import { Context } from ".";
import { observer } from "mobx-react-lite";
import { IUser } from "./models/IUser";
import UserService from "./services/UserService";
import LoginForm from "./components/LoginForm";
import { styled } from "styled-components";

import RegistrationForm from "./components/RegistrationForm";
import HomePage from "./components/HomePage";
import UserProfile from "./components/UserProfile";
import UserProfileForm from "./components/UserProfileForm";
import ChatForm from "./components/ChatForm";


const HeaderContainer = styled.header`
    height: 50px;
    display: flex;
    padding: 0 2rem;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ccc;
    background: #fafafa;
`;

const LogoButton = styled.button`
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 100%;
    font-size: 1.5rem; // Example size, adjust as needed

    &:hover {
        background: rgba(0, 0, 0, 0.05); // Optional hover style
    }

    &:focus {
        outline: none;
    }
`;
const Button = styled.button`
  padding: 8px 16px; // Adjusted padding for a medium-sized button
  background-color: #f0f0f0; // Light gray background
  color: black; // Text color is black
  border: 1px solid #ccc; // Light gray border
  border-radius: 5px; // Slightly rounded corners
  cursor: pointer;
  font-size: 16px; // Medium text size
  transition: background-color 0.2s, color 0.2s; // Smooth transition for background and text color

  &:hover {
    background-color: #007bff; // Blue color on hover
    color: white; // Text color changes to white on hover
  }

  &:focus {
    outline: none; // Removes the outline on focus to maintain the style
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5); // Adds a light blue box shadow on focus
  }

  &:active {
    background-color: #0056b3; // Darker blue when button is clicked
  }
`;

const App:  FC = () => {
  const {store} = useContext(Context)
  const [users, setUsers] = useState<IUser[]>([])

  const [now, setNow] = useState(new Date()); 
  const [activeForm, setActiveForm] = useState<string | null>(null);
  const handleChange = (form: string | null) => {
        setActiveForm(form);  
  };

  useEffect(() => {
        const interval = setInterval(() => {
            setNow(new Date());
        }, 1000);
        return () => clearInterval(interval);
  }, []);

  useEffect(() => {
      if(localStorage.getItem('token')) {
        store.checkAuth()
      }
  },[]);

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm('Are you sure you want to permanently delete your account? This action cannot be undone.');
    if (confirmed) {
        await UserService.deleteAccount()
            .then(() => {
                alert('Your account has been successfully deleted.');
                window.location.reload();
            })
            .catch(error => {
                alert('Failed to delete account. Please try again.');
            });
    }
  };


  if(store.isLoading) {
    return(
      <div><h1>Loading...</h1></div>
    )
  }

    if(!store.isAuth) {
      return(
        <div>
            <HeaderContainer>
                <LogoButton onClick={() => handleChange(null)}>
                    <h1>TelemedicineUz</h1>
                </LogoButton>
                <span>Time is now: {now.toLocaleTimeString()}</span>
                <div>
                    <Button onClick={() => handleChange('login')}>Login</Button>
                    <Button onClick={() => handleChange('registration')}>Registration</Button>
                </div>
            </HeaderContainer>
            <div>
                {activeForm === 'login' && <LoginForm />}
                {activeForm === 'registration' && <RegistrationForm />}
                {activeForm === null && <HomePage/>}
            </div>
        </div>   
    )
    }
    if(localStorage.getItem('token')){
      if(!store.user.isActivated){
        return (
          <div>
            <HeaderContainer>
                <LogoButton onClick={() => handleChange(null)}>
                    <h1>TelemedicineUz</h1>
                </LogoButton>
                <span>Time is now: {now.toLocaleTimeString()}</span>
                <div>
                    <Button onClick={() => store.logout()}>Log out</Button>
                </div>
            </HeaderContainer>
            <h1>
              Activate your account
            </h1>
            {activeForm === null && <HomePage/>}
          </div>
          )
      }
    }
  return (
    <div>
      <HeaderContainer>
                <LogoButton onClick={() => handleChange(null)}>
                    <h1>TelemedicineUz</h1>
                </LogoButton>
                <span>Time is now: {now.toLocaleTimeString()}</span>
                <Button className="profile-btn" onClick={() => handleChange('Chat')}>Chats</Button>
                <Button className="profile-btn" onClick={() => handleChange('profile')}>Profile</Button>
                <Button className="update-profile-btn" onClick={() => handleChange('ChangeProfile')}>Update Profile</Button>
                <p>{store.user.email}</p>
                <Button className="delete-account-btn" onClick={handleDeleteAccount}>Delete Account</Button>
                <div>
                  <Button onClick={() => store.logout()}>Log out</Button>
                </div>
      </HeaderContainer>
      {activeForm === null && <HomePage/>}
      {activeForm === 'profile' && <UserProfile/>}
      {activeForm === 'ChangeProfile' && <UserProfileForm/>}
      {activeForm === 'Chat' && <ChatForm/>}
    </div>
  );
}

export default observer(App);