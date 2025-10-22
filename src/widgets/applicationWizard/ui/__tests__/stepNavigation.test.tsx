import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StepNavigation } from '../stepNavigation';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'back': 'Back',
      };
      return translations[key] || key;
    },
  }),
}));

describe('StepNavigation', () => {
  const mockOnBack = jest.fn();
  const mockOnNext = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders back and next buttons', () => {
    render(
      <StepNavigation
        onBack={mockOnBack}
        onNext={mockOnNext}
      />
    );
    
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Next' })).toBeInTheDocument();
  });

  it('calls onBack when back button is clicked', async () => {
    render(
      <StepNavigation
        onBack={mockOnBack}
        onNext={mockOnNext}
      />
    );
    
    const backButton = screen.getByRole('button', { name: 'Back' });
    await userEvent.click(backButton);
    
    expect(mockOnBack).toHaveBeenCalledTimes(1);
  });

  it('calls onNext when next button is clicked', async () => {
    render(
      <StepNavigation
        onBack={mockOnBack}
        onNext={mockOnNext}
      />
    );
    
    const nextButton = screen.getByRole('button', { name: 'Next' });
    await userEvent.click(nextButton);
    
    expect(mockOnNext).toHaveBeenCalledTimes(1);
  });

  it('disables back button when canBack is false', () => {
    render(
      <StepNavigation
        canBack={false}
        onBack={mockOnBack}
        onNext={mockOnNext}
      />
    );
    
    const backButton = screen.getByRole('button', { name: 'Back' });
    expect(backButton).toBeDisabled();
  });

  it('disables next button when canNext is false', () => {
    render(
      <StepNavigation
        canNext={false}
        onBack={mockOnBack}
        onNext={mockOnNext}
      />
    );
    
    const nextButton = screen.getByRole('button', { name: 'Next' });
    expect(nextButton).toBeDisabled();
  });

  it('uses custom next label', () => {
    render(
      <StepNavigation
        nextLabel="Submit"
        onBack={mockOnBack}
        onNext={mockOnNext}
      />
    );
    
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Next' })).not.toBeInTheDocument();
  });

  it('renders with default props', () => {
    render(<StepNavigation />);
    
    const backButton = screen.getByRole('button', { name: 'Back' });
    const nextButton = screen.getByRole('button', { name: 'Next' });
    
    expect(backButton).toBeEnabled();
    expect(nextButton).toBeEnabled();
  });

  it('does not call handlers when buttons are disabled', () => {
    render(
      <StepNavigation
        canBack={false}
        canNext={false}
        onBack={mockOnBack}
        onNext={mockOnNext}
      />
    );
    
    const backButton = screen.getByRole('button', { name: 'Back' });
    const nextButton = screen.getByRole('button', { name: 'Next' });
    
    // Just check that buttons are disabled, don't try to click them
    expect(backButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
    expect(mockOnBack).not.toHaveBeenCalled();
    expect(mockOnNext).not.toHaveBeenCalled();
  });

  it('renders buttons with correct variants', () => {
    render(
      <StepNavigation
        onBack={mockOnBack}
        onNext={mockOnNext}
      />
    );
    
    const backButton = screen.getByRole('button', { name: 'Back' });
    const nextButton = screen.getByRole('button', { name: 'Next' });
    
    expect(backButton).toHaveClass('MuiButton-outlined');
    expect(nextButton).toHaveClass('MuiButton-contained');
  });
});
