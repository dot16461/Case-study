import { 
  PersonalInfo, 
  FamilyFinancialInfo, 
  SituationDescriptions, 
  ApplicationData, 
  defaultApplicationData 
} from '../application.types';

describe('Application Types', () => {
  describe('PersonalInfo interface', () => {
    it('has all required fields', () => {
      const personalInfo: PersonalInfo = {
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

      expect(personalInfo.name).toBe('John Doe');
      expect(personalInfo.nationalId).toBe('123456789');
      expect(personalInfo.dateOfBirth).toBe('1990-01-01');
      expect(personalInfo.gender).toBe('male');
      expect(personalInfo.address).toBe('123 Main St');
      expect(personalInfo.city).toBe('Test City');
      expect(personalInfo.state).toBe('Test State');
      expect(personalInfo.country).toBe('Test Country');
      expect(personalInfo.phone).toBe('+1234567890');
      expect(personalInfo.email).toBe('john@example.com');
    });
  });

  describe('FamilyFinancialInfo interface', () => {
    it('has all required fields', () => {
      const familyFinancialInfo: FamilyFinancialInfo = {
        maritalStatus: 'single',
        dependents: 2,
        employmentStatus: 'employed',
        monthlyIncome: 3000,
        housingStatus: 'renting',
      };

      expect(familyFinancialInfo.maritalStatus).toBe('single');
      expect(familyFinancialInfo.dependents).toBe(2);
      expect(familyFinancialInfo.employmentStatus).toBe('employed');
      expect(familyFinancialInfo.monthlyIncome).toBe(3000);
      expect(familyFinancialInfo.housingStatus).toBe('renting');
    });
  });

  describe('SituationDescriptions interface', () => {
    it('has all required fields', () => {
      const situationDescriptions: SituationDescriptions = {
        currentFinancialSituation: 'Currently unemployed and struggling financially.',
        employmentCircumstances: 'Lost job due to company downsizing.',
        reasonForApplying: 'Need financial assistance to cover basic living expenses.',
      };

      expect(situationDescriptions.currentFinancialSituation).toBe('Currently unemployed and struggling financially.');
      expect(situationDescriptions.employmentCircumstances).toBe('Lost job due to company downsizing.');
      expect(situationDescriptions.reasonForApplying).toBe('Need financial assistance to cover basic living expenses.');
    });
  });

  describe('ApplicationData interface', () => {
    it('combines all data types correctly', () => {
      const applicationData: ApplicationData = {
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
        familyFinancialInfo: {
          maritalStatus: 'single',
          dependents: 2,
          employmentStatus: 'employed',
          monthlyIncome: 3000,
          housingStatus: 'renting',
        },
        situationDescriptions: {
          currentFinancialSituation: 'Currently unemployed and struggling financially.',
          employmentCircumstances: 'Lost job due to company downsizing.',
          reasonForApplying: 'Need financial assistance to cover basic living expenses.',
        },
      };

      expect(applicationData.personalInfo).toBeDefined();
      expect(applicationData.familyFinancialInfo).toBeDefined();
      expect(applicationData.situationDescriptions).toBeDefined();
      expect(applicationData.personalInfo.name).toBe('John Doe');
      expect(applicationData.familyFinancialInfo.dependents).toBe(2);
      expect(applicationData.situationDescriptions.currentFinancialSituation).toBe('Currently unemployed and struggling financially.');
    });
  });

  describe('defaultApplicationData', () => {
    it('has empty string values for text fields', () => {
      expect(defaultApplicationData.personalInfo.name).toBe('');
      expect(defaultApplicationData.personalInfo.nationalId).toBe('');
      expect(defaultApplicationData.personalInfo.dateOfBirth).toBe('');
      expect(defaultApplicationData.personalInfo.gender).toBe('');
      expect(defaultApplicationData.personalInfo.address).toBe('');
      expect(defaultApplicationData.personalInfo.city).toBe('');
      expect(defaultApplicationData.personalInfo.state).toBe('');
      expect(defaultApplicationData.personalInfo.country).toBe('');
      expect(defaultApplicationData.personalInfo.phone).toBe('');
      expect(defaultApplicationData.personalInfo.email).toBe('');
    });

    it('has zero values for numeric fields', () => {
      expect(defaultApplicationData.familyFinancialInfo.dependents).toBe(0);
      expect(defaultApplicationData.familyFinancialInfo.monthlyIncome).toBe(0);
    });

    it('has empty string values for family financial text fields', () => {
      expect(defaultApplicationData.familyFinancialInfo.maritalStatus).toBe('');
      expect(defaultApplicationData.familyFinancialInfo.employmentStatus).toBe('');
      expect(defaultApplicationData.familyFinancialInfo.housingStatus).toBe('');
    });

    it('has empty string values for situation descriptions', () => {
      expect(defaultApplicationData.situationDescriptions.currentFinancialSituation).toBe('');
      expect(defaultApplicationData.situationDescriptions.employmentCircumstances).toBe('');
      expect(defaultApplicationData.situationDescriptions.reasonForApplying).toBe('');
    });

    it('is a valid ApplicationData object', () => {
      expect(defaultApplicationData).toHaveProperty('personalInfo');
      expect(defaultApplicationData).toHaveProperty('familyFinancialInfo');
      expect(defaultApplicationData).toHaveProperty('situationDescriptions');
      
      expect(typeof defaultApplicationData.personalInfo).toBe('object');
      expect(typeof defaultApplicationData.familyFinancialInfo).toBe('object');
      expect(typeof defaultApplicationData.situationDescriptions).toBe('object');
    });
  });

  describe('Type compatibility', () => {
    it('allows assignment of compatible objects', () => {
      const personalInfo: PersonalInfo = {
        name: 'Jane Doe',
        nationalId: '987654321',
        dateOfBirth: '1985-05-15',
        gender: 'female',
        address: '456 Oak Ave',
        city: 'Another City',
        state: 'Another State',
        country: 'Another Country',
        phone: '+9876543210',
        email: 'jane@example.com',
      };

      const applicationData: ApplicationData = {
        personalInfo,
        familyFinancialInfo: defaultApplicationData.familyFinancialInfo,
        situationDescriptions: defaultApplicationData.situationDescriptions,
      };

      expect(applicationData.personalInfo.name).toBe('Jane Doe');
    });

    it('enforces type safety for numeric fields', () => {
      const familyFinancialInfo: FamilyFinancialInfo = {
        maritalStatus: 'married',
        dependents: 3,
        employmentStatus: 'unemployed',
        monthlyIncome: 0,
        housingStatus: 'owning',
      };

      expect(typeof familyFinancialInfo.dependents).toBe('number');
      expect(typeof familyFinancialInfo.monthlyIncome).toBe('number');
    });
  });
});
