import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  open: boolean;
  initialText: string;
  onClose: () => void;
  onAccept: (text: string) => void;
  loading?: boolean;
};

export function AiSuggestionDialog({
  open,
  initialText,
  onClose,
  onAccept,
  loading = false,
}: Props) {
  const { t } = useTranslation();
  const [text, setText] = useState(initialText);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLElement | null>(null);
  const lastFocusableRef = useRef<HTMLElement | null>(null);

  useEffect(() => setText(initialText), [initialText]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    if (open && dialogRef.current) {
      const focusableElements = dialogRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      firstFocusableRef.current = focusableElements[0] as HTMLElement;
      lastFocusableRef.current = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (firstFocusableRef.current) {
        firstFocusableRef.current.focus();
      }

      const hiddenTextareas = dialogRef.current.querySelectorAll(
        'textarea[aria-hidden="true"]'
      );
      hiddenTextareas.forEach((textarea, index) => {
        if (!textarea.id) {
          textarea.id = `ai-suggestion-hidden-textarea-${index}`;
        }
      });
    }
  }, [open]);

  const handleTabKey = (event: React.KeyboardEvent) => {
    if (event.key === "Tab") {
      if (event.shiftKey) {
        if (document.activeElement === firstFocusableRef.current) {
          event.preventDefault();
          lastFocusableRef.current?.focus();
        }
      } else {
        if (document.activeElement === lastFocusableRef.current) {
          event.preventDefault();
          firstFocusableRef.current?.focus();
        }
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-modal="true"
      onKeyDown={handleKeyDown}
      ref={dialogRef}
      onKeyDownCapture={handleTabKey}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>{t("aiSuggestionTitle")}</DialogTitle>
      <div aria-live="polite" aria-atomic="true" style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden' }}>
        {loading && t("loading")}
      </div>
      <DialogContent>
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
          multiline
          rows={12}
          autoFocus
          id="ai-suggestion-textarea"
          aria-label={t("aiSuggestionTitle")}
          slotProps={{
            input: {
              id: "ai-suggestion-textarea-hidden",
              sx: {
                '&:focus': {
                  outline: 'none',
                },
              },
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          {t("discard")}
        </Button>
        <Button 
          onClick={() => onAccept(text)} 
          variant="contained"
          disabled={loading}
          aria-label={loading ? `${t("accept")} - ${t("loading")}` : t("accept")}
        >
          {loading ? <CircularProgress size={16} aria-label="Loading" /> : t("accept")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
