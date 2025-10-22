import React from 'react';
import { render, screen } from '@testing-library/react';
import { AppRouter } from '../appRouter';
import { ApplyPage } from '@pages/apply/applyPage';
import { SuccessPage } from '@pages/success/successPage';

// Mock dependencies
jest.mock('react-router-dom', () => ({
  Routes: ({ children }: { children: React.ReactNode }) => <div data-testid="routes">{children}</div>,
  Route: ({ path, element }: { path: string; element: React.ReactNode }) => (
    <div data-testid={`route-${path}`} data-path={path}>{element}</div>
  ),
  Navigate: ({ to, replace }: { to: string; replace?: boolean }) => (
    <div data-testid="navigate" data-to={to} data-replace={replace}>Navigate to {to}</div>
  ),
}));

jest.mock('@pages/apply/applyPage', () => ({
  ApplyPage: () => <div data-testid="apply-page">Apply Page</div>,
}));

jest.mock('@pages/success/successPage', () => ({
  SuccessPage: () => <div data-testid="success-page">Success Page</div>,
}));

describe('AppRouter', () => {
  it('renders all routes', () => {
    render(<AppRouter />);
    
    expect(screen.getByTestId('routes')).toBeInTheDocument();
    expect(screen.getByTestId('route-/')).toBeInTheDocument();
    expect(screen.getByTestId('route-/apply')).toBeInTheDocument();
    expect(screen.getByTestId('route-/success')).toBeInTheDocument();
    expect(screen.getByTestId('route-*')).toBeInTheDocument();
  });

  it('renders root route with navigate to apply', () => {
    render(<AppRouter />);
    
    const rootRoute = screen.getByTestId('route-/');
    expect(rootRoute).toHaveAttribute('data-path', '/');
    
    const navigateElements = screen.getAllByTestId('navigate');
    const rootNavigate = navigateElements.find(el => 
      el.getAttribute('data-to') === '/apply' && 
      el.getAttribute('data-replace') === 'true'
    );
    expect(rootNavigate).toBeInTheDocument();
  });

  it('renders apply page route', () => {
    render(<AppRouter />);
    
    const applyRoute = screen.getByTestId('route-/apply');
    expect(applyRoute).toHaveAttribute('data-path', '/apply');
    expect(screen.getByTestId('apply-page')).toBeInTheDocument();
  });

  it('renders success page route', () => {
    render(<AppRouter />);
    
    const successRoute = screen.getByTestId('route-/success');
    expect(successRoute).toHaveAttribute('data-path', '/success');
    expect(screen.getByTestId('success-page')).toBeInTheDocument();
  });

  it('renders catch-all route with navigate to apply', () => {
    render(<AppRouter />);
    
    const catchAllRoute = screen.getByTestId('route-*');
    expect(catchAllRoute).toHaveAttribute('data-path', '*');
    
    const navigateElements = screen.getAllByTestId('navigate');
    const catchAllNavigate = navigateElements.find(el => 
      el.getAttribute('data-to') === '/apply' && 
      el.getAttribute('data-replace') === 'true'
    );
    expect(catchAllNavigate).toBeInTheDocument();
  });

  it('renders without crashing', () => {
    expect(() => render(<AppRouter />)).not.toThrow();
  });
});
