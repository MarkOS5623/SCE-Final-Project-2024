import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RequestManagerActionPanel from '../src/components/ActionPanels/RequestManagerActionPanel';
import { LanguageContext } from '../src/Context/LanguageContextProvider';
import { useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
    useNavigate: jest.fn(),
  }));
  
  describe('RequestManagerActionPanel Component', () => {
    const renderComponent = (language = 'en', userRole = 'user') => {
      return render(
        <LanguageContext.Provider value={{ language }}>
            <RequestManagerActionPanel userRole={userRole} />
        </LanguageContext.Provider>
      );
    };
  
    test('renders correctly in English and navigates on button click', () => {
      const mockNavigate = jest.fn();
      useNavigate.mockReturnValue(mockNavigate);
  
      renderComponent('en');
  
      // Check if the title and buttons are rendered correctly in English
      expect(screen.getByText(/Request Manager/i)).toBeInTheDocument();
      expect(screen.getByText(/Fill a form/i)).toBeInTheDocument();
      expect(screen.getByText(/Download a form/i)).toBeInTheDocument();
      expect(screen.getByText(/Pending requests/i)).toBeInTheDocument();
      expect(screen.getByText(/Request History/i)).toBeInTheDocument();
  
      // Simulate clicking the 'Fill a form' button
      const fillFormButton = screen.getByText(/Fill a form/i);
      fireEvent.click(fillFormButton);
  
      // Ensure that the correct navigation is triggered
      expect(mockNavigate).toHaveBeenCalledWith('/requestmanager/form');
    });
  
    test('renders correctly in Hebrew language', () => {
      renderComponent('he');
  
      // Check if the title and buttons are rendered correctly in Hebrew
      expect(screen.getByText(/מנהל בקשות/i)).toBeInTheDocument();
      expect(screen.getByText(/להגיש בקשה חדשה/i)).toBeInTheDocument();
      expect(screen.getByText(/הורד טופס/i)).toBeInTheDocument();
      expect(screen.getByText(/הבקשות שלי/i)).toBeInTheDocument();
      expect(screen.getByText(/היסטוריית בקשות/i)).toBeInTheDocument();
    });
  
    test('renders correctly in Arabic language', () => {
      renderComponent('ar');
  
      // Check if the title and buttons are rendered correctly in Arabic
      expect(screen.getByText(/مدير الطلبات/i)).toBeInTheDocument();
      expect(screen.getByText(/تقديم طلب جديد/i)).toBeInTheDocument();
      expect(screen.getByText(/تحميل نموذج/i)).toBeInTheDocument();
      expect(screen.getByText(/طلباتي/i)).toBeInTheDocument();
      expect(screen.getByText(/تاريخ الطلبات/i)).toBeInTheDocument();
    });
  
    test('renders admin-specific button when userRole is admin', () => {
      const mockNavigate = jest.fn();
      useNavigate.mockReturnValue(mockNavigate);
  
      renderComponent('en', 'admin');
  
      // Check if the admin-specific button is rendered
      const formManagerButton = screen.getByText(/Form Manager/i);
      expect(formManagerButton).toBeInTheDocument();
  
      // Simulate clicking the 'Form Manager' button
      fireEvent.click(formManagerButton);
  
      // Ensure that the correct navigation is triggered
      expect(mockNavigate).toHaveBeenCalledWith('/formmanager/editor');
    });
  
    test('does not render admin-specific button when userRole is not admin', () => {
      renderComponent('en', 'user');
  
      // Ensure that the admin-specific button is not rendered
      expect(screen.queryByText(/Form Manager/i)).not.toBeInTheDocument();
    });
  });