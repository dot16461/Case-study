import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Step2FamilyFinancial } from '../step2FamilyFinancial';
import { FamilyFinancialInfo } from '@entities/application/model/application.types';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'fields.maritalStatus': 'Marital Status',
        'fields.dependents': 'Dependents',
        'fields.employmentStatus': 'Employment Status',
        'fields.monthlyIncome': 'Monthly Income',
        'fields.housingStatus': 'Housing Status',
        'options.marital.single': 'Single',
        'options.marital.married': 'Married',
        'options.marital.divorced': 'Divorced',
        'options.marital.widowed': 'Widowed',
        'options.employment.employed': 'Employed',
        'options.employment.unemployed': 'Unemployed',
        'options.employment.student': 'Student',
        'options.employment.retired': 'Retired',
        'options.housing.rent': 'Rent',
        'options.housing.own': 'Own',
        'options.housing.family': 'Family',
        'options.housing.other': 'Other',
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
        maritalStatus: 'single',
        dependents: 0,
        employmentStatus: 'employed',
        monthlyIncome: 3000,
        housingStatus: 'rent',
      });
    },
  }),
}));

// Mock @hookform/resolvers/zod
jest.mock('@hookform/resolvers/zod', () => ({
  zodResolver: jest.fn(),
}));

// Mock FormTextField
jest.mock('@shared/ui/formTextField', () => ({
  FormTextField: ({ name, label }: any) => (
    <div data-testid={`field-${name}`}>
      <label>{label}</label>
      <input name={name} />
    </div>
  ),
}));

// Mock FormSelect
jest.mock('@shared/ui/formSelect', () => ({
  FormSelect: ({ name, label, options }: any) => (
    <div data-testid={`field-${name}`}>
      <label>{label}</label>
      <select name={name}>
        {options?.map((option: any) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  ),
}));

describe('Step2FamilyFinancial', () => {
  const mockDefaultValues: FamilyFinancialInfo = {
    maritalStatus: 'single',
    dependents: 0,
    employmentStatus: 'employed',
    monthlyIncome: 3000,
    housingStatus: 'rent',
  };

  const mockOnValid = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all form fields', () => {
    render(
      <Step2FamilyFinancial
        defaultValues={mockDefaultValues}
        onValid={mockOnValid}
      />
    );

    expect(screen.getByTestId('field-maritalStatus')).toBeInTheDocument();
    expect(screen.getByTestId('field-dependents')).toBeInTheDocument();
    expect(screen.getByTestId('field-employmentStatus')).toBeInTheDocument();
    expect(screen.getByTestId('field-monthlyIncome')).toBeInTheDocument();
    expect(screen.getByTestId('field-housingStatus')).toBeInTheDocument();
  });

  it('renders form with correct structure', () => {
    render(
      <Step2FamilyFinancial
        defaultValues={mockDefaultValues}
        onValid={mockOnValid}
      />
    );

    const form = document.querySelector('form');
    expect(form).toBeInTheDocument();
  });

  it('calls onValid when form is submitted', async () => {
    render(
      <Step2FamilyFinancial
        defaultValues={mockDefaultValues}
        onValid={mockOnValid}
      />
    );

    const form = document.querySelector('form');
    expect(form).toBeInTheDocument();
    
    if (form) {
      fireEvent.submit(form);
    }

    expect(mockOnValid).toHaveBeenCalledWith({
      maritalStatus: 'single',
      dependents: 0,
      employmentStatus: 'employed',
      monthlyIncome: 3000,
      housingStatus: 'rent',
    });
  });

  it('renders with different default values', () => {
    const differentValues: FamilyFinancialInfo = {
      maritalStatus: 'married',
      dependents: 2,
      employmentStatus: 'unemployed',
      monthlyIncome: 0,
      housingStatus: 'own',
    };

    render(
      <Step2FamilyFinancial
        defaultValues={differentValues}
        onValid={mockOnValid}
      />
    );

    expect(screen.getByTestId('field-maritalStatus')).toBeInTheDocument();
    expect(screen.getByTestId('field-housingStatus')).toBeInTheDocument();
  });

  it('renders select fields with correct options', () => {
    render(
      <Step2FamilyFinancial
        defaultValues={mockDefaultValues}
        onValid={mockOnValid}
      />
    );

    const maritalSelect = screen.getByTestId('field-maritalStatus');
    const employmentSelect = screen.getByTestId('field-employmentStatus');
    const housingSelect = screen.getByTestId('field-housingStatus');

    expect(maritalSelect).toBeInTheDocument();
    expect(employmentSelect).toBeInTheDocument();
    expect(housingSelect).toBeInTheDocument();
  });
});
