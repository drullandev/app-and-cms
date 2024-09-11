import { jsx as _jsx } from "react/jsx-runtime";
import { IonPage } from '@ionic/react';
import { useState, useEffect } from 'react';
//import styles from './styles.scss';
const Account = () => {
    const [profile, setProfile] = useState({
        id: 1,
        username: 'johndoe',
        avatar: 'https://www.example.com/avatar.jpg',
        posts: [{ id: 1, image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }],
        followers: 150,
        following: 100,
        firstname: 'John',
        surname: 'Doe',
        title: 'Developer',
        bio: 'Full stack developer with a passion for coding.',
        link: 'https://www.example.com'
    });
    useEffect(() => {
        // Simulate fetching profile data
        const fetchProfile = async () => {
            // Simulated API call
            const profileData = {
                id: 1,
                username: 'johndoe',
                avatar: 'https://www.example.com/avatar.jpg',
                posts: [
                    { id: 1, image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260' }
                ],
                followers: 150,
                following: 100,
                firstname: 'John',
                surname: 'Doe',
                title: 'Developer',
                bio: 'Full stack developer with a passion for coding.',
                link: 'https://www.example.com'
            };
            setProfile(profileData);
        };
        fetchProfile();
    }, []);
    return (_jsx(IonPage, {}));
};
export default Account;
