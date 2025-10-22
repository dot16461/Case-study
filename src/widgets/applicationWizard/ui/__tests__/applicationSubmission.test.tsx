import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ApplicationSubmission } from '../applicationSubmission';
import { Provider } from 'react-redux';
import { store } from '@app/store';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'reviewApplication': 'Review Application',
        'personalInformation': 'Personal Information',
        'familyFinancialInfo': 'Family Financial Info',
        'situationDescriptions': 'Situation Descriptions',
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
        'fields.maritalStatus': 'Marital Status',
        'fields.dependents': 'Dependents',
        'fields.employmentStatus': 'Employment Status',
        'fields.monthlyIncome': 'Monthly Income',
        'fields.housingStatus': 'Housing Status',
        'fields.currentFinancialSituation': 'Current Financial Situation',
        'fields.employmentCircumstances': 'Employment Circumstances',
        'fields.reasonForApplying': 'Reason for Applying',
        'noDescription': 'No description provided',
        'back': 'Back',
        'submit': 'Submit',
        'redirectingMessage': 'Redirecting...',
        'unexpectedError': 'An unexpected error occurred',
        'submittedSuccessfully': 'Application submitted successfully',
        'submissionFailed': 'Submission failed',
      };
      return translations[key] || key;
    },
  }),
}));

// Mock submitApplication
jest.mock('@shared/api/mockApi', () => ({
  submitApplication: jest.fn(),
}));

import { submitApplication } from '@shared/api/mockApi';
const mockSubmitApplication = submitApplication as jest.MockedFunction<typeof submitApplication>;

describe('ApplicationSubmission', () => {
  const mockOnSuccess = jest.fn();
  const mockOnBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderWithProvider = () => {
    return render(
      <Provider store={store}>
        <ApplicationSubmission
          onSuccess={mockOnSuccess}
          onBack={mockOnBack}
        />
      </Provider>
    );
  };

  it('renders application review form', () => {
    renderWithProvider();

    expect(screen.getByText('Review Application')).toBeInTheDocument();
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.getByText('Family Financial Info')).toBeInTheDocument();
    expect(screen.getByText('Situation Descriptions')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument();
  });

  it('displays personal information', () => {
    renderWithProvider();

    expect(screen.getByText('Name:')).toBeInTheDocument();
    expect(screen.getByText('National ID:')).toBeInTheDocument();
    expect(screen.getByText('Email:')).toBeInTheDocument();
  });

  it('displays family financial information', () => {
    renderWithProvider();

    expect(screen.getByText('Marital Status:')).toBeInTheDocument();
    expect(screen.getByText(/Dependents:/)).toBeInTheDocument();
    expect(screen.getByText(/Monthly Income:/)).toBeInTheDocument();
  });

  it('displays situation descriptions', () => {
    renderWithProvider();

    expect(screen.getByText('Current Financial Situation:')).toBeInTheDocument();
    expect(screen.getByText('Employment Circumstances:')).toBeInTheDocument();
    expect(screen.getByText('Reason for Applying:')).toBeInTheDocument();
  });

  it('handles back button click', async () => {
    renderWithProvider();

    const backButton = screen.getByRole('button', { name: 'Back' });
    await userEvent.click(backButton);

    expect(mockOnBack).toHaveBeenCalled();
  });

  it('displays no description when situation descriptions are empty', () => {
    renderWithProvider();

    expect(screen.getAllByText('No description provided')).toHaveLength(3);
  });
});
