import { TextField } from "@mui/material";
import { Controller, Control } from "react-hook-form";
import { useTextareaAccessibility } from "@shared/hooks";
import { useRef } from "react";

type Props = {
  control: Control<any>;
  name: string;
  label: string;
  rows?: number;
};

export function FormTextarea({ control, name, label, rows = 6 }: Props) {
  const errorId = `${name}-error`;
  const helperId = `${name}-helper`;
  const inputId = `${name}-input`;
  const containerRef = useRef<HTMLDivElement>(null);

  useTextareaAccessibility(containerRef, inputId);

  return (
    <div ref={containerRef}>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            id={inputId}
            label={label}
            fullWidth
            margin="normal"
            multiline
            rows={rows}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            slotProps={{
              formHelperText: {
                id: fieldState.error ? errorId : helperId,
                role: fieldState.error ? "alert" : undefined,
              },
              input: {
                "aria-invalid": !!fieldState.error,
                "aria-describedby": fieldState.error ? errorId : helperId,
              },
            }}
          />
        )}
      />
    </div>
  );
}
