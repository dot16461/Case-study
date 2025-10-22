import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SuccessPage } from '../successPage';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  Link: ({ children, to, ...props }: any) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'submitted': 'Application Submitted Successfully',
        'backToForm': 'Back to Form',
      };
      return translations[key] || key;
    },
  }),
}));

describe('SuccessPage', () => {
  it('renders success message', () => {
    render(<SuccessPage />);
    
    expect(screen.getByText('Application Submitted Successfully')).toBeInTheDocument();
  });

  it('renders back to form button', () => {
    render(<SuccessPage />);
    
    const backButton = screen.getByRole('link', { name: 'Back to Form' });
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute('href', '/apply');
  });

  it('has correct heading level', () => {
    render(<SuccessPage />);
    
    const heading = screen.getByRole('heading', { level: 4 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Application Submitted Successfully');
  });

  it('button has correct variant', () => {
    render(<SuccessPage />);
    
    const button = screen.getByRole('link', { name: 'Back to Form' });
    expect(button).toHaveClass('MuiButton-contained');
  });

  it('renders without crashing', () => {
    expect(() => render(<SuccessPage />)).not.toThrow();
  });

  it('has proper text alignment', () => {
    render(<SuccessPage />);
    
    const container = screen.getByText('Application Submitted Successfully').closest('div');
    expect(container).toHaveStyle('text-align: center');
  });
});
