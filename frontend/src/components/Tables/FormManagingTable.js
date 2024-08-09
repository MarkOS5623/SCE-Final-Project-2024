import React, { useContext, useState, useEffect } from 'react';
import { Table, Button, Form, FormControl } from 'react-bootstrap';
import { LanguageContext } from '../../Context/LanguageContextProvider'; 
import { deleteForm, updateFormTitle, fetchAllFormsList } from '../../api/form_requests';

const translations = {
    en: {
        formsHeader: "Forms",
        actionHeader: "Action",
        deleteButton: "Delete",
        renameButton: "Rename",
        saveButton: "Save",
        cancelButton: "Cancel",
        searchPlaceholder: "Search forms..."
    },
    he: {
        formsHeader: "טפסים",
        actionHeader: "פעולה",
        deleteButton: "מחק",
        renameButton: "שנה שם",
        saveButton: "שמור",
        cancelButton: "בטל",
        searchPlaceholder: "חפש טפסים..."
    },
    ar: {
        formsHeader: "النماذج",
        actionHeader: "العملية",
        deleteButton: "حذف",
        renameButton: "إعادة تسمية",
        saveButton: "حفظ",
        cancelButton: "إلغاء",
        searchPlaceholder: "ابحث عن النماذج..."
    }
};

const FormTable = () => {
    const { language } = useContext(LanguageContext);
    const [allFormsList, setAllFormsList] = useState([]);
    const [renamingIndex, setRenamingIndex] = useState(-1);
    const [newSubject, setNewSubject] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function fetchData() {
            try {
                const allForms = await fetchAllFormsList();
                if (allForms) {
                    setAllFormsList(allForms.docs);
                } else {
                    console.log('Unsigned document response is not valid');
                }
            } catch (error) {
                console.error('Fetching of docs failed:', error.message);
            }
        }
        fetchData();
    }, []);

    const handleInputChange = (event) => {
        setNewSubject(event.target.value);
    };

    const handleRenameStart = (index, currentSubject) => {
        setRenamingIndex(index);
        setNewSubject(currentSubject);
    };

    const handleRenameCancel = () => {
        setRenamingIndex(-1);
        setNewSubject('');
    };

    const handleRenameSave = async (oldTitle, newTitle) => {
        try {
            const response = await updateFormTitle(oldTitle, newTitle);
            if (response.status === 200) {
                console.log('Subject updated successfully!');
                setRenamingIndex(-1);
                setNewSubject('');
                window.location.reload(); 
            } else {
                console.error('Failed to update subject: status ', response.status);
            }
        } catch (error) {
            console.error('Error updating subject:', error);
        }
    };

    const handleDelete = async (selectedForm) => {
        try {
            const response = await deleteForm(selectedForm);
            if (response.status === 200) {
                console.log('Document deleted successfully!');
                window.location.reload(); 
            } else {
                console.error('Failed to delete form: status ', response.status);
            }
        } catch (error) {
            console.error('Error deleting form:', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredForms = allFormsList.filter(doc =>
        doc.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <h1>Form Data Base</h1>
            <FormControl
                type="text"
                placeholder={translations[language].searchPlaceholder}
                value={searchQuery}
                onChange={handleSearchChange}
                className="mb-3"
            />
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>{translations[language].formsHeader}</th>
                        <th>{translations[language].actionHeader}</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredForms.map((doc, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                {renamingIndex === index ? (
                                    <Form.Control
                                        type="text"
                                        value={newSubject}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    <>
                                    {doc}
                                    <Button
                                        variant="info"
                                        onClick={() => handleRenameStart(index, doc)}
                                        style={{marginLeft: '10px', marginRight: '10px'}}
                                    >
                                        {translations[language].renameButton}
                                    </Button>
                                    </>
                                )}
                            </td>
                            <td>
                                {renamingIndex === index && (
                                    <>
                                        <Button
                                            variant="success"
                                            onClick={() => handleRenameSave(doc, newSubject)}
                                        >
                                            {translations[language].saveButton}
                                        </Button>
                                        {' '}
                                        <Button
                                            variant="secondary"
                                            onClick={handleRenameCancel}
                                        >
                                            {translations[language].cancelButton}
                                        </Button>
                                    </>
                                )}
                                {' '}
                                <Button
                                    variant="primary"
                                    onClick={() => handleDelete(doc)}
                                >
                                    {translations[language].deleteButton}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    );
};

export default FormTable;
