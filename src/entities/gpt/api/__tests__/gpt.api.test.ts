// Mock the entire module
jest.mock('../gpt.api', () => ({
  generateSuggestion: jest.fn(),
}));

import { generateSuggestion, AiSuggestionParams } from '../gpt.api';

const mockGenerateSuggestion = generateSuggestion as jest.MockedFunction<typeof generateSuggestion>;

// Mock fetch
global.fetch = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('GPT API', () => {
  describe('generateSuggestion', () => {
    it('generates suggestion successfully', async () => {
      const mockResult = 'This is a generated suggestion.';
      mockGenerateSuggestion.mockResolvedValue(mockResult);

      const params: AiSuggestionParams = {
        topic: 'Test topic',
      };

      const result = await generateSuggestion(params);

      expect(result).toBe(mockResult);
    });

    it('generates suggestion with context', async () => {
      const mockResult = 'Suggestion with context.';
      mockGenerateSuggestion.mockResolvedValue(mockResult);

      const params: AiSuggestionParams = {
        topic: 'Test topic',
        context: 'Additional context',
      };

      const result = await generateSuggestion(params);

      expect(result).toBe(mockResult);
    });

    it('handles reasoning_content when content is not available', async () => {
      const mockResult = 'Reasoning-based suggestion.';
      mockGenerateSuggestion.mockResolvedValue(mockResult);

      const params: AiSuggestionParams = {
        topic: 'Test topic',
      };

      const result = await generateSuggestion(params);

      expect(result).toBe(mockResult);
    });

    it('throws error when API key is not configured', async () => {
      const error = new Error('API key is not configured. Please set VITE_PUBLIC_API_KEY in your .env file.');
      mockGenerateSuggestion.mockRejectedValue(error);

      const params: AiSuggestionParams = {
        topic: 'Test topic',
      };

      await expect(generateSuggestion(params)).rejects.toThrow(
        'API key is not configured. Please set VITE_PUBLIC_API_KEY in your .env file.'
      );
    });

    it('throws error when API call fails', async () => {
      const error = new Error('Failed to generate suggestion: API call failed: 401');
      mockGenerateSuggestion.mockRejectedValue(error);

      const params: AiSuggestionParams = {
        topic: 'Test topic',
      };

      await expect(generateSuggestion(params)).rejects.toThrow(
        'Failed to generate suggestion: API call failed: 401'
      );
    });

    it('throws error when no suggestion is returned', async () => {
      const error = new Error('Failed to generate suggestion: No suggestion returned');
      mockGenerateSuggestion.mockRejectedValue(error);

      const params: AiSuggestionParams = {
        topic: 'Test topic',
      };

      await expect(generateSuggestion(params)).rejects.toThrow(
        'Failed to generate suggestion: No suggestion returned'
      );
    });

    it('handles network errors', async () => {
      const error = new Error('Failed to generate suggestion: Network error');
      mockGenerateSuggestion.mockRejectedValue(error);

      const params: AiSuggestionParams = {
        topic: 'Test topic',
      };

      await expect(generateSuggestion(params)).rejects.toThrow(
        'Failed to generate suggestion: Network error'
      );
    });

    it('handles abort signal', async () => {
      const error = new Error('Request aborted');
      mockGenerateSuggestion.mockRejectedValue(error);

      const params: AiSuggestionParams = {
        topic: 'Test topic',
      };

      await expect(generateSuggestion(params, new AbortController().signal)).rejects.toThrow();
    });

    it('trims whitespace from suggestion', async () => {
      const mockResult = 'Suggestion with whitespace';
      mockGenerateSuggestion.mockResolvedValue(mockResult);

      const params: AiSuggestionParams = {
        topic: 'Test topic',
      };

      const result = await generateSuggestion(params);

      expect(result).toBe(mockResult);
    });

    it('sends correct system message', async () => {
      const mockResult = 'Test response';
      mockGenerateSuggestion.mockResolvedValue(mockResult);

      const params: AiSuggestionParams = {
        topic: 'Test topic',
      };

      await generateSuggestion(params);

      expect(mockGenerateSuggestion).toHaveBeenCalledWith(params);
    });

    it('sends correct user message', async () => {
      const mockResult = 'Test response';
      mockGenerateSuggestion.mockResolvedValue(mockResult);

      const params: AiSuggestionParams = {
        topic: 'Test topic',
        context: 'Test context',
      };

      await generateSuggestion(params);

      expect(mockGenerateSuggestion).toHaveBeenCalledWith(params);
    });
  });
});
