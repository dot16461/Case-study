import {
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { generateSuggestion } from "@entities/gpt";
import { toast } from "react-toastify";

type Props = {
  label: string;
  placeholder: string;
  onResult: (text: string) => void;
  onStartGenerating?: (isGenerating: boolean) => void;
  disabled?: boolean;
};

export function HelpMeWriteButton({ label, placeholder, onResult, onStartGenerating, disabled }: Props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [userPrompt, setUserPrompt] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLElement | null>(null);
  const lastFocusableRef = useRef<HTMLElement | null>(null);

  function handleClick() {
    setOpen(true);
  }

  async function handleGenerate() {
    const controller = new AbortController();
    setLoading(true);
    onStartGenerating?.(true);
    try {
      const text = await generateSuggestion(
        { topic: userPrompt },
        controller.signal
      );
      onResult(text);
    } catch (e) {
      const errorMessage = typeof e === "object" && e && "message" in e
        ? (e as Error).message
        : "AI request failed";
      toast.error(errorMessage);
      onStartGenerating?.(false);
    } finally {
      setLoading(false);
      setOpen(false);
      setUserPrompt("");
    }
  }

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

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setOpen(false);
      setUserPrompt("");
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
    }
  }, [open]);

  return (
    <>
      <Button
        onClick={handleClick}
        variant="outlined"
        disabled={loading || disabled}
        startIcon={loading ? <CircularProgress size={16} aria-label="Loading" /> : undefined}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={loading ? `${label ?? t("helpMeWrite")} - ${t("loading")}` : label ?? t("helpMeWrite")}
      >
        {label ?? t("helpMeWrite")}
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-modal="true"
        onKeyDown={handleKeyDown}
        ref={dialogRef}
        onKeyDownCapture={handleTabKey}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{t("helpMeWrite")}</DialogTitle>
        <div aria-live="polite" aria-atomic="true" style={{ position: 'absolute', left: '-10000px', width: '1px', height: '1px', overflow: 'hidden' }}>
          {loading && t("generating")}
        </div>
        <DialogContent>
          <TextField
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            fullWidth
            multiline
            rows={10}
            placeholder={placeholder}
            id="help-me-write-textarea"
            aria-label={t("enterPrompt")}
            autoFocus
            slotProps={{
              input: {
                id: "help-me-write-textarea-hidden",
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
          <Button
            onClick={() => {
              setOpen(false);
              setUserPrompt("");
            }}
          >
            {t("discard")}
          </Button>
          <Button
            onClick={handleGenerate}
            disabled={!userPrompt.trim() || loading}
            variant="contained"
            aria-label={loading ? `${t("accept")} - ${t("loading")}` : t("accept")}
          >
            {loading ? <CircularProgress size={16} aria-label="Loading" /> : t("accept")}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
