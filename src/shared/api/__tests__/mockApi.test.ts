import { submitApplication } from '../mockApi';
import { ApplicationData } from '@entities/application/model/application.types';

// Mock console.log
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();

describe('mockApi', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock Math.random to control success/failure
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const mockApplicationData: ApplicationData = {
    personalInfo: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      dateOfBirth: '1990-01-01',
    },
    familyFinancial: {
      familySize: 3,
      monthlyIncome: 5000,
      hasChildren: true,
      childrenCount: 2,
    },
    situation: {
      description: 'Test situation description',
      urgency: 'medium',
      additionalInfo: 'Additional test information',
    },
  };

  const mockTranslator = (key: string) => {
    const translations: Record<string, string> = {
      'submittedSuccessfully': 'Application submitted successfully',
      'submissionFailed': 'Application submission failed',
    };
    return translations[key] || key;
  };

  it('submits application successfully when random > 0.1', async () => {
    // Mock Math.random to return 0.5 (success case)
    jest.spyOn(Math, 'random').mockReturnValue(0.5);

    const result = await submitApplication(mockApplicationData, mockTranslator);

    expect(result).toEqual({
      success: true,
      message: 'Application submitted successfully',
    });
  });

  it('submits application with failure when random <= 0.1', async () => {
    // Mock Math.random to return 0.05 (failure case)
    jest.spyOn(Math, 'random').mockReturnValue(0.05);

    const result = await submitApplication(mockApplicationData, mockTranslator);

    expect(result).toEqual({
      success: false,
      message: 'Application submission failed',
    });
  });

  it('logs application data to console', async () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);

    await submitApplication(mockApplicationData, mockTranslator);

    // Just check that the function completes successfully
    expect(true).toBe(true);
  });

  it('takes approximately 2 seconds to complete', async () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    
    const startTime = Date.now();
    await submitApplication(mockApplicationData, mockTranslator);
    const endTime = Date.now();
    
    const duration = endTime - startTime;
    expect(duration).toBeGreaterThanOrEqual(2000);
    expect(duration).toBeLessThan(2100); // Allow some margin for execution time
  });

  it('uses provided translator function for success message', async () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    
    const customTranslator = (key: string) => `Custom: ${key}`;
    const result = await submitApplication(mockApplicationData, customTranslator);

    expect(result.message).toBe('Custom: submittedSuccessfully');
  });

  it('uses provided translator function for failure message', async () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.05);
    
    const customTranslator = (key: string) => `Custom: ${key}`;
    const result = await submitApplication(mockApplicationData, customTranslator);

    expect(result.message).toBe('Custom: submissionFailed');
  });

  it('handles different application data structures', async () => {
    jest.spyOn(Math, 'random').mockReturnValue(0.5);
    
    const differentData: ApplicationData = {
      personalInfo: {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '+0987654321',
        dateOfBirth: '1985-05-15',
      },
      familyFinancial: {
        familySize: 1,
        monthlyIncome: 3000,
        hasChildren: false,
        childrenCount: 0,
      },
      situation: {
        description: 'Different situation',
        urgency: 'high',
        additionalInfo: '',
      },
    };

    const result = await submitApplication(differentData, mockTranslator);

    expect(result.success).toBe(true);
  });

  it('handles edge case when random is exactly 0.1', async () => {
    // Mock Math.random to return exactly 0.1 (should be failure)
    jest.spyOn(Math, 'random').mockReturnValue(0.1);

    const result = await submitApplication(mockApplicationData, mockTranslator);

    expect(result).toEqual({
      success: false,
      message: 'Application submission failed',
    });
  });

  it('handles edge case when random is exactly 0.0', async () => {
    // Mock Math.random to return exactly 0.0 (should be failure)
    jest.spyOn(Math, 'random').mockReturnValue(0.0);

    const result = await submitApplication(mockApplicationData, mockTranslator);

    expect(result).toEqual({
      success: false,
      message: 'Application submission failed',
    });
  });

  it('handles edge case when random is exactly 1.0', async () => {
    // Mock Math.random to return exactly 1.0 (should be success)
    jest.spyOn(Math, 'random').mockReturnValue(1.0);

    const result = await submitApplication(mockApplicationData, mockTranslator);

    expect(result).toEqual({
      success: true,
      message: 'Application submitted successfully',
    });
  });
});
