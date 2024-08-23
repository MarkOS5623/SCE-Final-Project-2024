import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginForm from '../src/components/Forms/LoginForm'; 
import { LanguageContext } from '../src/Context/LanguageContextProvider';
import { login } from '../src/api/user_requests';
import { useNavigate } from 'react-router-dom';

jest.mock('../src/api/user_requests', () => ({
  login: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('LoginForm Component', () => {
  const mockNavigate = jest.fn();
  useNavigate.mockReturnValue(mockNavigate);

  const renderComponent = (language = 'en') => {
    return render(
      <LanguageContext.Provider value={{ language }}>
        <LoginForm />
      </LanguageContext.Provider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly with default props', () => {
    renderComponent();

    expect(screen.getByPlaceholderText(/Enter email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  test('updates input fields correctly', () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/Enter email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'password123' }
    });

    expect(screen.getByPlaceholderText(/Enter email/i).value).toBe('test@example.com');
    expect(screen.getByPlaceholderText(/Password/i).value).toBe('password123');
  });

  test('handles successful login and redirects', async () => {
    login.mockResolvedValueOnce({
      status: 200,
      data: { token: 'fake-token' }
    });

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/Enter email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'password123' }
    });

    fireEvent.click(screen.getByText(/Login/i));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(localStorage.getItem('token')).toBe('fake-token');
      expect(mockNavigate).toHaveBeenCalledWith('/requestmanager');
    });
  });

  test('handles login failure and shows error message', async () => {
    login.mockRejectedValueOnce(new Error('Login failed'));

    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/Enter email/i), {
      target: { value: 'test@example.com' }
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'password123' }
    });

    fireEvent.click(screen.getByText(/Login/i));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith('test@example.com', 'password123');
      expect(screen.getByText(/Login failed/i)).toBeInTheDocument();
    });
  });

  test('renders localized text based on context language', () => {
    renderComponent('he');

    expect(screen.getByPlaceholderText(/הזן דוא"ל/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/סיסמה/i)).toBeInTheDocument();
    expect(screen.getByText(/התחברות/i)).toBeInTheDocument();
  });
});
