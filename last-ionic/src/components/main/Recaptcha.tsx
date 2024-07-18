// src/components/Recaptcha.tsx
import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface RecaptchaProps {
  onChange: (token: string | null) => void;
}

const Recaptcha: React.FC<RecaptchaProps> = ({ onChange }) => {
  return (
    <ReCAPTCHA
      sitekey="YOUR_RECAPTCHA_SITE_KEY"
      onChange={onChange}
    />
  );
};

export default Recaptcha;
