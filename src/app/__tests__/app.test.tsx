import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from '../app';
import { AppProviders } from '../appProviders';
import { AppRouter } from '../appRouter';
import { LanguageSwitcher } from '@shared/ui/languageSwitcher';

// Mock dependencies
jest.mock('../appProviders', () => ({
  AppProviders: ({ children }: { children: React.ReactNode }) => <div data-testid="app-providers">{children}</div>,
}));

jest.mock('../appRouter', () => ({
  AppRouter: () => <div data-testid="app-router">App Router</div>,
}));

jest.mock('@shared/ui/languageSwitcher', () => ({
  LanguageSwitcher: ({ label }: { label?: string }) => (
    <div data-testid="language-switcher">Language Switcher - {label}</div>
  ),
}));

jest.mock('@mui/material', () => ({
  CssBaseline: () => <div data-testid="css-baseline">CSS Baseline</div>,
  Container: ({ children, maxWidth }: { children: React.ReactNode; maxWidth: string }) => (
    <div data-testid="container" data-max-width={maxWidth}>{children}</div>
  ),
  Box: ({ children, component, ...props }: any) => (
    <div data-testid="box" data-component={component} {...props}>{children}</div>
  ),
}));

describe('App', () => {
  it('renders all main components', () => {
    render(<App />);
    
    expect(screen.getByTestId('app-providers')).toBeInTheDocument();
    expect(screen.getByTestId('css-baseline')).toBeInTheDocument();
    expect(screen.getByTestId('container')).toBeInTheDocument();
    expect(screen.getByTestId('app-router')).toBeInTheDocument();
    expect(screen.getByTestId('language-switcher')).toBeInTheDocument();
  });

  it('renders language switcher with correct label', () => {
    render(<App />);
    
    const languageSwitcher = screen.getByTestId('language-switcher');
    expect(languageSwitcher).toHaveTextContent('Language Switcher - Language');
  });

  it('has correct container max width', () => {
    render(<App />);
    
    const container = screen.getByTestId('container');
    expect(container).toHaveAttribute('data-max-width', 'md');
  });

  it('renders without crashing', () => {
    expect(() => render(<App />)).not.toThrow();
  });

  it('has proper navigation structure', () => {
    render(<App />);
    
    const box = screen.getByTestId('box');
    expect(box).toHaveAttribute('data-component', 'nav');
  });
});
