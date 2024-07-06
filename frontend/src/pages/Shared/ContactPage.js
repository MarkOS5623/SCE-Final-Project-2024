import React, { useContext } from 'react';
import CardContainer from '../../components/cardContainer';
import '../ContactUs.css';
import imageSrc1 from '../../assets/linkedin.png';
import imageSrc2 from '../../assets/facebook.png';
import imageSrc3 from '../../assets/instagram.png';
import imageSrc4 from '../../assets/youtube.png';
import { LanguageContext } from '../../context/LanguageContextProvider'; // Adjust path if necessary

const ContactUs = () => {
  const { language } = useContext(LanguageContext);

  const translations = {
    en: {
      mainContactHeader: "We will be happy to assist you, and respond to any questions or comments you may have.",
      mainContactSubHeader: "Main Contact",
      mainContactMessage: "Please feel free to contact us, and we will get back to you as soon as possible.",
      beerShevaCampus: {
        title: "Be'er Sheva Campus",
        addressLine1: "56 Bialik St.",
        addressLine2: "Be'er Sheva 8410802",
        tel: "Tel: 1-800-207-777",
        fax: "Fax: 08-6475777",
        email: "Info@sce.ac.il",
        ceoFax: "Fax for CEO's Office: 08-6475695"
      },
      ashdodCampus: {
        title: "Ashdod Campus",
        addressLine1: "84 Jabotinsky St.",
        addressLine2: "Ashdod 77245",
        tel: "Tel: 1-800-207-777",
        fax: "Fax: 08-8519192",
        email: "Info@sce.ac.il",
        ceoFax: "Fax for CEO's Office: 08-6475695"
      },
      socialMedia: {
        linkedinAltText: "LinkedIn Icon",
        youtubeAltText: "YouTube Icon",
        facebookAltText: "Facebook Icon",
        instagramAltText: "Instagram Icon"
      }
    },
    he: {
      mainContactHeader: ".נשמח לסייע לך ולענות על כל שאלה או הערה שיש לך",
      mainContactSubHeader: "דרכי קשר",
      mainContactMessage: "אנא צרו קשר ונחזור אליכם בהקדם האפשרי.",
      beerShevaCampus: {
        title: "קמפוס באר שבע",
        addressLine1: "ביאליק 56",
        addressLine2: "באר שבע 8410802",
        tel: "טל: 1-800-207-777",
        fax: "פקס: 08-6475777",
        email: "info@sce.ac.il",
        ceoFax: "פקס למשרד המנכ\"ל: 08-6475695"
      },
      ashdodCampus: {
        title: "קמפוס אשדוד",
        addressLine1: "יבוטינסקי 84",
        addressLine2: "אשדוד 77245",
        tel: "טל: 1-800-207-777",
        fax: "פקס: 08-8519192",
        email: "info@sce.ac.il",
        ceoFax: "פקס למשרד המנכ\"ל: 08-6475695"
      },
      socialMedia: {
        linkedinAltText: "סמל LinkedIn",
        youtubeAltText: "סמל YouTube",
        facebookAltText: "סמל Facebook",
        instagramAltText: "סמל Instagram"
      }
    },
    ar: {
      mainContactHeader: "سنكون سعداء بمساعدتك والرد على أي أسئلة أو تعليقات قد تكون لديك.",
      mainContactSubHeader: "الاتصال الرئيسي",
      mainContactMessage: "لا تتردد في الاتصال بنا، وسنعود إليك في أقرب وقت ممكن.",
      beerShevaCampus: {
        title: "حرم بئر السبع",
        addressLine1: "شارع بياليك 56",
        addressLine2: "بئر السبع 8410802",
        tel: "الهاتف: 1-800-207-777",
        fax: "الفاكس: 08-6475777",
        email: "Info@sce.ac.il",
        ceoFax: "الفاكس لمكتب المدير التنفيذي: 08-6475695"
      },
      ashdodCampus: {
        title: "حرم أشدود",
        addressLine1: "شارع جابوتينسكي 84",
        addressLine2: "أشدود 77245",
        tel: "الهاتف: 1-800-207-777",
        fax: "الفاكس: 08-8519192",
        email: "Info@sce.ac.il",
        ceoFax: "الفاكس لمكتب المدير التنفيذي: 08-6475695"
      },
      socialMedia: {
        linkedinAltText: "أيقونة LinkedIn",
        youtubeAltText: "أيقونة YouTube",
        facebookAltText: "أيقونة Facebook",
        instagramAltText: "أيقونة Instagram"
      }
    },
  };

  // Ensure translations for the current language exist
  if (!translations[language]) return null;

  return (
    <CardContainer style={{ marginTop: '5px', textAlign: 'left' }}>
      <div className="container">
        <header>
          <h1>{translations[language].mainContactHeader}</h1>
          <p>{translations[language].mainContactSubHeader}</p>
          <p>{translations[language].mainContactMessage}</p>
        </header>
        <main className="contact-main">
          <div className="campus-info">
            <div className="beer-sheva-campus">
              <h2>{translations[language].beerShevaCampus.title}</h2>
              <p>{translations[language].beerShevaCampus.addressLine1}</p>
              <p>{translations[language].beerShevaCampus.addressLine2}</p>
              <p>{translations[language].beerShevaCampus.tel}</p>
              <p>{translations[language].beerShevaCampus.fax}</p>
              <a href="mailto:info@sce.ac.il">{translations[language].beerShevaCampus.email}</a>
              <p>{translations[language].beerShevaCampus.ceoFax}</p>
            </div>
            <div className="ashdod-campus">
              <h2>{translations[language].ashdodCampus.title}</h2>
              <p>{translations[language].ashdodCampus.addressLine1}</p>
              <p>{translations[language].ashdodCampus.addressLine2}</p>
              <p>{translations[language].ashdodCampus.tel}</p>
              <p>{translations[language].ashdodCampus.fax}</p>
              <a href="mailto:info@sce.ac.il">{translations[language].ashdodCampus.email}</a>
              <p>{translations[language].ashdodCampus.ceoFax}</p>
            </div>
          </div>
        </main>
        <footer>
          <div className="social-media">
            <a href="https://www.linkedin.com/school/-sce/?originalSubdomain=il" target="_blank" rel="noopener noreferrer">
              <img src={imageSrc1} alt={translations[language].socialMedia.linkedinAltText} className="social-media-icon" style={{ marginRight: '10px' }} />
            </a>
            <a href="https://www.youtube.com/channel/UCCWmVlEKNocDKONunCfB38Q/videos" target="_blank" rel="noopener noreferrer">
              <img src={imageSrc4} alt={translations[language].socialMedia.youtubeAltText} className="social-media-icon" style={{ marginRight: '10px' }} />
            </a>
            <a href="https://www.facebook.com/sceenglish/" target="_blank" rel="noopener noreferrer">
              <img src={imageSrc2} alt={translations[language].socialMedia.facebookAltText} className="social-media-icon" style={{ marginRight: '10px' }} />
            </a>
            <a href="https://www.instagram.com/?next=https%3A%2F%2Fwww.instagram.com%2Fsce.academy" target="_blank" rel="noopener noreferrer">
              <img src={imageSrc3} alt={translations[language].socialMedia.instagramAltText} className="social-media-icon" style={{ marginRight: '10px' }} />
            </a>
          </div>
        </footer>
      </div>
    </CardContainer>
  );
};

export default ContactUs;
