import { jsx as _jsx } from "react/jsx-runtime";
import ReCAPTCHA from 'react-google-recaptcha';
const Recaptcha = ({ onChange }) => {
    return (_jsx(ReCAPTCHA, { sitekey: "YOUR_RECAPTCHA_SITE_KEY", onChange: onChange }));
};
export default Recaptcha;
