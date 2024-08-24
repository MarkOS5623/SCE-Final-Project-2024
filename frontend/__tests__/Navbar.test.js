import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import StudentNavbar from '../src/components/Navbar/Navbar';
import { LanguageContext } from '../src/Context/LanguageContextProvider';
import { BrowserRouter as Router } from 'react-router-dom';
import { decodeValue } from '../src/api/utils';
import '@testing-library/jest-dom';

jest.mock('../src/api/utils', () => ({
  decodeValue: jest.fn()
}));

describe('StudentNavbar Component', () => {
  const renderComponent = (contextValue = { language: 'en', changeLanguage: jest.fn() }) => {
    render(
      <LanguageContext.Provider value={contextValue}>
        <Router>
          <StudentNavbar />
        </Router>
      </LanguageContext.Provider>
    );
  };

  test('renders without crashing', () => {
    renderComponent();
    expect(screen.getByAltText(/My App Logo/i)).toBeInTheDocument();
    expect(screen.getByText(/Help/i)).toBeInTheDocument();
  });
  test('shows admin section when user is admin', async () => {
    decodeValue.mockResolvedValueOnce({ user: { role: 'admin', _id: 'userId' } });
    localStorage.setItem('token', 'mockToken');
    
    renderComponent({ language: 'en', changeLanguage: jest.fn() });

    await waitFor(() => {
      expect(screen.getByText(/admin/i)).toBeInTheDocument();
    });
  });
});
