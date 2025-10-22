import { TextField } from '@mui/material'
import { Controller, Control, FieldValues, Path } from 'react-hook-form'

type Props<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  label: string
  type?: string
}

export function FormTextField<T extends FieldValues>({ control, name, label, type = 'text' }: Props<T>) {
  const errorId = `${name}-error`
  const helperId = `${name}-helper`
  const inputId = `${name}-input`
  
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          id={inputId}
          label={label}
          type={type}
          fullWidth
          margin="normal"
          error={!!fieldState.error}
          helperText={fieldState.error?.message}
          slotProps={{
            ...(type === 'date' ? { inputLabel: { shrink: true } } : {}),
            formHelperText: {
              id: fieldState.error ? errorId : helperId,
              role: fieldState.error ? 'alert' : undefined,
            },
            input: {
              'aria-invalid': !!fieldState.error,
              'aria-describedby': fieldState.error ? errorId : helperId,
            }
          }}
        />
      )}
    />
  )
}


