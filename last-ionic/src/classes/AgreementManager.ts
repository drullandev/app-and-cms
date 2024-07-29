import axios from "axios";
import Logger from "./LoggerClass";
import DOMPurify from "dompurify";

class Agreement {

    /**
     * Generates a random token for CSRF protection.
     * @returns A random string token.
     */
     public checkAgreement(data: any): any {
      //TODO: Check against CRM. TODO: CRM xD
      const returnData = this.cleanFormData(data)
      return returnData.cleanData
    }

    public cleanFormData(formData: any) {
      // Desestructuramos formData para separar agreement y el resto de los campos
      const { agreement, ...cleanData } = formData;
    
      // Almacenamos el valor de agreement en una constante
      const agreementApproval = agreement;
    
      // Retornamos el objeto sin el campo agreement
      return { cleanData, agreementApproval };
    }

    public getRandomBoolean() {
      return Math.random() >= 0.5;
    }

    public checkUserInCRM = async (username: any) => {
      try {
        if (process.env.NODE_ENV === 'production') {
          const response = await axios.get(`/crm/check-user?username=${username}`);
          return response.data.exists;
        }
        return this.getRandomBoolean();
      } catch (error) {
        Logger.error('Error checking user in CRM:', error);
        return false;
      }
    };
  
    public registerUserInCRM = async (userData: any) => {
      try {
        if (process.env.NODE_ENV === 'production') {
          await axios.post('/crm/register-user', userData);
          Logger.log('User registered successfully');
        }
        return this.getRandomBoolean();
      } catch (error) {
        Logger.error('Error registering user in CRM:', error);
      }
    };
    
}

export default new Agreement();