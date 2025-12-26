import { formOptions, useForm } from '@tanstack/react-form'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { Link, useNavigate } from '@tanstack/react-router'
import { TextField } from '@/components/form/TextField'
import { FormActions } from '../form/FormActions'
import { signup } from '@/services/auth/auth.service'
import { useMutation } from '@tanstack/react-query'
import { Spinner } from '../ui/spinner'
import { setAccessToken } from '@/lib/auth/auth.storage'
import { toast } from 'sonner'

interface SignupFormValues {
  email: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
}

export function SignupForm() {
  const navigate = useNavigate()
  const signupMutation = useMutation({
    mutationFn: signup,
    onSuccess: data => {
      setAccessToken(data.accessToken)
      toast.success('Account created successfully', {
        description: 'You have been signed up and logged in.',
      })
      navigate({ to: '/' })
    },
    onError: error => {
      toast.error('Error while signing up', {
        description: error.message,
      })
    },
  })
  const defaultValues: SignupFormValues = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  }
  const formOpts = formOptions({
    defaultValues,
  })
  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      const { confirmPassword, ...signupPayload } = value
      signupMutation.mutate(signupPayload)
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
        {/* FIRST NAME */}
        <form.Field
          name="firstName"
          validators={{
            onChange: ({ value }) =>
              !value ? 'First name is required' : undefined,
          }}
        >
          {field => (
            <TextField field={field} label="First name" type="text" />
          )}
        </form.Field>

        {/* LAST NAME */}
        <form.Field
          name="lastName"
          validators={{
            onChange: ({ value }) =>
              !value ? 'Last name is required' : undefined,
          }}
        >
          {field => <TextField field={field} label="Last name" type="text" />}
        </form.Field>

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
            onBlur: ({ value }) => {
              if (!value) return 'Password is required'
              if (value.length < 8) {
                return 'Password must be at least 8 characters long'
              }
              return undefined
            },
          }}
        >
          {field => (
            <TextField field={field} label="Password" type="password" />
          )}
        </form.Field>

        {/* CONFIRM PASSWORD */}
        <form.Field
          name="confirmPassword"
          validators={{
            onChange: ({ value }, form) => {
              if (!value) return 'Please confirm your password'
              if (value !== form.state.values.password) {
                return 'Passwords do not match'
              }
              return undefined
            },
            onBlur: ({ value }, form) => {
              if (!value) return 'Please confirm your password'
              if (value !== form.state.values.password) {
                return 'Passwords do not match'
              }
              return undefined
            },
          }}
        >
          {field => (
            <TextField
              field={field}
              label="Confirm password"
              type="password"
            />
          )}
        </form.Field>

        {/* SUBMIT */}
        <FormActions>
          <Button
            className="w-full"
            type="submit"
            disabled={signupMutation.isPending}
          >
            {signupMutation.isPending ? (
              <Spinner className="size-4" />
            ) : (
              'Sign up'
            )}
          </Button>
          <div className="text-center">
            <span>Already have an account? </span>
            <Link className="link" to="/auth/login">
              Log in
            </Link>
          </div>
        </FormActions>
      </FieldGroup>
    </form>
  )
}

