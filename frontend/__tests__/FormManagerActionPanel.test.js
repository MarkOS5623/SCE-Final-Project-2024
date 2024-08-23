// FormManagerActionPanel.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormManagerActionPanel from '../src/components/ActionPanels/FormManagerActionPanel';
import { LanguageContext } from '../src/Context/LanguageContextProvider';
import { useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('FormManagerActionPanel Component', () => {
  const renderComponent = (language = 'en', userRole = 'user', setActionPanelCollapsed = jest.fn()) => {
    return render(
      <LanguageContext.Provider value={{ language }}>
        <FormManagerActionPanel setActionPanelCollapsed={setActionPanelCollapsed} userRole={userRole} />
      </LanguageContext.Provider>
    );
  };

  test('renders correctly in English and navigates when buttons are clicked', () => {
    const mockNavigate = jest.fn();
    const mockSetActionPanelCollapsed = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    renderComponent('en', 'user', mockSetActionPanelCollapsed);
    expect(screen.getByText(/Form Manager/i)).toBeInTheDocument();
    const editorButton = screen.getByText(/Document Editor/i);
    const formButton = screen.getByText(/Form Data Base/i);
    const requestManagerButton = screen.getByText(/Request Authorizer/i);
    expect(editorButton).toBeInTheDocument();
    expect(formButton).toBeInTheDocument();
    expect(requestManagerButton).toBeInTheDocument();
    fireEvent.click(editorButton);
    expect(mockNavigate).toHaveBeenCalledWith('/formmanager/editor');
    expect(mockSetActionPanelCollapsed).toHaveBeenCalledWith(true);
  });

  test('renders in Hebrew language', () => {
    renderComponent('he');
    expect(screen.getByText(/מנהל טופס/i)).toBeInTheDocument(); 
    expect(screen.getByText(/עורך מסמך/i)).toBeInTheDocument(); 
    expect(screen.getByText(/טבלת טפסים/i)).toBeInTheDocument(); 
  });

  test('renders admin-specific button when userRole is admin', () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);
    renderComponent('en', 'admin');
    const requestManagerButton = screen.getByText(/Request Manager/i);
    expect(requestManagerButton).toBeInTheDocument();
    fireEvent.click(requestManagerButton);
    expect(mockNavigate).toHaveBeenCalledWith('/requestmanager/form');
  });
});
