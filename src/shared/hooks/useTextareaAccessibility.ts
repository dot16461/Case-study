import { useEffect, useRef } from "react";

export function useTextareaAccessibility(
  containerRef: React.RefObject<HTMLElement>,
  prefix: string
) {
  useEffect(() => {
    if (!containerRef.current) return;

    const addIdsToHiddenTextareas = () => {
      const hiddenTextareas = containerRef.current?.querySelectorAll(
        'textarea[aria-hidden="true"]'
      );
      hiddenTextareas?.forEach((textarea, index) => {
        if (!textarea.id) {
          textarea.id = `${prefix}-hidden-textarea-${index}`;
        }
      });
    };

    // Add IDs immediately
    addIdsToHiddenTextareas();

    // Also add IDs after a short delay to catch dynamically created elements
    const timeoutId = setTimeout(addIdsToHiddenTextareas, 100);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const element = node as Element;
              if (
                element.tagName === "TEXTAREA" &&
                element.getAttribute("aria-hidden") === "true"
              ) {
                if (!element.id) {
                  element.id = `${prefix}-hidden-textarea-${Date.now()}`;
                }
              }

              const textareas = element.querySelectorAll?.(
                'textarea[aria-hidden="true"]'
              );
              textareas?.forEach((textarea, index) => {
                if (!textarea.id) {
                  textarea.id = `${prefix}-hidden-textarea-${Date.now()}-${index}`;
                }
              });
            }
          });
        }
      });
      
      // Re-run the function after mutations
      addIdsToHiddenTextareas();
    });

    observer.observe(containerRef.current, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [containerRef, prefix]);
}
