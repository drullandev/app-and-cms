import AgreementManager, { AgreementManagerInterface } from "../classes/managers/AgreementManager";

/**
 * Configuration settings for the AgreementManager.
 * - Purpose: These settings specify parameters that might be needed for agreement management, such as API URLs.
 */
const CRM_API_URL = process.env.CRM_API_URL || '/crm/validate/';

/**
 * Creates and exports an instance of AgreementManager.
 * This ensures that the AgreementManager is configured correctly and follows the interface contract.
 * 
 * @returns An instance of AgreementManager configured for the application.
 * 
 * @author David Rullán - https://github.com/drullandev
 * @date September 1, 2024
 */
export const Agreement: AgreementManagerInterface = AgreementManager.getInstance();

export default Agreement;
