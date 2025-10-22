import React from 'react';
import { render } from '@testing-library/react';
import { LanguageManager } from '../languageManager';

// Mock react-i18next
const mockI18n = {
  language: 'en',
  on: jest.fn(),
  off: jest.fn(),
};

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: mockI18n,
  }),
}));

describe('LanguageManager', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset document attributes
    document.documentElement.lang = '';
    document.documentElement.dir = '';
  });

  it('renders nothing', () => {
    const { container } = render(<LanguageManager />);
    expect(container.firstChild).toBeNull();
  });

  it('sets initial document language and direction', () => {
    render(<LanguageManager />);
    
    expect(document.documentElement.lang).toBe('en');
    expect(document.documentElement.dir).toBe('ltr');
  });

  it('sets RTL direction for Arabic language', () => {
    mockI18n.language = 'ar';
    
    render(<LanguageManager />);
    
    expect(document.documentElement.lang).toBe('ar');
    expect(document.documentElement.dir).toBe('rtl');
  });

  it('sets LTR direction for non-Arabic languages', () => {
    mockI18n.language = 'fr';
    
    render(<LanguageManager />);
    
    expect(document.documentElement.lang).toBe('fr');
    expect(document.documentElement.dir).toBe('ltr');
  });

  it('registers language change listener', () => {
    render(<LanguageManager />);
    
    expect(mockI18n.on).toHaveBeenCalledWith('languageChanged', expect.any(Function));
  });

  it('unregisters language change listener on unmount', () => {
    const { unmount } = render(<LanguageManager />);
    
    unmount();
    
    expect(mockI18n.off).toHaveBeenCalledWith('languageChanged', expect.any(Function));
  });

  it('updates document when language changes', () => {
    const { unmount } = render(<LanguageManager />);
    
    // Get the callback function that was registered
    const languageChangeCallback = mockI18n.on.mock.calls[0][1];
    
    // Simulate language change
    mockI18n.language = 'ar';
    languageChangeCallback();
    
    expect(document.documentElement.lang).toBe('ar');
    expect(document.documentElement.dir).toBe('rtl');
    
    // Simulate another language change
    mockI18n.language = 'en';
    languageChangeCallback();
    
    expect(document.documentElement.lang).toBe('en');
    expect(document.documentElement.dir).toBe('ltr');
    
    unmount();
  });

  it('handles multiple language changes correctly', () => {
    const { unmount } = render(<LanguageManager />);
    
    const languageChangeCallback = mockI18n.on.mock.calls[0][1];
    
    // Test multiple language changes
    const languages = ['en', 'ar', 'fr', 'es'];
    const expectedDirections = ['ltr', 'rtl', 'ltr', 'ltr'];
    
    languages.forEach((lang, index) => {
      mockI18n.language = lang;
      languageChangeCallback();
      
      expect(document.documentElement.lang).toBe(lang);
      expect(document.documentElement.dir).toBe(expectedDirections[index]);
    });
    
    unmount();
  });
});
