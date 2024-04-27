import { FC, useContext, useEffect, useState } from "react";
import UserService from "../services/UserService";
import { Context } from "..";
import styled from 'styled-components';

 const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center; // Added to center-align the form items
    gap: 10px;
    margin: 20px auto; // Adjusted for auto horizontal margin
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-color: #f8f9fa;
    width: 80%; // Set a max-width or width as needed
    max-width: 500px; // Example max-width for larger screens
`;

 const Label = styled.label`
    font-size: 16px;
    margin-bottom: 5px;
    width: 100%; // Ensure label takes full width for alignment
    display: flex;
    flex-direction: column;
    align-items: center;
`;

 const Input = styled.input`
    padding: 8px;
    font-size: 16px;
    width: 100%; // Make input take the full width of its parent label
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 4px; // Ensure some space between label text and input

    &:focus {
        border-color: #80bdff;
        outline: none;
        box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
    }
`;

 const Button = styled.button`
    padding: 8px 16px; // Reduced padding for a smaller button
    font-size: 16px; // Adjust font size if necessary
    color: white;
    background-color: #007bff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #0056b3;
    }
`;

 const FormTitle = styled.h1`
    font-size: 24px;
    text-align: center;
`;


const UserProfileForm: FC = () => {

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
                setTelephoneNumber(userProfile.telephoneNumber)
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserProfile();
    }, []);
    
    const [firstName, setFirstName] = useState<string>('no data yet');
    const [secondName, setSecondName] = useState<string>('no data yet');
    const [idNumber, setIdNumber] = useState<string>('no data yet');
    const [gender, setGender] = useState<string>('no data yet');
    const [age, setAge] = useState<string>('no data yet');
    const [address, setAddress] = useState<string>('no data yet');
    const [telephoneNumber, setTelephoneNumber] = useState<string>('no data yet');

    const {store} = useContext(Context);

    const handleUpdateProfile = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        store.UpdateProfile(firstName, secondName, idNumber, gender, age, address, telephoneNumber);
    };

    return (
        <Form>
            <FormTitle>Update Your Profile</FormTitle>
            <Label>
                First Name:
                <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </Label>
            <Label>
                Second Name:
                <Input type="text" value={secondName} onChange={(e) => setSecondName(e.target.value)} />
            </Label>
            <Label>
                ID Number:
                <Input type="text" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />
            </Label>
            <Label>
                Gender:
                <Input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
            </Label>
            <Label>
                Age:
                <Input type="text" value={age} onChange={(e) => setAge(e.target.value)} />
            </Label>
            <Label>
                Address:
                <Input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </Label>
            <Label>
                Telephone Number:
                <Input type="text" value={telephoneNumber} onChange={(e) => setTelephoneNumber(e.target.value)} />
            </Label>
            <Button onClick={handleUpdateProfile}>Update Profile</Button>
        </Form>
    );
};

export default UserProfileForm;