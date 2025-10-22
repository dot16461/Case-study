import React from 'react';
import { render, screen } from '@testing-library/react';
import { ApplyPage } from '../applyPage';
import { WizardLayout } from '@widgets/applicationWizard/ui/wizardLayout';

// Mock WizardLayout component
jest.mock('@widgets/applicationWizard/ui/wizardLayout', () => ({
  WizardLayout: () => <div data-testid="wizard-layout">Wizard Layout</div>,
}));

describe('ApplyPage', () => {
  it('renders WizardLayout component', () => {
    render(<ApplyPage />);
    
    expect(screen.getByTestId('wizard-layout')).toBeInTheDocument();
    expect(screen.getByText('Wizard Layout')).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    expect(() => render(<ApplyPage />)).not.toThrow();
  });
});
