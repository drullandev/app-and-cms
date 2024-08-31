import { IonButton, IonButtons, IonCardSubtitle, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonPage, IonRow, IonToolbar } from '@ionic/react';
import { addCircleOutline, bookmarksOutline, chevronDown, gridOutline, menuOutline } from 'ionicons/icons';
import { useState, useEffect } from 'react';
//import styles from './styles.scss';

const Account: React.FC = () => {

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

    return (
        <IonPage>
            
            {/*<IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <p className={styles.username}>
                            {profile.username}
                            <IonIcon icon={chevronDown} />
                        </p>
                    </IonButtons>
                    <IonButtons slot="end">
                        <IonButton color="dark">
                            <IonIcon icon={addCircleOutline} />
                        </IonButton>
                        <IonButton color="dark">
                            <IonIcon icon={menuOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent fullscreen>
                <IonGrid>
                    <IonRow className="ion-text-center ion-justify-content-between ion-align-self-center ion-align-items-center">
                        <IonCol size="4">
                            <img src={profile.avatar} alt="profile avatar" className={styles.profileAvatar} />
                        </IonCol>
                        <IonCol>
                            <IonRow className="ion-text-center ion-justify-content-between ion-align-items-center ion-align-self-center ion-align">
                                <IonCol size="4" className="ion-text-center">
                                    <IonCardTitle className={styles.value}>
                                        {profile.posts && profile.posts.length}
                                    </IonCardTitle>
                                    <IonCardSubtitle className={styles.label}>Posts</IonCardSubtitle>
                                </IonCol>
                                <IonCol size="4" className="ion-text-center">
                                    <IonCardTitle className={styles.value}>
                                        {profile.followers}
                                    </IonCardTitle>
                                    <IonCardSubtitle className={styles.label}>Followers</IonCardSubtitle>
                                </IonCol>
                                <IonCol size="4" className="ion-text-center">
                                    <IonCardTitle className={styles.value}>
                                        {profile.following}
                                    </IonCardTitle>
                                    <IonCardSubtitle className={styles.label}>Following</IonCardSubtitle>
                                </IonCol>
                            </IonRow>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol size="12" className={styles.profileInfo}>
                            <p className={styles.profileUsername}>{profile.firstname} {profile.surname}</p>
                            <p className={styles.profileTitle}>{profile.title}</p>
                            <p className={styles.profileBio}>{profile.bio}</p>
                            <a className={styles.profileLink} href={profile.link}>{profile.link}</a>
                        </IonCol>
                    </IonRow>
                    <IonRow className={styles.profileActions}>
                        <IonCol size="4">
                            <IonButton className={styles.lightButton} expand="block" fill="outline">Edit Profile</IonButton>
                        </IonCol>
                        <IonCol size="4">
                            <IonButton className={styles.lightButton} fill="outline" expand="block">Promotions</IonButton>
                        </IonCol>
                        <IonCol size="4">
                            <IonButton className={styles.lightButton} fill="outline" expand="block">Insights</IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
                <IonRow className="ion-text-center ion-justify-content-center ion-align-items-center ion-align-self-center">
                    <IonCol size="6" className="ion-justify-content-center ion-align-items-center ion-align-self-center" style={{ borderBottom: "2px solid black", marginBottom: "2px" }}>
                        <IonIcon style={{ fontSize: "1.5rem" }} icon={gridOutline} />
                    </IonCol>
                    <IonCol size="6" className="ion-justify-content-center ion-align-items-center ion-align-self-center">
                        <IonIcon style={{ fontSize: "1.5rem" }} icon={bookmarksOutline} />
                    </IonCol>
                </IonRow>
                <IonRow className="ion-no-padding ion-no-margin">
                    {profile.posts && profile.posts.map((post, index) => (
                        <IonCol className={styles.postCol} key={index} size="4">
                            <img alt="post" src={post.image} />
                        </IonCol>
                    ))}
                </IonRow>
                    </IonContent>*/}
        </IonPage>
    );
};

export default Account;
