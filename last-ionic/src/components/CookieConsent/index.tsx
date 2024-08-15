import React, { useEffect, useState } from 'react'; // Importing React and hooks for managing state and side effects
import { useTranslation } from 'react-i18next'; // Importing translation hook for internationalization
import { IonButton, IonContent, IonModal } from '@ionic/react'; // Importing Ionic components for UI

import Storage from '../../classes/Storage'; // Importing a custom storage class for handling consent storage
import CookieManager from '../../classes/CookieManager';

import './style.css'; // Importing styles for the component
import CookieConsentSource from './source'; // Importing the component source
import { COOKIE_CONSENT_KEY, COOKIE_EXPIRATION_TIME, COOKIE_CONSENT_KEY_EXPIRE } from './env';
import TimeClass from '../../classes/TimeClass';

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
const CookieConsent: React.FC = () => {

	// Using the translation hook to support multiple languages
	const { t } = useTranslation();
	
	// State variable to control the visibility of the consent modal
	const [showModal, setShowModal] = useState(false);

	/**
	* Function to get the user's cookie consent choice in storage.
	*/
	const load = () => {
		Storage.get(COOKIE_CONSENT_KEY)
		.then((selected) => {
			// If no consent has been recorded, display the consent modal
			if (selected === null) {
				setShowModal(true);
			} else {
				Storage.get(COOKIE_CONSENT_KEY_EXPIRE)
					.then((expiration) => {
						if (TimeClass.hasElapsed(expiration)) {
							reset()
						}
					});
			}
		});
	}

	/**
	* Function to set the user's cookie consent choice in storage.
	* @param {boolean} value - The user's choice regarding cookie consent.
	*/
	const set = (consent: boolean) => {
		// Evaluate by cookie consent selection made before during 12 months...
		Storage.set(COOKIE_CONSENT_KEY, consent)
			.then(() => {
				Storage.set(COOKIE_CONSENT_KEY_EXPIRE, TimeClass.parseFutureTimeString(COOKIE_EXPIRATION_TIME))
					.then(() => {
						setShowModal(false); // Close the modal after saving the user's choice
					})
			});
	};

	const reset = () => {
		Storage.remove(COOKIE_CONSENT_KEY);
		Storage.remove(COOKIE_CONSENT_KEY_EXPIRE);
		setShowModal(true);
	}

	// Effect hook to check the user's cookie consent status when the component mounts
	useEffect(load);

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
				<IonButton onClick={() => set(true)} expand="full">
					{t('Accept')}
				</IonButton>
				{/* Button for refusing cookies */}
				<IonButton onClick={() => set(false)} expand="full">
					{t('Refuse')}
				</IonButton>
			</IonContent>
		</IonModal>
	);
};

export default CookieConsent;