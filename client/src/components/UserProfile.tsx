import React, { useState, FormEvent, FC, useContext } from 'react';
import styled from 'styled-components';
import UserService from '../services/UserService';
import { IUserProfile } from '../models/IUserProfile';


const UserProfileForm: FC = () => {
    const [firstName, setFirstName] = useState<string | undefined>('');
    const [secondName, setSecondName] = useState<string | undefined>('');
    const [idNumber, setIdNumber] = useState<string | undefined>('');
    const [gender, setGender] = useState<string | undefined>('');
    const [age, setAge] = useState<string | undefined>('');
    const [address, setAddress] = useState<string | undefined>('');
    const [telephoneNumber, settelephoneNumber] = useState<string | undefined>('');

    async function fetchUserProfile(){
        try {
            const response = await UserService.fetchUserProfileService()
            console.log(response)

            const { firstName, secondName, idNumber, gender, age, address, telephoneNumber } = response.data;

            setFirstName(firstName)
            setSecondName(secondName)
            setIdNumber(idNumber)
            setGender(gender)
            setAge(age)
            setAddress(address)
            settelephoneNumber(telephoneNumber)

            localStorage.setItem('firstName', firstName);
            localStorage.setItem('secondName', secondName);
            localStorage.setItem('idNumber', idNumber);
            localStorage.setItem('gender', gender);
            localStorage.setItem('age', age); // Convert number to string for storage
            localStorage.setItem('address', address);
            localStorage.setItem('telephoneNumber', telephoneNumber);

        } catch (e : any) {
            console.log(e.response?.data?.message);
        }
    }
    return (
        <div>
            <h1>User Profile</h1>
            <button onClick={fetchUserProfile}>Refresh</button>
            <p>First Name: {localStorage.getItem('firstName')}</p>
            <p>Second Name: {localStorage.getItem('secondName')}</p>
            <p>ID Number: {localStorage.getItem('idNumber')}</p>
            <p>Gender: {localStorage.getItem('gender')}</p>
            <p>Age: {localStorage.getItem('age')}</p>
            <p>Address: {localStorage.getItem('address')}</p>
            <p>Telephone Number: {localStorage.getItem('telephoneNumber')}</p>
        </div>
    );
};

export default UserProfileForm;
