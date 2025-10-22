import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppProviders } from '../appProviders';
import i18n from '@shared/lib/i18n';
import { store } from '../store';

// Mock dependencies
jest.mock('@shared/lib/i18n', () => ({
  dir: jest.fn(() => 'ltr'),
  language: 'en',
  on: jest.fn(),
  off: jest.fn(),
}));

jest.mock('../store', () => ({
  store: {
    getState: jest.fn(() => ({})),
    dispatch: jest.fn(),
    subscribe: jest.fn(),
  },
}));

jest.mock('react-i18next', () => ({
  I18nextProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="i18n-provider">{children}</div>
  ),
}));

jest.mock('react-redux', () => ({
  Provider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="redux-provider">{children}</div>
  ),
}));

jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="browser-router">{children}</div>
  ),
}));

jest.mock('@mui/material/styles', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
  ),
  createTheme: jest.fn(() => ({ direction: 'ltr' })),
}));

jest.mock('@emotion/react', () => ({
  CacheProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="cache-provider">{children}</div>
  ),
}));

jest.mock('@emotion/cache', () => ({
  __esModule: true,
  default: jest.fn(() => ({ key: 'test-cache' })),
}));

jest.mock('react-toastify', () => ({
  ToastContainer: () => <div data-testid="toast-container">Toast Container</div>,
}));

const mockI18n = i18n as jest.Mocked<typeof i18n>;

describe('AppProviders', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all providers', () => {
    render(
      <AppProviders>
        <div data-testid="test-child">Test Child</div>
      </AppProviders>
    );
    
    expect(screen.getByTestId('i18n-provider')).toBeInTheDocument();
    expect(screen.getByTestId('redux-provider')).toBeInTheDocument();
    expect(screen.getByTestId('cache-provider')).toBeInTheDocument();
    expect(screen.getByTestId('theme-provider')).toBeInTheDocument();
    expect(screen.getByTestId('browser-router')).toBeInTheDocument();
    expect(screen.getByTestId('toast-container')).toBeInTheDocument();
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });

  it('sets up i18n event listeners', () => {
    render(
      <AppProviders>
        <div>Test</div>
      </AppProviders>
    );
    
    expect(mockI18n.on).toHaveBeenCalledWith('languageChanged', expect.any(Function));
  });

  it('sets document attributes', () => {
    const setAttributeSpy = jest.spyOn(document.documentElement, 'setAttribute');
    
    render(
      <AppProviders>
        <div>Test</div>
      </AppProviders>
    );
    
    // Check that at least one attribute was set
    expect(setAttributeSpy).toHaveBeenCalledWith('dir', 'ltr');
  });

  it('cleans up i18n event listeners on unmount', () => {
    const { unmount } = render(
      <AppProviders>
        <div>Test</div>
      </AppProviders>
    );
    
    unmount();
    
    expect(mockI18n.off).toHaveBeenCalledWith('languageChanged', expect.any(Function));
  });

  it('renders without crashing', () => {
    expect(() => render(
      <AppProviders>
        <div>Test</div>
      </AppProviders>
    )).not.toThrow();
  });

  it('handles RTL direction', () => {
    mockI18n.dir.mockReturnValue('rtl');
    
    render(
      <AppProviders>
        <div>Test</div>
      </AppProviders>
    );
    
    const setAttributeSpy = jest.spyOn(document.documentElement, 'setAttribute');
    expect(setAttributeSpy).toHaveBeenCalledWith('dir', 'rtl');
  });

  it('renders children correctly', () => {
    render(
      <AppProviders>
        <div data-testid="child-component">Child Content</div>
      </AppProviders>
    );
    
    expect(screen.getByTestId('child-component')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });
});
