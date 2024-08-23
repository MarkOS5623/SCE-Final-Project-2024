import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../src/components/Utils/Footer';
import { LanguageContext } from '../src/Context/LanguageContextProvider';
import '@testing-library/jest-dom';

describe('Footer Component', () => {
  const renderComponent = (contextValue = { language: 'en' }) => {
    render(
      <LanguageContext.Provider value={contextValue}>
        <Footer />
      </LanguageContext.Provider>
    );
  };

  test('renders English content', () => {
    renderComponent({ language: 'en' });

    expect(screen.getByText(/© 2024 Sami Shamoon College of Engineering. All rights reserved./i)).toBeInTheDocument();
    expect(screen.getByText(/About Us/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
    expect(screen.getByText(/Privacy Policy/i)).toBeInTheDocument();
  });

  test('renders Hebrew content', () => {
    renderComponent({ language: 'he' });

    expect(screen.getByText(/המכללה להנדסה על שם סמי שמעון. כל הזכויות שמורות ©/i)).toBeInTheDocument();
    expect(screen.getByText(/עלינו/i)).toBeInTheDocument();
    expect(screen.getByText(/צור קשר/i)).toBeInTheDocument();
    expect(screen.getByText(/מדיניות פרטיות/i)).toBeInTheDocument();
  });

  test('renders Arabic content', () => {
    renderComponent({ language: 'ar' });

    expect(screen.getByText(/© 2024 كلية الهندسة في معهد شمعون. جميع الحقوق محفوظة./i)).toBeInTheDocument();
    expect(screen.getByText(/معلومات عنا/i)).toBeInTheDocument();
    expect(screen.getByText(/اتصال/i)).toBeInTheDocument();
    expect(screen.getByText(/سياسة الخصوصية/i)).toBeInTheDocument();
  });

  test('footer links have correct href attributes', () => {
    renderComponent({ language: 'en' });

    expect(screen.getByText(/About Us/i).closest('a')).toHaveAttribute('href', '/about');
    expect(screen.getByText(/Contact/i).closest('a')).toHaveAttribute('href', '/contact');
    expect(screen.getByText(/Privacy Policy/i).closest('a')).toHaveAttribute('href', '/privacy');
  });
});
