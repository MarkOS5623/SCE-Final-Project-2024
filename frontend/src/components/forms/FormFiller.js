import React, { useState, useContext } from 'react';
import { LanguageContext } from '../../Context/LanguageContextProvider';

const FormFiller = ({ documentName, handleSubmit, handleCancel }) => {
    const { language } = useContext(LanguageContext);

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
            coursePlaceholder: 'Course name',
            reasonLabel: 'Reason:',
            reasonPlaceholder: 'Reason',
            submitButton: 'Submit',
            cancelButton: 'Cancel'
        },
        he: {
            courseLabel: 'קורס:',
            coursePlaceholder: 'הכנס שם קורס',
            reasonLabel: 'סיבה:',
            reasonPlaceholder: 'הכנס סיבה',
            submitButton: 'שלח',
            cancelButton: 'ביטול'
        },
        ar: {
            courseLabel: 'الدورة التدريبية:',
            coursePlaceholder: 'أدخل اسم الدورة التدريبية',
            reasonLabel: 'السبب:',
            reasonPlaceholder: 'أدخل السبب',
            submitButton: 'إرسال',
            cancelButton: 'إلغاء'
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
                            style={{ marginBottom: '10px', border: '2px solid rgba(158, 201, 59)' }}
                            placeholder={translations[language].coursePlaceholder}
                        />
                    </div>
                    <div className="form-group">
                        <label style={{ fontWeight: 'bold', color: 'black' }}>{translations[language].reasonLabel}</label>
                        <textarea 
                            className="form-control" 
                            value={reason} 
                            onChange={(e) => setReason(e.target.value)}
                            style={{ marginBottom: '10px', height: '200px', resize: 'none', border: '2px solid rgba(158, 201, 59)' }}
                            placeholder={translations[language].reasonPlaceholder}
                            rows="10"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        style={{ marginTop: '10px' }}
                    >
                        {translations[language].submitButton}
                    </button>
                    <button 
                        type="button" 
                        onClick={handleCancel}
                        className="btn btn-danger"
                        style={{ marginTop: '10px', marginLeft: '10px' }}
                    >
                        {translations[language].cancelButton}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormFiller;
