import React, { useContext, useEffect, useState } from 'react';
import { LanguageContext } from '../../Context/LanguageContextProvider';
import CardContainer from '../../components/Utils/CardContainer';
import '../../assets/css/HelpPage.css';
import { decodeValue } from '../../api/utils';

const translations = {
  en: {
    title: "Help & Guidance",
    introduction: "Welcome to the help page. Here you'll find information on how to use the app.",
    staffSections: {
      documentEditor: "Document Editor: Edit and update your documents.",
      fromDatabase: "From Database: Retrieve information from the database.",
      requestAuthorizer: "Request Authorizer: Approve or reject requests.",
      requestHistory: "Request History: View the history of your requests.",
    },
    studentSections: {
      fillAForm: "Fill a Form: Complete and submit forms.",
      downloadAForm: "Download a Form: Download forms for offline use.",
      pendingRequests: "Pending Requests: View requests that are awaiting action.",
      requestHistory: "Request History: Review the history of your requests.",
    },
    conclusion: "If you need further assistance, please contact support."
  },
  he: {
    title: "עזרה והנחיות",
    introduction: ".ברוכים הבאים לדף העזרה. כאן תמצאו מידע על אופן השימוש באפליקציה",
    staffSections: {
      documentEditor: "עורך מסמכים: עריכה ועדכון המסמכים שלך.",
      fromDatabase: "מהמסד נתונים: שליפת מידע מהמסד נתונים.",
      requestAuthorizer: "מאשר בקשות: אישור או דחיית בקשות.",
      requestHistory: "היסטורית בקשות: הצגת היסטורית הבקשות שלך.",
    },
    studentSections: {
      fillAForm: "מלא טופס: השלם והגש טפסים.",
      downloadAForm: "הורד טופס: הורדת טפסים לשימוש לא מקוון.",
      pendingRequests: "בקשות ממתינות: הצגת בקשות הממתינות לפעולה.",
      requestHistory: "היסטורית בקשות: הצגת היסטורית הבקשות שלך.",
    },
    conclusion: ".אם תזדקקו לעזרה נוספת, אנא צרו קשר עם התמיכה"
  },
  ar: {
    title: "المساعدة والإرشادات",
    introduction: ".مرحبًا بكم في صفحة المساعدة. هنا ستجد معلومات حول كيفية استخدام التطبيق",
    staffSections: {
      documentEditor: "محرر المستندات: تحرير وتحديث مستنداتك.",
      fromDatabase: "من قاعدة البيانات: استرجاع المعلومات من قاعدة البيانات.",
      requestAuthorizer: "مفوض الطلبات: الموافقة على الطلبات أو رفضها.",
      requestHistory: "تاريخ الطلبات: عرض تاريخ طلباتك.",
    },
    studentSections: {
      fillAForm: "املأ نموذجًا: أكمل وقدم النماذج.",
      downloadAForm: "تنزيل نموذج: تنزيل النماذج لاستخدامها دون اتصال.",
      pendingRequests: "الطلبات المعلقة: عرض الطلبات التي تنتظر اتخاذ إجراء.",
      requestHistory: "تاريخ الطلبات: عرض تاريخ طلباتك.",
    },
    conclusion: ".إذا كنت بحاجة إلى مساعدة إضافية، يرجى الاتصال بالدعم"
  },
};

const HelpPage = () => {
  const [role, setRole] = useState(null);
  const { language } = useContext(LanguageContext);
  const translation = translations[language];
  
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await decodeValue(JSON.stringify({ token: token }));
          setRole(response.user.role);
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };
    fetchUserRole();
  }, []);

  // Determine text alignment and bullet point alignment based on language
  const isRTL = language === 'he' || language === 'ar';
  
  // Choose sections based on user role
  const sections = {
    staff: role === 'admin' || role === 'staff' ? translation.staffSections : null,
    student: role === 'admin' || role === 'student' ? translation.studentSections : null
  };

  // Remove the formManager and requestManager sections
  const { formManager, requestManager, ...filteredStaffSections } = sections.staff || {};
  const { formManager: _, requestManager: __, ...filteredStudentSections } = sections.student || {};

  return (
    <CardContainer style={{ marginTop: '5px', textAlign: isRTL ? 'right' : 'left' }} dir={isRTL ? 'rtl' : 'ltr'}>
      <div style={{ direction: isRTL ? 'rtl' : 'ltr' }}>
        <h1 className="help-page-title">{translation.title}</h1>
        <p className="help-page-introduction">{translation.introduction}</p>
        <div className="help-page-sections">
          {sections.staff && (
            <>
              <h2 className="section-title">Staff</h2>
              {Object.keys(filteredStaffSections).length > 0 && (
                <ul className="help-page-sections-list">
                  {Object.keys(filteredStaffSections).map((key) => (
                    <li key={key} className="help-page-section-item">{filteredStaffSections[key]}</li>
                  ))}
                </ul>
              )}
            </>
          )}
          {sections.student && (
            <>
              <h2 className="section-title">Student</h2>
              {Object.keys(filteredStudentSections).length > 0 && (
                <ul className="help-page-sections-list">
                  {Object.keys(filteredStudentSections).map((key) => (
                    <li key={key} className="help-page-section-item">{filteredStudentSections[key]}</li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
        <p className="help-page-conclusion">{translation.conclusion}</p>
      </div>
    </CardContainer>
  );
};

export default HelpPage;
