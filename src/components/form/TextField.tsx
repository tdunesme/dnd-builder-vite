import { Field, FieldDescription, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'

type TextFieldProps = {
  field: {
    name: string
    state: {
      value: string
      meta: {
        errors?: Array<string | undefined>
      }
    }
    handleChange: (value: string) => void
    handleBlur: () => void
  }
  label: string
  type?: string
}

export function TextField({ field, label, type = 'text' }: TextFieldProps) {
  return (
    <Field>
      <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

      <Input
        id={field.name}
        type={type}
        value={field.state.value}
        onChange={e => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      />

      {field.state.meta.errors?.length ? (
        <FieldDescription className="text-destructive">
          {field.state.meta.errors[0]}
        </FieldDescription>
      ) : null}
    </Field>
  )
}
