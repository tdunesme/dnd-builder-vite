import { formOptions, useForm } from '@tanstack/react-form'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { Link, useNavigate } from '@tanstack/react-router'
import { TextField } from '@/components/form/TextField'
import { FormActions } from '../form/FormActions'
import { login } from '@/services/auth/auth.service'
import { useMutation } from '@tanstack/react-query'
import { Spinner } from '../ui/spinner'
import { setAccessToken } from '@/lib/auth/auth.storage'
import { toast } from 'sonner'

interface LoginFormValues {
  email: string
  password: string
}

export function LoginForm() {
  const navigate = useNavigate()
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: data => {
      setAccessToken(data.accessToken)
      toast.success('You have been logged in', {
        description: 'You have been logged in successfully.',
      })
      navigate({ to: '/' })
    },
    onError: error => {
      toast.error('Error while logging in', {
        description: error.message,
      })
    },
  })
  const defaultValues: LoginFormValues = { email: '', password: '' }
  const formOpts = formOptions({
    defaultValues,
  })
  const form = useForm({
    ...formOpts,
    onSubmit: async ({ value }) => {
      loginMutation.mutate(value)
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
          <Button
            className="w-full"
            type="submit"
            disabled={loginMutation.isPending}
          >
            {loginMutation.isPending ? <Spinner className="size-4" /> : 'Login'}
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
