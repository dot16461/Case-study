import {
  createPersonalInfoSchema,
  createFamilyFinancialSchema,
  createSituationDescriptionsSchema,
  personalInfoSchema,
  familyFinancialSchema,
  situationDescriptionsSchema,
} from '../validationSchemas';

// Mock translation function
const mockT = (key: string, options?: any) => {
  const translations: Record<string, string> = {
    'errors.minLength': `Minimum ${options?.min || 0} characters required`,
    'errors.required': 'This field is required',
    'errors.email': 'Invalid email format',
    'errors.number': 'Must be a valid number',
  };
  return translations[key] || key;
};

describe('Validation Schemas', () => {
  describe('Personal Info Schema', () => {
    const schema = createPersonalInfoSchema(mockT);

    it('validates correct personal info data', () => {
      const validData = {
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
      };

      const result = schema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('fails validation for invalid email', () => {
      const invalidData = {
        name: 'John Doe',
        nationalId: '123456789',
        dateOfBirth: '1990-01-01',
        gender: 'male',
        address: '123 Main St',
        city: 'Test City',
        state: 'Test State',
        country: 'Test Country',
        phone: '+1234567890',
        email: 'invalid-email',
      };

      const result = schema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Invalid email format');
      }
    });

    it('fails validation for short name', () => {
      const invalidData = {
        name: 'J',
        nationalId: '123456789',
        dateOfBirth: '1990-01-01',
        gender: 'male',
        address: '123 Main St',
        city: 'Test City',
        state: 'Test State',
        country: 'Test Country',
        phone: '+1234567890',
        email: 'john@example.com',
      };

      const result = schema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Minimum 2 characters required');
      }
    });

    it('fails validation for missing required fields', () => {
      const invalidData = {
        name: 'John Doe',
        // Missing other required fields
      };

      const result = schema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('Family Financial Schema', () => {
    const schema = createFamilyFinancialSchema(mockT);

    it('validates correct family financial data', () => {
      const validData = {
        maritalStatus: 'single',
        dependents: 0,
        employmentStatus: 'employed',
        monthlyIncome: 3000,
        housingStatus: 'renting',
      };

      const result = schema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('coerces string numbers to numbers', () => {
      const dataWithStringNumbers = {
        maritalStatus: 'single',
        dependents: '2',
        employmentStatus: 'employed',
        monthlyIncome: '2500',
        housingStatus: 'renting',
      };

      const result = schema.safeParse(dataWithStringNumbers);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(typeof result.data.dependents).toBe('number');
        expect(typeof result.data.monthlyIncome).toBe('number');
      }
    });

    it('fails validation for negative dependents', () => {
      const invalidData = {
        maritalStatus: 'single',
        dependents: -1,
        employmentStatus: 'employed',
        monthlyIncome: 3000,
        housingStatus: 'renting',
      };

      const result = schema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('fails validation for missing required fields', () => {
      const invalidData = {
        maritalStatus: 'single',
        dependents: 0,
        // Missing other required fields
      };

      const result = schema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('Situation Descriptions Schema', () => {
    const schema = createSituationDescriptionsSchema(mockT);

    it('validates correct situation descriptions', () => {
      const validData = {
        currentFinancialSituation: 'I am currently unemployed and struggling financially.',
        employmentCircumstances: 'I lost my job due to company downsizing.',
        reasonForApplying: 'I need financial assistance to cover basic living expenses.',
      };

      const result = schema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('fails validation for short descriptions', () => {
      const invalidData = {
        currentFinancialSituation: 'Short text',
        employmentCircumstances: 'Short text',
        reasonForApplying: 'Short text',
      };

      const result = schema.safeParse(invalidData);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Minimum 20 characters required');
      }
    });

    it('fails validation for empty descriptions', () => {
      const invalidData = {
        currentFinancialSituation: '',
        employmentCircumstances: '',
        reasonForApplying: '',
      };

      const result = schema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('Fallback Schemas', () => {
    it('personalInfoSchema validates without translation function', () => {
      const validData = {
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
      };

      const result = personalInfoSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('familyFinancialSchema validates without translation function', () => {
      const validData = {
        maritalStatus: 'single',
        dependents: 0,
        employmentStatus: 'employed',
        monthlyIncome: 3000,
        housingStatus: 'renting',
      };

      const result = familyFinancialSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('situationDescriptionsSchema validates without translation function', () => {
      const validData = {
        currentFinancialSituation: 'I am currently unemployed and struggling financially.',
        employmentCircumstances: 'I lost my job due to company downsizing.',
        reasonForApplying: 'I need financial assistance to cover basic living expenses.',
      };

      const result = situationDescriptionsSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });
});
