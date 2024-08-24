import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ViewDocument from '../src/components/DocumentViewers/ViewDocument';
import { BrowserRouter as Router } from 'react-router-dom';
import { LanguageContext } from '../src/Context/LanguageContextProvider';
import { fetchDocument, fetchDocumentAuthor } from '../src/api/documents_requests';
import { fetchForm } from '../src/api/form_requests';
import { decodeValue } from '../src/api/utils';

jest.mock('../src/api/documents_requests', () => ({
  fetchDocument: jest.fn(),
  fetchDocumentAuthor: jest.fn(),
  saveDocument: jest.fn(),
}));

jest.mock('../src/api/status_requests', () => ({
    authorizeRequest: jest.fn().mockResolvedValue({ success: true }),
    rejectRequest: jest.fn().mockResolvedValue({ success: true }),
}));

jest.mock('../src/api/form_requests', () => ({
  fetchForm: jest.fn(),
}));

jest.mock('../src/api/utils', () => ({
  decodeValue: jest.fn(),
}));

jest.mock('@syncfusion/ej2-react-documenteditor', () => ({
  DocumentEditorComponent: jest.fn(() => <div>Document Editor Component</div>),
  DocumentEditorContainerComponent: jest.fn(() => <div>Document Editor Container</div>),
  Inject: jest.fn(() => null),
  WordExport: jest.fn(),
  SfdtExport: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('ViewDocument Component', () => {
  const renderComponent = (flag = true, language = 'en') => {
    render(
      <LanguageContext.Provider value={{ language }}>
        <Router>
          <ViewDocument flag={flag} />
        </Router>
      </LanguageContext.Provider>
    );
  };

  beforeEach(() => {
    fetchDocument.mockResolvedValue({
      text: '<p>Test Document Content</p>',
      subject: 'Test Subject',
    });
    fetchDocumentAuthor.mockResolvedValue({
      _id: 'author-id',
    });
    fetchForm.mockResolvedValue({
      text: '<p>Approved Form</p>',
    });
    decodeValue.mockResolvedValue({
      user: { fname: 'John', lname: 'Doe', _id: 'user-id', id: '12345' },
    });
  });

  test('renders correctly and fetches the document data', async () => {
    renderComponent();
    expect(screen.getByText(/Request Number/i)).toBeInTheDocument();
    expect(screen.getByText(/Document Editor Component/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(fetchDocument).toHaveBeenCalled();
      expect(fetchDocumentAuthor).toHaveBeenCalled();
    });
  });

  test('shows error message when document fetch fails', async () => {
    fetchDocument.mockRejectedValueOnce(new Error('Failed to fetch document'));
    renderComponent();
    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch document/i)).toBeInTheDocument();
    });
  });

  test('conditionally renders approve and deny buttons when flag is true', async () => {
    renderComponent(true);
    expect(screen.getByText(/Approve/i)).toBeInTheDocument();
    expect(screen.getByText(/Deny/i)).toBeInTheDocument();
  });

  test('does not render approve and deny buttons when flag is false', async () => {
    renderComponent(false);
    expect(screen.queryByText(/Approve/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Deny/i)).not.toBeInTheDocument();
  });
});
