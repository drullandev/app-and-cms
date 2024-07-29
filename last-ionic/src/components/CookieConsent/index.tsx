/**
 * CookieConsent Component
 * 
 * This component displays a modal dialog prompting the user to accept or reject the use of cookies 
 * for enhancing their experience on the application. It stores the user's choice in local storage
 * and manages the visibility of the modal based on whether the user has already made a selection.
 *
 * Dependencies:
 * - React
 * - React-I18next (for internationalization)
 * - Ionic React (for UI components)
 * - Custom Storage class (for handling local storage)
 *
 * Usage:
 * Include <CookieConsent /> in your main application component to prompt users for cookie consent.
 */

 import React, { useEffect, useState } from 'react'; // Importing React and hooks for managing state and side effects
 import { useTranslation } from 'react-i18next'; // Importing translation hook for internationalization
 import { IonButton, IonContent, IonModal } from '@ionic/react'; // Importing Ionic components for UI
 
 import Storage from '../../classes/Storage'; // Importing a custom storage class for handling consent storage
 
 import './style.css'; // Importing styles for the component
 
 const CookieConsent: React.FC = () => {
	 // Using the translation hook to support multiple languages
	 const { t } = useTranslation();
	 
	 // State variable to control the visibility of the consent modal
	 const [showModal, setShowModal] = useState(false);
	 
	 // Key used to store the user's cookie consent status in local storage
	 const key = 'cookieConsent';
 
	 /**
		* Function to set the user's cookie consent choice in storage.
		* 
		* @param {boolean} value - The user's choice regarding cookie consent.
		*/
	 const setElection = (value: boolean) => {
		 Storage.set(key, value).then(() => {
			 setShowModal(false); // Close the modal after saving the user's choice
		 });
	 };
 
	 // Effect hook to check the user's cookie consent status when the component mounts
	 useEffect(() => {
		 Storage.get(key).then((selected) => {
			 // If no consent has been recorded, display the consent modal
			 if (selected === null) {
				 setShowModal(true);
			 }
		 });
	 }, [Storage]); // Dependency array; runs the effect when Storage changes
 
	 return (
		 <IonModal
			 isOpen={showModal} // Controls the visibility of the modal based on state
			 onDidDismiss={() => setShowModal(false)} // Closes the modal when dismissed
			 trigger="open-modal" // Trigger element to open the modal
			 initialBreakpoint={0.25} // Initial height of the modal
			 breakpoints={[0, 0.25, 0.5, 0.75]} // Responsive breakpoints for the modal
			 handleBehavior="cycle" // Defines the swipe behavior for the modal
		 >
			 <IonContent className="cookie-modal"> {/* Main content of the modal */}
				 <h2>Cookies</h2> {/* Header for the modal */}
				 <p>
					 This application uses cookies to enhance the user experience. 
					 By clicking "Accept," you consent to the use of cookies. 
					 You may refuse the use of cookies, but some functionalities may not be available.
				 </p>
				 {/* Button for accepting cookies */}
				 <IonButton onClick={() => setElection(true)} expand="full">
					 {t('Accept')} {/* Translated text for the acceptance button */}
				 </IonButton>
				 {/* Button for refusing cookies */}
				 <IonButton onClick={() => setElection(false)} expand="full">
					 {t('Refuse')} {/* Translated text for the refusal button */}
				 </IonButton>
			 </IonContent>
		 </IonModal>
	 );
 };
 
 export default CookieConsent; // Exporting the CookieConsent component for use in other parts of the application
 