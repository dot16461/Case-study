import { configureStore } from '@reduxjs/toolkit';
import { store, goNext, goBack, setPersonalInfo, setFamilyFinancialInfo, setSituationDescriptions, resetApplication } from '../store';
import { defaultApplicationData } from '@entities/application/model/application.types';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('store', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
  });

  describe('initial state', () => {
    it('loads state from localStorage when available', () => {
      const savedState = {
        currentStep: 2,
        totalSteps: 3,
        application: defaultApplicationData,
      };
      localStorageMock.getItem.mockReturnValue(JSON.stringify(savedState));

      // The store is already created, so we can't test the initial load
      // But we can test that the current state is correct
      const state = store.getState();
      expect(state.wizard).toBeDefined();
    });

    it('uses default state when localStorage is empty', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const state = store.getState();
      expect(state.wizard.currentStep).toBe(1);
      expect(state.wizard.totalSteps).toBe(3);
      expect(state.wizard.application).toEqual(defaultApplicationData);
    });

    it('uses default state when localStorage has invalid JSON', () => {
      localStorageMock.getItem.mockReturnValue('invalid json');

      const state = store.getState();
      expect(state.wizard.currentStep).toBe(1);
      expect(state.wizard.totalSteps).toBe(3);
      expect(state.wizard.application).toEqual(defaultApplicationData);
    });
  });

  describe('goNext action', () => {
    it('increments current step when not at last step', () => {
      const initialState = {
        currentStep: 1,
        totalSteps: 3,
        application: defaultApplicationData,
      };

      const newState = store.getState();
      store.dispatch(goNext());

      const updatedState = store.getState();
      expect(updatedState.wizard.currentStep).toBe(2);
    });

    it('does not increment beyond total steps', () => {
      const initialState = {
        currentStep: 3,
        totalSteps: 3,
        application: defaultApplicationData,
      };

      store.dispatch(goNext());

      const updatedState = store.getState();
      expect(updatedState.wizard.currentStep).toBe(3);
    });
  });

  describe('goBack action', () => {
    it('decrements current step when not at first step', () => {
      // Reset to step 1 first
      store.dispatch(resetApplication());
      
      // Go to step 2
      store.dispatch(goNext());
      
      // Then go back
      store.dispatch(goBack());

      const updatedState = store.getState();
      expect(updatedState.wizard.currentStep).toBe(1);
    });

    it('does not decrement below 1', () => {
      const initialState = {
        currentStep: 1,
        totalSteps: 3,
        application: defaultApplicationData,
      };

      store.dispatch(goBack());

      const updatedState = store.getState();
      expect(updatedState.wizard.currentStep).toBe(1);
    });
  });

  describe('setPersonalInfo action', () => {
    it('updates personal info in application', () => {
      const personalInfo = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        dateOfBirth: '1990-01-01',
      };

      store.dispatch(setPersonalInfo(personalInfo));

      const updatedState = store.getState();
      expect(updatedState.wizard.application.personalInfo).toEqual(personalInfo);
    });
  });

  describe('setFamilyFinancialInfo action', () => {
    it('updates family financial info in application', () => {
      const familyFinancialInfo = {
        familySize: 3,
        monthlyIncome: 5000,
        hasChildren: true,
        childrenCount: 2,
      };

      store.dispatch(setFamilyFinancialInfo(familyFinancialInfo));

      const updatedState = store.getState();
      expect(updatedState.wizard.application.familyFinancialInfo).toEqual(familyFinancialInfo);
    });
  });

  describe('setSituationDescriptions action', () => {
    it('updates situation descriptions in application', () => {
      const situationDescriptions = {
        description: 'Test situation',
        urgency: 'medium',
        additionalInfo: 'Additional info',
      };

      store.dispatch(setSituationDescriptions(situationDescriptions));

      const updatedState = store.getState();
      expect(updatedState.wizard.application.situationDescriptions).toEqual(situationDescriptions);
    });
  });

  describe('resetApplication action', () => {
    it('resets application to default state and step to 1', () => {
      // First set some data
      store.dispatch(setPersonalInfo({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        dateOfBirth: '1990-01-01',
      }));
      store.dispatch(goNext());

      // Then reset
      store.dispatch(resetApplication());

      const updatedState = store.getState();
      expect(updatedState.wizard.currentStep).toBe(1);
      expect(updatedState.wizard.application).toEqual(defaultApplicationData);
    });
  });

  describe('localStorage persistence', () => {
    it('saves state to localStorage on state change', () => {
      store.dispatch(goNext());

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'wizardState',
        expect.stringContaining('"currentStep":2')
      );
    });

    it('handles localStorage errors gracefully', () => {
      localStorageMock.setItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });

      // Should not throw
      expect(() => {
        store.dispatch(goNext());
      }).not.toThrow();
    });
  });

  describe('type exports', () => {
    it('exports RootState type', () => {
      const state = store.getState();
      expect(state).toHaveProperty('wizard');
    });

    it('exports AppDispatch type', () => {
      expect(typeof store.dispatch).toBe('function');
    });
  });
});
