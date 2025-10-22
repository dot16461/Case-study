import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Step3Situation } from '../step3Situation';
import { SituationDescriptions } from '@entities/application/model/application.types';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'helpMeWrite': 'Help Me Write',
        'prompts.currentFinancial': 'Describe your current financial situation',
        'prompts.employment': 'Describe your employment circumstances',
        'prompts.reason': 'Explain why you are applying',
        'fields.currentFinancialSituation': 'Current Financial Situation',
        'fields.employmentCircumstances': 'Employment Circumstances',
        'fields.reasonForApplying': 'Reason for Applying',
      };
      return translations[key] || key;
    },
  }),
}));

// Mock react-hook-form
jest.mock('react-hook-form', () => ({
  useForm: () => ({
    control: {},
    handleSubmit: (fn: any) => (e: any) => {
      e.preventDefault();
      fn({
        currentFinancialSituation: 'I am currently unemployed and struggling financially.',
        employmentCircumstances: 'I lost my job due to company downsizing.',
        reasonForApplying: 'I need financial assistance to cover basic living expenses.',
      });
    },
    setValue: jest.fn(),
  }),
}));

// Mock @hookform/resolvers/zod
jest.mock('@hookform/resolvers/zod', () => ({
  zodResolver: jest.fn(),
}));

// Mock FormTextarea
jest.mock('@shared/ui/formTextarea', () => ({
  FormTextarea: ({ name, label }: any) => (
    <div data-testid={`field-${name}`}>
      <label>{label}</label>
      <textarea name={name} />
    </div>
  ),
}));

// Mock HelpMeWriteButton
jest.mock('@features/helpMeWrite/ui/helpMeWriteButton', () => ({
  HelpMeWriteButton: ({ label, placeholder, onResult, disabled }: any) => (
    <button
      onClick={() => onResult && onResult('Generated text')}
      disabled={disabled}
      data-testid="help-me-write-button"
    >
      {label}
    </button>
  ),
}));

// Mock AiSuggestionDialog
jest.mock('../../aiSuggestionDialog', () => ({
  AiSuggestionDialog: ({ open, onClose, onAccept }: any) => 
    open ? (
      <div data-testid="ai-suggestion-dialog">
        <button onClick={() => onAccept('Accepted text')}>Accept</button>
        <button onClick={onClose}>Close</button>
      </div>
    ) : null,
}));

describe('Step3Situation', () => {
  const mockDefaultValues: SituationDescriptions = {
    currentFinancialSituation: 'I am currently unemployed and struggling financially.',
    employmentCircumstances: 'I lost my job due to company downsizing.',
    reasonForApplying: 'I need financial assistance to cover basic living expenses.',
  };

  const mockOnValid = jest.fn();
  const mockOnGeneratingChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all form fields', () => {
    render(
      <Step3Situation
        defaultValues={mockDefaultValues}
        onValid={mockOnValid}
        onGeneratingChange={mockOnGeneratingChange}
      />
    );

    expect(screen.getByTestId('field-currentFinancialSituation')).toBeInTheDocument();
    expect(screen.getByTestId('field-employmentCircumstances')).toBeInTheDocument();
    expect(screen.getByTestId('field-reasonForApplying')).toBeInTheDocument();
  });

  it('renders form with correct structure', () => {
    render(
      <Step3Situation
        defaultValues={mockDefaultValues}
        onValid={mockOnValid}
        onGeneratingChange={mockOnGeneratingChange}
      />
    );

    const form = document.querySelector('form');
    expect(form).toBeInTheDocument();
  });

  it('renders help me write buttons', () => {
    render(
      <Step3Situation
        defaultValues={mockDefaultValues}
        onValid={mockOnValid}
        onGeneratingChange={mockOnGeneratingChange}
      />
    );

    const helpButtons = screen.getAllByTestId('help-me-write-button');
    expect(helpButtons).toHaveLength(3);
  });

  it('calls onValid when form is submitted', async () => {
    render(
      <Step3Situation
        defaultValues={mockDefaultValues}
        onValid={mockOnValid}
        onGeneratingChange={mockOnGeneratingChange}
      />
    );

    const form = document.querySelector('form');
    expect(form).toBeInTheDocument();
    
    if (form) {
      fireEvent.submit(form);
    }

    expect(mockOnValid).toHaveBeenCalledWith({
      currentFinancialSituation: 'I am currently unemployed and struggling financially.',
      employmentCircumstances: 'I lost my job due to company downsizing.',
      reasonForApplying: 'I need financial assistance to cover basic living expenses.',
    });
  });

  it('renders with different default values', () => {
    const differentValues: SituationDescriptions = {
      currentFinancialSituation: 'Different financial situation.',
      employmentCircumstances: 'Different employment circumstances.',
      reasonForApplying: 'Different reason for applying.',
    };

    render(
      <Step3Situation
        defaultValues={differentValues}
        onValid={mockOnValid}
        onGeneratingChange={mockOnGeneratingChange}
      />
    );

    expect(screen.getByTestId('field-currentFinancialSituation')).toBeInTheDocument();
    expect(screen.getByTestId('field-reasonForApplying')).toBeInTheDocument();
  });

  it('handles help me write button clicks', async () => {
    render(
      <Step3Situation
        defaultValues={mockDefaultValues}
        onValid={mockOnValid}
        onGeneratingChange={mockOnGeneratingChange}
      />
    );

    const helpButtons = screen.getAllByTestId('help-me-write-button');
    await userEvent.click(helpButtons[0]);

    expect(screen.getByTestId('ai-suggestion-dialog')).toBeInTheDocument();
  });

  it('handles dialog accept', async () => {
    render(
      <Step3Situation
        defaultValues={mockDefaultValues}
        onValid={mockOnValid}
        onGeneratingChange={mockOnGeneratingChange}
      />
    );

    const helpButtons = screen.getAllByTestId('help-me-write-button');
    await userEvent.click(helpButtons[0]);

    const acceptButton = screen.getByText('Accept');
    await userEvent.click(acceptButton);

    expect(screen.queryByTestId('ai-suggestion-dialog')).not.toBeInTheDocument();
  });

  it('handles dialog close', async () => {
    render(
      <Step3Situation
        defaultValues={mockDefaultValues}
        onValid={mockOnValid}
        onGeneratingChange={mockOnGeneratingChange}
      />
    );

    const helpButtons = screen.getAllByTestId('help-me-write-button');
    await userEvent.click(helpButtons[0]);

    const closeButton = screen.getByText('Close');
    await userEvent.click(closeButton);

    expect(screen.queryByTestId('ai-suggestion-dialog')).not.toBeInTheDocument();
  });
});
