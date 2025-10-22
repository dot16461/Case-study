import { FormControl, InputLabel, MenuItem, Select, FormHelperText } from '@mui/material'
import { Controller, Control } from 'react-hook-form'

type Option = { value: string | number; label: string }

type Props = {
  control: Control<any>
  name: string
  label: string
  options: Option[]
}

export function FormSelect({ control, name, label, options }: Props) {
  const id = `${name}-select`
  const errorId = `${name}-error`
  const helperId = `${name}-helper`
  
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormControl fullWidth margin="normal" error={!!fieldState.error}>
          <InputLabel id={id}>{label}</InputLabel>
          <Select 
            labelId={id} 
            label={label} 
            {...field}
            inputProps={{
              'aria-invalid': !!fieldState.error,
              'aria-describedby': fieldState.error ? errorId : helperId,
            }}
          >
            {options.map(o => (
              <MenuItem key={o.value} value={o.value}>
                {o.label}
              </MenuItem>
            ))}
          </Select>
          {fieldState.error && (
            <FormHelperText id={errorId} role="alert">
              {fieldState.error.message}
            </FormHelperText>
          )}
        </FormControl>
      )}
    />
  )
}


