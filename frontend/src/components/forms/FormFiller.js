import React, { useState, useContext } from 'react';
import { LanguageContext } from '../../Context/LanguageContextProvider'; // Adjust path if necessary

const FormFiller = ({ documentName, handleSubmit }) => {
    const { language } = useContext(LanguageContext); // Accessing language context

    const [course, setCourse] = useState('');
    const [reason, setReason] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit(course, reason);
    };

    // Translations for different languages
    const translations = {
        en: {
            courseLabel: 'Course:',
            coursePlaceholder: 'Insert course name',
            reasonLabel: 'Reason:',
            reasonPlaceholder: 'Insert reason',
            submitButton: 'Submit'
        },
        he: {
            courseLabel: 'קורס:',
            coursePlaceholder: 'הכנס שם קורס',
            reasonLabel: 'סיבה:',
            reasonPlaceholder: 'הכנס סיבה',
            submitButton: 'שלח'
        },
        ar: {
            courseLabel: 'الدورة التدريبية:',
            coursePlaceholder: 'أدخل اسم الدورة التدريبية',
            reasonLabel: 'السبب:',
            reasonPlaceholder: 'أدخل السبب',
            submitButton: 'إرسال'
        }
    };

    return (
        <div className="card shadow mb-4">
            <div className="card-header py-3">
                <h1 className="m-0 font-weight-bold text-primary">{documentName}</h1>
            </div>
            <div className="card-body">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label style={{ fontWeight: 'bold', color: 'black' }}>{translations[language].courseLabel}</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={course} 
                            onChange={(e) => setCourse(e.target.value)}
                            style={{ marginBottom: '10px' }}
                            placeholder={translations[language].coursePlaceholder}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ fontWeight: 'bold', color: 'black' }}>{translations[language].reasonLabel}</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            value={reason} 
                            onChange={(e) => setReason(e.target.value)}
                            style={{ marginBottom: '10px' }}
                            placeholder={translations[language].reasonPlaceholder}
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        style={{ marginTop: '10px' }}
                    >
                        {translations[language].submitButton}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormFiller;
