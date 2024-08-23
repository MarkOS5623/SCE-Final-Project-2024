import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Signup from '../src/components/Forms/SignupForm'; 
import { LanguageContext } from '../src/Context/LanguageContextProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import { signup } from '../src/api/user_requests';
import '@testing-library/jest-dom';

jest.mock('../src/api/user_requests', () => ({
  signup: jest.fn()
}));

describe('Signup Component', () => {
  const renderComponent = (language = 'en') => {
    render(
      <LanguageContext.Provider value={{ language }}>
        <Router>
          <Signup />
        </Router>
      </LanguageContext.Provider>
    );
  };

  test('renders without crashing', () => {
    renderComponent();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Personal ID/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Role/i)).toBeInTheDocument();
    expect(screen.getByText(/Signup/i)).toBeInTheDocument();
    expect(screen.getByText(/Login Instead/i)).toBeInTheDocument();
  });

  test('handles form input changes', () => {
    renderComponent();

    fireEvent.change(screen.getByPlaceholderText(/Email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), { target: { value: 'password123' } });
    fireEvent.change(screen.getByPlaceholderText(/First Name/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByPlaceholderText(/Last Name/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByPlaceholderText(/Personal ID/i), { target: { value: '123456789' } });
    fireEvent.change(screen.getByPlaceholderText(/Role/i), { target: { value: 'User' } });

    expect(screen.getByPlaceholderText(/Email/i).value).toBe('test@example.com');
    expect(screen.getByPlaceholderText(/Password/i).value).toBe('password123');
    expect(screen.getByPlaceholderText(/First Name/i).value).toBe('John');
    expect(screen.getByPlaceholderText(/Last Name/i).value).toBe('Doe');
    expect(screen.getByPlaceholderText(/Personal ID/i).value).toBe('123456789');
    expect(screen.getByPlaceholderText(/Role/i).value).toBe('User');
  });
});
