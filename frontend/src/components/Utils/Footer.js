import React, { useContext } from 'react';
import '../../assets/css/Footer.css';
import { LanguageContext } from '../../Context/LanguageContextProvider';

const translations = {
  en: {
    copyright: "&copy; 2024 Sami Shamoon College of Engineering. All rights reserved.",
    aboutUs: "About Us",
    contact: "Contact",
    privacyPolicy: "Privacy Policy"
  },
  he: {
    copyright: ".המכללה להנדסה על שם סמי שמעון. כל הזכויות שמורות &copy",
    aboutUs: "עלינו",
    contact: "צור קשר",
    privacyPolicy: "מדיניות פרטיות"
  },
  ar: {
    copyright: "&copy; 2024 كلية الهندسة في معهد شمعون. جميع الحقوق محفوظة.",
    aboutUs: "معلومات عنا",
    contact: "اتصال",
    privacyPolicy: "سياسة الخصوصية"
  }
};

const Footer = () => {
  const { language } = useContext(LanguageContext);

  return (
    <footer className="footer">
      <div className="footer-content">
        <p dangerouslySetInnerHTML={{ __html: translations[language].copyright }} />
        <nav>
          <ul>
            <li><a href="/about">{translations[language].aboutUs}</a></li>
            <li><a href="/contact">{translations[language].contact}</a></li>
            <li><a href="/privacy">{translations[language].privacyPolicy}</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
