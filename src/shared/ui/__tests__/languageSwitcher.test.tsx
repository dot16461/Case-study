import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageSwitcher } from '../languageSwitcher';

// Mock i18next
jest.mock('i18next', () => ({
  language: 'en',
  changeLanguage: jest.fn(),
  on: jest.fn(),
  off: jest.fn(),
}));

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default label', () => {
    render(<LanguageSwitcher />);
    
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
  });

  it('renders with custom label', () => {
    render(<LanguageSwitcher label="Custom Label" />);
    
    expect(screen.getByLabelText('Custom Label')).toBeInTheDocument();
  });

  it('opens dropdown and shows language options', async () => {
    render(<LanguageSwitcher />);
    
    const selectButton = screen.getByRole('combobox');
    await userEvent.click(selectButton);
    
    expect(screen.getAllByText('English')).toHaveLength(2); // Select button and option
    expect(screen.getByText('العربية')).toBeInTheDocument();
  });

  it('calls i18n.changeLanguage when language is changed', async () => {
    const mockChangeLanguage = jest.fn();
    const i18next = require('i18next');
    i18next.changeLanguage = mockChangeLanguage;
    
    render(<LanguageSwitcher />);
    
    const selectButton = screen.getByRole('combobox');
    await userEvent.click(selectButton);
    
    const arabicOption = screen.getByText('العربية');
    await userEvent.click(arabicOption);
    
    expect(mockChangeLanguage).toHaveBeenCalledWith('ar');
  });

  it('sets up and cleans up i18n event listeners', () => {
    const mockOn = jest.fn();
    const mockOff = jest.fn();
    const i18next = require('i18next');
    i18next.on = mockOn;
    i18next.off = mockOff;
    
    const { unmount } = render(<LanguageSwitcher />);
    
    expect(mockOn).toHaveBeenCalledWith('languageChanged', expect.any(Function));
    
    unmount();
    
    expect(mockOff).toHaveBeenCalledWith('languageChanged', expect.any(Function));
  });

  it('displays current language correctly', () => {
    const i18next = require('i18next');
    i18next.language = 'ar';
    
    render(<LanguageSwitcher />);
    
    const selectButton = screen.getByRole('combobox');
    expect(selectButton).toHaveTextContent('العربية');
  });
});
