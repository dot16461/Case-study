import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WizardSteps from '../wizardSteps';
import { Provider } from 'react-redux';
import { store } from '@app/store';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'generating': 'Generating...',
        'submitting': 'Submitting...',
        'progress': 'Progress',
        'submission': 'Submission',
        'form': 'Form',
        'navigation': 'Navigation',
        'next': 'Next',
        'back': 'Back',
      };
      return translations[key] || key;
    },
  }),
}));

// Mock components
jest.mock('../progressBar', () => ({
  ProgressBar: ({ current, total }: any) => (
    <div data-testid="progress-bar">
      Step {current} of {total}
    </div>
  ),
}));

jest.mock('../stepNavigation', () => ({
  StepNavigation: ({ canBack, canNext, onBack, onNext }: any) => (
    <div data-testid="step-navigation">
      <button onClick={onBack} disabled={!canBack}>Back</button>
      <button onClick={onNext} disabled={!canNext}>Next</button>
    </div>
  ),
}));

jest.mock('../wizardStepManager', () => ({
  WizardStepManager: ({ onSubmit, onGeneratingChange }: any) => (
    <div data-testid="wizard-step-manager">
      <button onClick={() => onSubmit()}>Submit</button>
      <button onClick={() => onGeneratingChange(true)}>Start Generating</button>
    </div>
  ),
}));

jest.mock('../applicationSubmission', () => ({
  ApplicationSubmission: ({ onSuccess, onBack }: any) => (
    <div data-testid="application-submission">
      <button onClick={onSuccess}>Success</button>
      <button onClick={onBack}>Back</button>
    </div>
  ),
}));

jest.mock('@shared/ui', () => ({
  ScreenReaderAnnouncement: ({ message }: any) => (
    <div data-testid="screen-reader-announcement">{message}</div>
  ),
}));

// Mock document.querySelector
const mockForm = {
  requestSubmit: jest.fn(),
};
Object.defineProperty(document, 'querySelector', {
  value: jest.fn(() => mockForm),
  writable: true,
});

describe('WizardSteps', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithProvider = () => {
    return render(
      <Provider store={store}>
        <WizardSteps />
      </Provider>
    );
  };

  it('renders all main components', () => {
    renderWithProvider();

    expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
    expect(screen.getByTestId('wizard-step-manager')).toBeInTheDocument();
    expect(screen.getByTestId('step-navigation')).toBeInTheDocument();
  });

  it('renders progress bar with correct props', () => {
    renderWithProvider();

    expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();
  });

  it('shows application submission when submitting', async () => {
    renderWithProvider();

    const submitButton = screen.getByText('Submit');
    await userEvent.click(submitButton);

    expect(screen.getByTestId('application-submission')).toBeInTheDocument();
    expect(screen.queryByTestId('wizard-step-manager')).not.toBeInTheDocument();
  });

  it('handles submission success', async () => {
    renderWithProvider();

    // Start submission
    const submitButton = screen.getByText('Submit');
    await userEvent.click(submitButton);

    // Complete submission
    const successButton = screen.getByText('Success');
    await userEvent.click(successButton);

    expect(screen.getByTestId('wizard-step-manager')).toBeInTheDocument();
    expect(screen.queryByTestId('application-submission')).not.toBeInTheDocument();
  });

  it('handles back from submission', async () => {
    renderWithProvider();

    // Start submission
    const submitButton = screen.getByText('Submit');
    await userEvent.click(submitButton);

    // Go back
    const backButton = screen.getByText('Back');
    await userEvent.click(backButton);

    expect(screen.getByTestId('wizard-step-manager')).toBeInTheDocument();
    expect(screen.queryByTestId('application-submission')).not.toBeInTheDocument();
  });

  it('handles generating state', async () => {
    renderWithProvider();

    const generateButton = screen.getByText('Start Generating');
    await userEvent.click(generateButton);

    expect(screen.getByText('Generating...')).toBeInTheDocument();
  });

  it('handles next button click', async () => {
    renderWithProvider();

    const nextButton = screen.getByText('Next');
    await userEvent.click(nextButton);

    expect(mockForm.requestSubmit).toHaveBeenCalled();
  });

  it('renders screen reader announcements', () => {
    renderWithProvider();

    expect(screen.getByTestId('screen-reader-announcement')).toBeInTheDocument();
  });

  it('hides navigation when submitting', async () => {
    renderWithProvider();

    const submitButton = screen.getByText('Submit');
    await userEvent.click(submitButton);

    expect(screen.queryByTestId('step-navigation')).not.toBeInTheDocument();
  });
});
