import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormFiller from '../src/components/Forms/FormFiller'; 
import { LanguageContext } from '../src/Context/LanguageContextProvider';

const handleSubmit = jest.fn();
const handleCancel = jest.fn();

describe('FormFiller Component', () => {
  const renderComponent = (documentName = 'General Request', language = 'en') => {
    return render(
      <LanguageContext.Provider value={{ language }}>
        <FormFiller
          documentName={documentName}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      </LanguageContext.Provider>
    );
  };

  test('renders correctly with default props', () => {
    renderComponent();

    expect(screen.getByText(/General Request/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Subject/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Department/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Course name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Reason/i)).toBeInTheDocument();
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
  });

  test('updates input fields and calls handleSubmit on form submission', () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/Subject/i), {
      target: { value: 'Test Subject' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Department/i), {
      target: { value: 'Test Department' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Course name/i), {
      target: { value: 'Test Course' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Reason/i), {
      target: { value: 'Test Reason' }
    });

    fireEvent.click(screen.getByText(/Submit/i));

    expect(handleSubmit).toHaveBeenCalledWith('Test Course', 'Test Reason', 'Test Subject', 'Test Department');
  });

  test('calls handleCancel on cancel button click', () => {
    renderComponent();

    fireEvent.click(screen.getByText(/Cancel/i));

    expect(handleCancel).toHaveBeenCalled();
  });

  test('conditionally renders subject input when documentName is "General Request"', () => {
    renderComponent('General Request');

    expect(screen.getByPlaceholderText(/Subject/i)).toBeInTheDocument();
  });

  test('does not render subject input when documentName is not "General Request"', () => {
    renderComponent('Other Document');

    expect(screen.queryByPlaceholderText(/Subject/i)).not.toBeInTheDocument();
  });

  test('renders localized text based on context language', () => {
    renderComponent('General Request', 'he');

    expect(screen.getByText(/קורס:/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/הכנס שם קורס/i)).toBeInTheDocument();
    expect(screen.getByText(/סיבה:/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/הכנס סיבה/i)).toBeInTheDocument();
    expect(screen.getByText(/שלח/i)).toBeInTheDocument();
    expect(screen.getByText(/ביטול/i)).toBeInTheDocument();
  });
});
