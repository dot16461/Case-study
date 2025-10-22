import React from 'react';
import { render, screen } from '@testing-library/react';
import { WizardLayout } from '../wizardLayout';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'appTitle': 'Application Form',
        'applicationForm': 'Application Form',
      };
      return translations[key] || key;
    },
  }),
}));

// Mock WizardSteps component
jest.mock('../wizardSteps', () => ({
  __esModule: true,
  default: () => <div data-testid="wizard-steps">Wizard Steps</div>,
}));

describe('WizardLayout', () => {
  it('renders main content with correct structure', () => {
    render(<WizardLayout />);
    
    const main = screen.getByRole('main');
    expect(main).toBeInTheDocument();
    expect(main).toHaveAttribute('id', 'main-content');
  });

  it('renders application title', () => {
    render(<WizardLayout />);
    
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Application Form');
  });

  it('renders paper container with correct accessibility', () => {
    render(<WizardLayout />);
    
    const paper = screen.getByRole('region');
    expect(paper).toBeInTheDocument();
    expect(paper).toHaveAttribute('aria-label', 'Application Form');
  });

  it('renders wizard steps component', () => {
    render(<WizardLayout />);
    
    expect(screen.getByTestId('wizard-steps')).toBeInTheDocument();
  });

  it('has correct semantic structure', () => {
    render(<WizardLayout />);
    
    const main = screen.getByRole('main');
    const heading = screen.getByRole('heading', { level: 1 });
    const region = screen.getByRole('region');
    
    expect(main).toContainElement(heading);
    expect(main).toContainElement(region);
  });
});
