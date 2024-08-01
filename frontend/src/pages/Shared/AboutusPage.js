import React, { useContext } from 'react';
import imageSrc from '../../assets/pictures/1496042374449-0.jpg'; 
import '../../assets/css/AboutUs.css'; 
import CardContainer from '../../components/Utils/CardContainer';
import { LanguageContext } from '../../Context/LanguageContextProvider'; 

const translations = {
  en: {
    aboutSCE: 'About SCE',
    description1: 'Shamoon College of Engineering (SCE) is Israel\'s largest college dedicated to engineering the future.',
    description2: 'Combining world-class academic excellence with a unique approach to education and social responsibility, SCE is much more than a college; it is a source of inspiration and cultivation which encourages forward-thinking and facilitates significant achievements. "Engineering the future" is both our promise and our mission, which propels our students forward and leads them to set an example of excellence amongst their peers and within their communities. With two campuses located in southern Israel, a continuously growing body of over 6,000 students, six different engineering tracks and new faculty of design and architecture, SCE is, and will always be, a pioneering academic powerhouse.',
    description3: 'At SCE, engineering goes way beyond the academic framework; it is a way of thinking, analyzing and solving fundamental questions that design the way people live their lives. Driven by a vision of outstanding education and social responsibility, SCE is committed to the pursuit of excellence, innovation, and promoting all communities.',
    strategicPlan: 'Strategic Plan for SCE - Shamoon College of Engineering',
    sceVideo: 'SCE Video',
    createdBy: 'created by: Itai Damri and Mark Grinblat'
  },
  he: {
    aboutSCE: 'SCE על',
    description1: '.המכללה להנדסה ע"ש סמי שמעון  היא המכללה הגדולה ביותר בישראל המוקדשת להנדסת העתיד',
    description2: ' שילוב של מצוינות אקדמית ברמה עולמית עם גישה ייחודית לחינוך ואחריות חברתית,  ס מי שמעון זה הרבה יותר ממכללה; זהו מקור השראה וטיפוח המעודד חשיבה קדימה ומאפשר הישגים משמעותיים. "הנדסת העתיד" היא גם ההבטחה שלנו וגם המשימה שלנו, שמניעה את התלמידים שלנו קדימה ומובילה אותם להוות דוגמה למצוינות בקרב עמיתיהם ובתוך הקהילות שלהם. עם שני קמפוסים הממוקמים בדרום ישראל, גוף צומח ברציפות של למעלה מ-6,000 סטודנטים, שישה מסלולי הנדסה שונים ופקולטה חדשה לעיצוב ואדריכלות,  סמי שמעון היא, ותמיד תהיה, מעצמה אקדמית פורצת דרך. ',
    description3: ',בסמי שמעון ההנדסה חורגת הרבה מעבר למסגרת האקדמית; זוהי דרך חשיבה, ניתוח ופתרון של שאלות יסוד המעצבות את הדרך שבה אנשים חיים את חייהם. מונעת על ידי חזון של חינוך יוצא דופן ואחריות חברתית, סמי שמעון מחויבת לשאיפה למצוינות, חדשנות וקידום כל הקהילות ',
    strategicPlan: 'תכנית אסטרטגית מכללת הנדסה ע"ש סמי שמעון',
    sceVideo: 'SCE וידאו ',
    createdBy: 'נוצר על ידי: איתי דמרי ומארק גרינבלט'
  },
  ar: {
    aboutSCE: 'SCE حول',
    description1: 'كلية الهندسة شامون (س.س.إ) هي أكبر كلية في إسرائيل مكرسة لهندسة المستقبل.',
    description2: 'يجمع بين التميز الأكاديمي على مستوى عالمي ونهج فريد للتعليم والمسؤولية الاجتماعية، س.س.إ هي أكثر بكثير من مجرد كلية؛ فهي مصدر إلهام وزراعة يشجع التفكير إلى الأمام ويسهل تحقيق إنجازات هامة. "هندسة المستقبل" هي وعدنا ورسالتنا، التي تدفع طلابنا إلى الأمام وتقودهم ليكونوا مثالاً للتميز بين أقرانهم وداخل مجتمعاتهم. مع حرمين جامعيين يقعان في جنوب إسرائيل، وجسم طلابي متزايد من أكثر من 6000 طالب، وستة مسارات هندسية مختلفة وكلية جديدة للتصميم والعمارة، فإن س.س.إ هي وستظل دائماً قوة أكاديمية رائدة.',
    description3: 'في س.س.إ، تتجاوز الهندسة بكثير الإطار الأكاديمي؛ إنها طريقة للتفكير والتحليل وحل الأسئلة الأساسية التي تصمم الطريقة التي يعيش بها الناس حياتهم. مدفوعين برؤية التعليم الممتاز والمسؤولية الاجتماعية، فإن س.س.إ ملتزمة بالسعي للتميز والابتكار وتعزيز جميع المجتمعات.',
    strategicPlan: 'الخطة الاستراتيجية لـ س.س.إ - كلية الهندسة شامون',
    sceVideo: 'SCE فيديو ',
    createdBy: 'إنشاء بواسطة: إيتاي دامري ومارك غرينبلات'
  }
};

function AboutUsPage() {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  return (
    <CardContainer style={{ marginTop: '5px', textAlign: 'left' }}>
      <main> 
        <div className="App">
          <header>
            <img src={imageSrc} className="App-logo" alt="logo" />
          </header>
          <h2 style={{ color: 'white' }}>{t.aboutSCE}</h2>
          <p style={{ fontSize: '1.5em' }}>{t.description1}</p>
          <div className="about-us-container">
            <div style={{ padding: '50px' }} className="section about-sce">
              <p>{t.description2}</p>
              <p>{t.description3}</p>
              <a style={{color: 'rgba(0, 0, 0)'}} href="https://en.sce.ac.il/sce/about/strategic_plan_for_sce_%E2%80%93_shamoon_college_of_engineering" target="_blank" rel="noopener noreferrer">
                {t.strategicPlan}
              </a>
            </div>
            <div className="section sce-video">
              <h2 style={{ color: 'white' }}>{t.sceVideo}</h2>
              <iframe width="847" height="476" src="https://www.youtube.com/embed/0mY9g9nhYt8" title="SCE Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            </div>    
          </div>
          <p>{t.createdBy}</p>
        </div>
      </main>
    </CardContainer>
  );
}

export default AboutUsPage;
