import { formOptions, useForm } from '@tanstack/react-form'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { Link } from '@tanstack/react-router'
import { TextField } from '@/components/form/TextField'
import { FormActions } from '../form/FormActions'

interface LoginFormValues {
  email: string
  password: string
}

export function LoginForm() {
  const defaultValues: LoginFormValues = { email: '', password: '' }
  const formOpts = formOptions({
    defaultValues,
  })
  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      // Do something with form data
      console.log(value)
    },
  })

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        e.stopPropagation()
        form.handleSubmit()
      }}
    >
      <FieldGroup>
        {/* EMAIL */}
        <form.Field
          name="email"
          validators={{
            onChange: ({ value }) => (!value ? 'Email is required' : undefined),
            onBlur: ({ value }) => {
              const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
              return isValidEmail ? undefined : 'Invalid email address'
            },
          }}
        >
          {field => <TextField field={field} label="Email" type="email" />}
        </form.Field>

        {/* PASSWORD */}
        <form.Field
          name="password"
          validators={{
            onChange: ({ value }) =>
              !value ? 'Password is required' : undefined,
            onBlur: ({ value }) =>
              !value ? 'Password is required' : undefined,
          }}
        >
          {field => (
            <TextField field={field} label="Password" type="password" />
          )}
        </form.Field>

        {/* SUBMIT */}
        <FormActions>
          <Button className="w-full" type="submit">
            Login
          </Button>
          <div className="text-center">
            <span>Don&apos;t have an account? </span>
            <Link className="link" to="/auth/signup">
              Sign up
            </Link>
          </div>
        </FormActions>
      </FieldGroup>
    </form>
  )
}
