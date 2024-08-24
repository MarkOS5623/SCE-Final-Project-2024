import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AccountInfoPage from '../src/pages/Shared/AccountInfoPage';
import { LanguageContext } from '../src/Context/LanguageContextProvider';

jest.mock('../src/components/Utils/CardContainer', () => ({ children, ...props }) => (
  <div {...props}>{children}</div>
));

describe('AccountInfoPage Component', () => {
  const renderComponent = (language) => {
    return render(
      <LanguageContext.Provider value={{ language }}>
        <AccountInfoPage />
      </LanguageContext.Provider>
    );
  };

  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      if (key === 'token') return 'test-token';
      return null;
    });
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            user: {
              id: '12345',
              email: 'test@example.com',
              fname: 'John',
              lname: 'Doe',
              role: 'User',
            },
          }),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  test('renders account information in English', async () => {
    renderComponent('en');
    expect(screen.getByText(/Account Details/i)).toBeInTheDocument();
    expect(screen.getByAltText(/My App Logo/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/ID/i)).toBeInTheDocument();
      expect(screen.getByText(/12345/i)).toBeInTheDocument();
      expect(screen.getByText(/Email/i)).toBeInTheDocument();
      expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
      expect(screen.getByText(/First Name/i)).toBeInTheDocument();
      expect(screen.getByText(/John/i)).toBeInTheDocument();
      expect(screen.getByText(/Last Name/i)).toBeInTheDocument();
      expect(screen.getByText(/Doe/i)).toBeInTheDocument();
      expect(screen.getByText(/Role/i)).toBeInTheDocument();
      expect(screen.getByText(/User/i)).toBeInTheDocument();
    });
  });

  test('renders account information in Hebrew', async () => {
    renderComponent('he');
    expect(screen.getByText(/פרטי חשבון/i)).toBeInTheDocument();
    expect(screen.getByAltText(/My App Logo/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/מספר זיהוי/i)).toBeInTheDocument();
      expect(screen.getByText(/12345/i)).toBeInTheDocument();
      expect(screen.getByText(/אימייל/i)).toBeInTheDocument();
      expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
      expect(screen.getByText(/שם פרטי/i)).toBeInTheDocument();
      expect(screen.getByText(/John/i)).toBeInTheDocument();
      expect(screen.getByText(/שם משפחה/i)).toBeInTheDocument();
      expect(screen.getByText(/Doe/i)).toBeInTheDocument();
      expect(screen.getByText(/תפקיד/i)).toBeInTheDocument();
      expect(screen.getByText(/User/i)).toBeInTheDocument();
    });
  });

  test('renders account information in Arabic', async () => {
    renderComponent('ar');
    expect(screen.getByText(/تفاصيل الحساب/i)).toBeInTheDocument();
    expect(screen.getByAltText(/My App Logo/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText(/الرقم التعريفي/i)).toBeInTheDocument();
      expect(screen.getByText(/12345/i)).toBeInTheDocument();
      expect(screen.getByText(/البريد الإلكتروني/i)).toBeInTheDocument();
      expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
      expect(screen.getByText(/الاسم الأول/i)).toBeInTheDocument();
      expect(screen.getByText(/John/i)).toBeInTheDocument();
      expect(screen.getByText(/الاسم الأخير/i)).toBeInTheDocument();
      expect(screen.getByText(/Doe/i)).toBeInTheDocument();
      expect(screen.getByText(/الدور/i)).toBeInTheDocument();
      expect(screen.getByText(/User/i)).toBeInTheDocument();
    });
  });

  test('handles fetch failure and logs error', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    global.fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('Fetch failed'))
    );
    renderComponent('en');
    await waitFor(() => {
      expect(screen.queryByText(/ID/i)).not.toBeInTheDocument();
      expect(screen.queryByText(/Email/i)).not.toBeInTheDocument();
    });
    expect(consoleErrorSpy).toHaveBeenCalledWith('Decryption of value failed:', 'Fetch failed');
    consoleErrorSpy.mockRestore();
  });
  
});
