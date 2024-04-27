import React, { useState, FormEvent, FC, useContext, useEffect } from 'react';
import styled from 'styled-components';
import UserService from '../services/UserService';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    margin: 20px auto;
    max-width: 600px;
    background-color: #f8f9fa;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
`;

const Title = styled.h1`
    color: #333;
    font-size: 24px;
    text-align: center;
`;
const InfoParagraph = styled.p`
    font-size: 16px;
    color: #666;
    width: 100%;
    padding: 5px 10px;
    margin: 5px 0;
    text-align: center;  // Align text to the center horizontally
`;
const Button = styled.button`
    padding: 8px 16px;
    font-size: 16px;
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 20px 0;
    transition: background-color 0.2s;

    &:hover {
        background-color: #0056b3;
    }
`;



const UserProfileForm: FC = () => {
      
    const [firstName, setFirstName] = useState<string | undefined>('no data yet');
    const [secondName, setSecondName] = useState<string | undefined>('no data yet');
    const [idNumber, setIdNumber] = useState<string | undefined>('no data yet');
    const [gender, setGender] = useState<string | undefined>('no data yet');
    const [age, setAge] = useState<string | undefined>('no data yet');
    const [address, setAddress] = useState<string | undefined>('no data yet');
    const [telephoneNumber, settelephoneNumber] = useState<string | undefined>('no data yet');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await UserService.fetchUserProfileService();
                const userProfile = response.data;
                setFirstName(userProfile.firstName)
                setSecondName(userProfile.secondName)
                setIdNumber(userProfile.idNumber)
                setGender(userProfile.gender)
                setAge(userProfile.age)
                setAddress(userProfile.address)
                settelephoneNumber(userProfile.telephoneNumber)
            } catch (error) {
                console.error("Error fetching user profile:", error);

            }
        };
        fetchUserProfile();
    }, []);
    
    return (
        <Container>
            <Title>User Profile</Title>
            {/* <Button onClick={fetchUserProfile}>Refresh</Button> */}
            <InfoParagraph>First Name: {firstName}</InfoParagraph>
            <InfoParagraph>Second Name: {secondName}</InfoParagraph>
            <InfoParagraph>ID Number: {idNumber}</InfoParagraph>
            <InfoParagraph>Gender: {gender}</InfoParagraph>
            <InfoParagraph>Age: {age}</InfoParagraph>
            <InfoParagraph>Address: {address}</InfoParagraph>
            <InfoParagraph>Telephone Number: {telephoneNumber}</InfoParagraph>
        </Container>
    );
};

export default UserProfileForm;
