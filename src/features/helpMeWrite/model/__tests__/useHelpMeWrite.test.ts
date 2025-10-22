import { renderHook, act } from '@testing-library/react';
import { useHelpMeWrite } from '../useHelpMeWrite';

// Mock dependencies
jest.mock('@entities/gpt', () => ({
  generateSuggestion: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  toast: {
    error: jest.fn(),
  },
}));

import { generateSuggestion } from '@entities/gpt';
import { toast } from 'react-toastify';

const mockGenerateSuggestion = generateSuggestion as jest.MockedFunction<typeof generateSuggestion>;
const mockToast = toast as jest.Mocked<typeof toast>;

describe('useHelpMeWrite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with correct default state', () => {
    const { result } = renderHook(() => useHelpMeWrite());
    
    expect(result.current).toEqual({
      loading: false,
      open: false,
      userPrompt: '',
      handleClick: expect.any(Function),
      handleGenerate: expect.any(Function),
      handleClose: expect.any(Function),
      setUserPrompt: expect.any(Function),
    });
  });

  it('opens dialog when handleClick is called', () => {
    const { result } = renderHook(() => useHelpMeWrite());
    
    act(() => {
      result.current.handleClick();
    });
    
    expect(result.current.open).toBe(true);
  });

  it('sets user prompt when setUserPrompt is called', () => {
    const { result } = renderHook(() => useHelpMeWrite());
    
    act(() => {
      result.current.setUserPrompt('Test prompt');
    });
    
    expect(result.current.userPrompt).toBe('Test prompt');
  });

  it('closes dialog and clears prompt when handleClose is called', () => {
    const { result } = renderHook(() => useHelpMeWrite());
    
    // First set some state
    act(() => {
      result.current.setUserPrompt('Test prompt');
      result.current.handleClick();
    });
    
    expect(result.current.open).toBe(true);
    expect(result.current.userPrompt).toBe('Test prompt');
    
    // Then close
    act(() => {
      result.current.handleClose();
    });
    
    expect(result.current.open).toBe(false);
    expect(result.current.userPrompt).toBe('');
  });

  it('handles successful generation', async () => {
    const mockResult = 'Generated text';
    mockGenerateSuggestion.mockResolvedValue(mockResult);
    
    const { result } = renderHook(() => useHelpMeWrite());
    const mockOnResult = jest.fn();
    
    // Set a prompt first
    act(() => {
      result.current.setUserPrompt('Test prompt');
    });
    
    await act(async () => {
      await result.current.handleGenerate(mockOnResult);
    });
    
    expect(mockGenerateSuggestion).toHaveBeenCalledWith(
      { topic: 'Test prompt' },
      expect.any(AbortSignal)
    );
    expect(mockOnResult).toHaveBeenCalledWith(mockResult);
    expect(result.current.loading).toBe(false);
    expect(result.current.open).toBe(false);
    expect(result.current.userPrompt).toBe('');
  });

  it('handles generation error', async () => {
    const errorMessage = 'API Error';
    mockGenerateSuggestion.mockRejectedValue(new Error(errorMessage));
    
    const { result } = renderHook(() => useHelpMeWrite());
    const mockOnResult = jest.fn();
    
    // Set a prompt first
    act(() => {
      result.current.setUserPrompt('Test prompt');
    });
    
    await act(async () => {
      await result.current.handleGenerate(mockOnResult);
    });
    
    expect(mockToast.error).toHaveBeenCalledWith(errorMessage);
    expect(mockOnResult).not.toHaveBeenCalled();
    expect(result.current.loading).toBe(false);
    expect(result.current.open).toBe(false);
    expect(result.current.userPrompt).toBe('');
  });

  it('handles generation error with unknown error type', async () => {
    mockGenerateSuggestion.mockRejectedValue('String error');
    
    const { result } = renderHook(() => useHelpMeWrite());
    const mockOnResult = jest.fn();
    
    // Set a prompt first
    act(() => {
      result.current.setUserPrompt('Test prompt');
    });
    
    await act(async () => {
      await result.current.handleGenerate(mockOnResult);
    });
    
    expect(mockToast.error).toHaveBeenCalledWith('AI request failed');
    expect(mockOnResult).not.toHaveBeenCalled();
    expect(result.current.loading).toBe(false);
    expect(result.current.open).toBe(false);
    expect(result.current.userPrompt).toBe('');
  });

  it('sets loading state during generation', async () => {
    let resolvePromise: (value: string) => void;
    const promise = new Promise<string>((resolve) => {
      resolvePromise = resolve;
    });
    mockGenerateSuggestion.mockReturnValue(promise);
    
    const { result } = renderHook(() => useHelpMeWrite());
    const mockOnResult = jest.fn();
    
    // Set a prompt first
    act(() => {
      result.current.setUserPrompt('Test prompt');
    });
    
    // Start generation
    act(() => {
      result.current.handleGenerate(mockOnResult);
    });
    
    // Check loading state
    expect(result.current.loading).toBe(true);
    
    // Complete generation
    await act(async () => {
      resolvePromise!('Generated text');
      await promise;
    });
    
    expect(result.current.loading).toBe(false);
  });

  it('creates abort controller for generation', async () => {
    const mockResult = 'Generated text';
    mockGenerateSuggestion.mockResolvedValue(mockResult);
    
    const { result } = renderHook(() => useHelpMeWrite());
    const mockOnResult = jest.fn();
    
    // Set a prompt first
    act(() => {
      result.current.setUserPrompt('Test prompt');
    });
    
    await act(async () => {
      await result.current.handleGenerate(mockOnResult);
    });
    
    expect(mockGenerateSuggestion).toHaveBeenCalledWith(
      { topic: 'Test prompt' },
      expect.any(AbortSignal)
    );
  });
});
