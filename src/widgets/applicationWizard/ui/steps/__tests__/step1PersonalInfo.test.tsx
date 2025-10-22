import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Step1PersonalInfo } from '../step1PersonalInfo';
import { PersonalInfo } from '@entities/application/model/application.types';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'fields.name': 'Name',
        'fields.nationalId': 'National ID',
        'fields.dateOfBirth': 'Date of Birth',
        'fields.gender': 'Gender',
        'fields.address': 'Address',
        'fields.city': 'City',
        'fields.state': 'State',
        'fields.country': 'Country',
        'fields.phone': 'Phone',
        'fields.email': 'Email',
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
        name: 'John Doe',
        nationalId: '123456789',
        dateOfBirth: '1990-01-01',
        gender: 'male',
        address: '123 Main St',
        city: 'Test City',
        state: 'Test State',
        country: 'Test Country',
        phone: '+1234567890',
        email: 'john@example.com',
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

describe('Step1PersonalInfo', () => {
  const mockDefaultValues: PersonalInfo = {
    name: 'John Doe',
    nationalId: '123456789',
    dateOfBirth: '1990-01-01',
    gender: 'male',
    address: '123 Main St',
    city: 'Test City',
    state: 'Test State',
    country: 'Test Country',
    phone: '+1234567890',
    email: 'john@example.com',
  };

  const mockOnValid = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all form fields', () => {
    render(
      <Step1PersonalInfo
        defaultValues={mockDefaultValues}
        onValid={mockOnValid}
      />
    );

    expect(screen.getByTestId('field-name')).toBeInTheDocument();
    expect(screen.getByTestId('field-nationalId')).toBeInTheDocument();
    expect(screen.getByTestId('field-dateOfBirth')).toBeInTheDocument();
    expect(screen.getByTestId('field-gender')).toBeInTheDocument();
    expect(screen.getByTestId('field-address')).toBeInTheDocument();
    expect(screen.getByTestId('field-city')).toBeInTheDocument();
    expect(screen.getByTestId('field-state')).toBeInTheDocument();
    expect(screen.getByTestId('field-country')).toBeInTheDocument();
    expect(screen.getByTestId('field-phone')).toBeInTheDocument();
    expect(screen.getByTestId('field-email')).toBeInTheDocument();
  });

  it('renders form with correct structure', () => {
    render(
      <Step1PersonalInfo
        defaultValues={mockDefaultValues}
        onValid={mockOnValid}
      />
    );

    const form = document.querySelector('form');
    expect(form).toBeInTheDocument();
  });

  it('calls onValid when form is submitted', async () => {
    render(
      <Step1PersonalInfo
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
      name: 'John Doe',
      nationalId: '123456789',
      dateOfBirth: '1990-01-01',
      gender: 'male',
      address: '123 Main St',
      city: 'Test City',
      state: 'Test State',
      country: 'Test Country',
      phone: '+1234567890',
      email: 'john@example.com',
    });
  });

  it('renders with different default values', () => {
    const differentValues: PersonalInfo = {
      name: 'Jane Smith',
      nationalId: '987654321',
      dateOfBirth: '1985-05-15',
      gender: 'female',
      address: '456 Oak Ave',
      city: 'Another City',
      state: 'Another State',
      country: 'Another Country',
      phone: '+0987654321',
      email: 'jane@example.com',
    };

    render(
      <Step1PersonalInfo
        defaultValues={differentValues}
        onValid={mockOnValid}
      />
    );

    expect(screen.getByTestId('field-name')).toBeInTheDocument();
    expect(screen.getByTestId('field-email')).toBeInTheDocument();
  });
});
