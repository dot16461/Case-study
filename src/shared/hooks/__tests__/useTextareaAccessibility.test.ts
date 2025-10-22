import { renderHook } from '@testing-library/react';
import { useTextareaAccessibility } from '../useTextareaAccessibility';

describe('useTextareaAccessibility', () => {
  let containerRef: React.RefObject<HTMLDivElement>;
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    containerRef = { current: container };
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
  });

  it('adds IDs to hidden textareas immediately', () => {
    const hiddenTextarea = document.createElement('textarea');
    hiddenTextarea.setAttribute('aria-hidden', 'true');
    container.appendChild(hiddenTextarea);

    renderHook(() => useTextareaAccessibility(containerRef, 'test-prefix'));

    expect(hiddenTextarea.id).toBe('test-prefix-hidden-textarea-0');
  });

  it('adds IDs to multiple hidden textareas', () => {
    const textarea1 = document.createElement('textarea');
    textarea1.setAttribute('aria-hidden', 'true');
    const textarea2 = document.createElement('textarea');
    textarea2.setAttribute('aria-hidden', 'true');
    
    container.appendChild(textarea1);
    container.appendChild(textarea2);

    renderHook(() => useTextareaAccessibility(containerRef, 'test-prefix'));

    expect(textarea1.id).toBe('test-prefix-hidden-textarea-0');
    expect(textarea2.id).toBe('test-prefix-hidden-textarea-1');
  });

  it('does not override existing IDs', () => {
    const hiddenTextarea = document.createElement('textarea');
    hiddenTextarea.setAttribute('aria-hidden', 'true');
    hiddenTextarea.id = 'existing-id';
    container.appendChild(hiddenTextarea);

    renderHook(() => useTextareaAccessibility(containerRef, 'test-prefix'));

    expect(hiddenTextarea.id).toBe('existing-id');
  });

  it('ignores textareas without aria-hidden="true"', () => {
    const visibleTextarea = document.createElement('textarea');
    container.appendChild(visibleTextarea);

    renderHook(() => useTextareaAccessibility(containerRef, 'test-prefix'));

    expect(visibleTextarea.id).toBe('');
  });

  it('handles dynamically added textareas', () => {
    renderHook(() => useTextareaAccessibility(containerRef, 'test-prefix'));

    const hiddenTextarea = document.createElement('textarea');
    hiddenTextarea.setAttribute('aria-hidden', 'true');
    container.appendChild(hiddenTextarea);

    setTimeout(() => {
      expect(hiddenTextarea.id).toBe('test-prefix-hidden-textarea-0');
    }, 150);
  });

  it('handles nested textareas in added elements', () => {
    renderHook(() => useTextareaAccessibility(containerRef, 'test-prefix'));

    const wrapper = document.createElement('div');
    const hiddenTextarea = document.createElement('textarea');
    hiddenTextarea.setAttribute('aria-hidden', 'true');
    wrapper.appendChild(hiddenTextarea);
    container.appendChild(wrapper);

    setTimeout(() => {
      expect(hiddenTextarea.id).toMatch(/test-prefix-hidden-textarea-/);
    }, 150);
  });

  it('cleans up observer on unmount', () => {
    const { unmount } = renderHook(() => useTextareaAccessibility(containerRef, 'test-prefix'));

    unmount();

    const hiddenTextarea = document.createElement('textarea');
    hiddenTextarea.setAttribute('aria-hidden', 'true');
    container.appendChild(hiddenTextarea);

    setTimeout(() => {
      expect(hiddenTextarea.id).toBe('');
    }, 150);
  });

  it('handles null container ref gracefully', () => {
    const nullRef = { current: null };
    
    expect(() => {
      renderHook(() => useTextareaAccessibility(nullRef, 'test-prefix'));
    }).not.toThrow();
  });

  it('uses timestamp for unique IDs when needed', () => {
    const hiddenTextarea = document.createElement('textarea');
    hiddenTextarea.setAttribute('aria-hidden', 'true');
    container.appendChild(hiddenTextarea);

    renderHook(() => useTextareaAccessibility(containerRef, 'test-prefix'));

    expect(hiddenTextarea.id).toMatch(/test-prefix-hidden-textarea-/);
  });
});
