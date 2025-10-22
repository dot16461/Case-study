import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { configureStore } from '@reduxjs/toolkit';
// Create a test theme
const testTheme = createTheme({
  direction: 'ltr',
});

// Create a test store
export const createTestStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      wizard: (state = { currentStep: 1, totalSteps: 3, application: {} }, action) => state,
    },
    preloadedState,
  });
};

// Custom render function with providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  preloadedState?: any;
  store?: ReturnType<typeof createTestStore>;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = createTestStore(preloadedState),
    ...renderOptions
  }: CustomRenderOptions = {}
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={testTheme}>
          {children}
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  );

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};

// Mock API responses
export const mockApiResponse = (data: any, status = 200) => {
  return Promise.resolve({
    data,
    status,
    statusText: 'OK',
    headers: {},
    config: {},
  });
};

// Mock GPT API response
export const mockGptResponse = (text: string) => {
  return {
    choices: [
      {
        message: {
          content: text,
        },
      },
    ],
  };
};

// Test data
export const mockApplicationData = {
  personalInfo: {
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
  },
  familyFinancial: {
    maritalStatus: 'single',
    dependents: 0,
    employmentStatus: 'unemployed',
    monthlyIncome: 0,
    housingStatus: 'renting',
  },
  situationDescriptions: {
    currentFinancialSituation: 'I am currently unemployed and struggling financially.',
    employmentCircumstances: 'I lost my job due to company downsizing.',
    reasonForApplying: 'I need financial assistance to cover basic living expenses.',
  },
};

// Re-export everything
export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
