import { renderHook, act } from '@testing-library/react';
import { useFocusManagement } from '../useFocusManagement';

describe('useFocusManagement', () => {
  it('returns stepRef and focus functions', () => {
    const { result } = renderHook(() => useFocusManagement());

    expect(result.current.stepRef).toBeDefined();
    expect(result.current.focusFirstElement).toBeInstanceOf(Function);
    expect(result.current.focusElement).toBeInstanceOf(Function);
  });

  it('focuses first focusable element when focusFirstElement is called', () => {
    const { result } = renderHook(() => useFocusManagement());
    
    // Create a mock DOM structure
    const mockDiv = document.createElement('div');
    const mockButton = document.createElement('button');
    const mockInput = document.createElement('input');
    
    mockButton.textContent = 'First Button';
    mockInput.type = 'text';
    
    mockDiv.appendChild(mockButton);
    mockDiv.appendChild(mockInput);
    document.body.appendChild(mockDiv);

    // Mock the ref to point to our mock div
    act(() => {
      (result.current.stepRef as any).current = mockDiv;
    });

    // Mock focus method
    const focusSpy = jest.spyOn(mockButton, 'focus');

    act(() => {
      result.current.focusFirstElement();
    });

    expect(focusSpy).toHaveBeenCalled();

    // Cleanup
    document.body.removeChild(mockDiv);
    focusSpy.mockRestore();
  });

  it('focuses specific element when focusElement is called with selector', () => {
    const { result } = renderHook(() => useFocusManagement());
    
    // Create a mock DOM structure
    const mockDiv = document.createElement('div');
    const mockButton = document.createElement('button');
    mockButton.id = 'test-button';
    mockButton.textContent = 'Test Button';
    
    mockDiv.appendChild(mockButton);
    document.body.appendChild(mockDiv);

    // Mock the ref to point to our mock div
    act(() => {
      (result.current.stepRef as any).current = mockDiv;
    });

    // Mock focus method
    const focusSpy = jest.spyOn(mockButton, 'focus');

    act(() => {
      result.current.focusElement('#test-button');
    });

    expect(focusSpy).toHaveBeenCalled();

    // Cleanup
    document.body.removeChild(mockDiv);
    focusSpy.mockRestore();
  });

  it('handles case when no focusable elements exist', () => {
    const { result } = renderHook(() => useFocusManagement());
    
    // Create a mock DOM structure with no focusable elements
    const mockDiv = document.createElement('div');
    const mockSpan = document.createElement('span');
    mockSpan.textContent = 'Not focusable';
    
    mockDiv.appendChild(mockSpan);
    document.body.appendChild(mockDiv);

    // Mock the ref to point to our mock div
    act(() => {
      (result.current.stepRef as any).current = mockDiv;
    });

    // Should not throw error
    expect(() => {
      act(() => {
        result.current.focusFirstElement();
      });
    }).not.toThrow();

    // Cleanup
    document.body.removeChild(mockDiv);
  });

  it('handles case when element selector is not found', () => {
    const { result } = renderHook(() => useFocusManagement());
    
    // Create a mock DOM structure
    const mockDiv = document.createElement('div');
    document.body.appendChild(mockDiv);

    // Mock the ref to point to our mock div
    act(() => {
      (result.current.stepRef as any).current = mockDiv;
    });

    // Should not throw error when element is not found
    expect(() => {
      act(() => {
        result.current.focusElement('#non-existent');
      });
    }).not.toThrow();

    // Cleanup
    document.body.removeChild(mockDiv);
  });

  it('handles case when stepRef is null', () => {
    const { result } = renderHook(() => useFocusManagement());

    // Should not throw error when ref is null
    expect(() => {
      act(() => {
        result.current.focusFirstElement();
      });
    }).not.toThrow();

    expect(() => {
      act(() => {
        result.current.focusElement('#test');
      });
    }).not.toThrow();
  });
});
