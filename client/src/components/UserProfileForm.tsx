import { FC, useContext, useState } from "react";
import { IUserProfile } from "../models/IUserProfile";
import UserService from "../services/UserService";
import { Context } from "..";

const UserProfileForm: FC = () => {
    const [firstName, setFirstName] = useState<string>('');
    const [secondName, setSecondName] = useState<string >('');
    const [idNumber, setIdNumber] = useState<string >('');
    const [gender, setGender] = useState<string >('');
    const [age, setAge] = useState<string>('');
    const [address, setAddress] = useState<string >('');
    const [telephoneNumber, setTelephoneNumber] = useState<string >('');

    const {store} = useContext(Context);

    const handleUpdateProfile = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        event.preventDefault(); // Prevent form from submitting which causes the page to refresh
        store.UpdateProfile(firstName, secondName, idNumber, gender, age, address, telephoneNumber);
    };

    return (
        <form>
            <label>
                First Name:
                <input type="text" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </label>
            <label>
                Second Name:
                <input type="text" name="secondName" value={secondName} onChange={(e) => setSecondName(e.target.value)} />
            </label>
            <label>
                ID Number:
                <input type="text" name="idNumber" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />
            </label>
            <label>
                Gender:
                <input type="text" name="gender" value={gender} onChange={(e) => setGender(e.target.value)} />
            </label>
            <label>
                Age:
                <input type="text" name="age" value={age} onChange={(e) => setAge(e.target.value)} />
            </label>
            <label>
                Address:
                <input type="text" name="address" value={address} onChange={(e) => setAddress(e.target.value)} />
            </label>
            <label>
                Telephone Number:
                <input type="text" name="telephoneNumber" value={telephoneNumber} onChange={(e) => setTelephoneNumber(e.target.value)} />
            </label>
            <button
                onClick={handleUpdateProfile}
            >
                Update Profile
            </button>
        </form>
    );
};

export default UserProfileForm;