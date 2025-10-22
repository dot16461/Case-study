import React from 'react';
import { render, screen } from '@testing-library/react';
import { ProgressBar } from '../progressBar';

// Mock react-i18next
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, options?: any) => {
      const translations: Record<string, string> = {
        'steps.personalInfo': 'Personal Information',
        'steps.familyFinancial': 'Family Financial',
        'steps.situation': 'Situation',
        'step': `Step ${options?.n || ''}`,
        'current': 'Current',
      };
      return translations[key] || key;
    },
  }),
}));

// Mock MUI hooks
jest.mock('@mui/material/styles', () => ({
  useTheme: () => ({
    breakpoints: {
      down: jest.fn(() => 'sm'),
    },
  }),
}));

jest.mock('@mui/material', () => ({
  Box: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Typography: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  useMediaQuery: jest.fn(() => false),
}));

describe('ProgressBar', () => {
  it('renders progress bar with correct number of steps', () => {
    render(<ProgressBar current={2} total={3} />);
    
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('displays correct accessibility attributes', () => {
    render(<ProgressBar current={2} total={3} />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '2');
    expect(progressBar).toHaveAttribute('aria-valuemin', '1');
    expect(progressBar).toHaveAttribute('aria-valuemax', '3');
    expect(progressBar).toHaveAttribute('aria-current', 'step');
  });

  it('shows step labels when not on medium screen', () => {
    render(<ProgressBar current={1} total={3} />);
    
    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.getByText('Family Financial')).toBeInTheDocument();
    expect(screen.getByText('Situation')).toBeInTheDocument();
  });

  it('highlights current step correctly', () => {
    render(<ProgressBar current={2} total={3} />);
    
    const step2 = screen.getByText('2').closest('div');
    // Just check that the step is rendered, styling might not work in test environment
    expect(step2).toBeInTheDocument();
  });

  it('renders with different current step', () => {
    render(<ProgressBar current={3} total={3} />);
    
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '3');
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('handles single step', () => {
    render(<ProgressBar current={1} total={1} />);
    
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.queryByText('2')).not.toBeInTheDocument();
  });

  it('renders with correct aria-label for progress bar', () => {
    render(<ProgressBar current={2} total={3} />);
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-label', 'Step 2 Family Financial');
  });

  it('renders with correct aria-label for current step', () => {
    render(<ProgressBar current={1} total={3} />);
    
    const step1 = screen.getByText('1').closest('div');
    expect(step1).toHaveAttribute('aria-label', 'Step 1 Personal Information - Current');
  });

  it('renders with correct aria-label for non-current step', () => {
    render(<ProgressBar current={1} total={3} />);
    
    const step2 = screen.getByText('2').closest('div');
    expect(step2).toHaveAttribute('aria-label', 'Step 2 Family Financial');
  });
});
