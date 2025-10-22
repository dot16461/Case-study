import { useRef } from "react";

export function useFocusManagement() {
  const stepRef = useRef<HTMLDivElement>(null);

  const focusFirstElement = () => {
    if (stepRef.current) {
      const focusableElements = stepRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      if (firstElement) {
        firstElement.focus();
      }
    }
  };

  const focusElement = (selector: string) => {
    if (stepRef.current) {
      const element = stepRef.current.querySelector(selector) as HTMLElement;
      if (element) {
        element.focus();
      }
    }
  };

  return {
    stepRef,
    focusFirstElement,
    focusElement,
  };
}
