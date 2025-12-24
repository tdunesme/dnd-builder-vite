import { FormActions } from '@/components/form/FormActions'
import { TextField } from '@/components/form/TextField'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FieldGroup } from '@/components/ui/field'
import { useForm } from '@tanstack/react-form'
import { useCreateCharacter } from '@/hooks/character/useCreateCharacter'

export function CharacterNameStep() {
  const createCharacterMutation = useCreateCharacter()

  const form = useForm({
    defaultValues: {
      name: '',
    },
    onSubmit: ({ value }) => {
      createCharacterMutation.mutate(value.name)
    },
  })
  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Character Name
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit}>
            <FieldGroup>
              <form.Field
                name="name"
                validators={{
                  onChange: ({ value }) =>
                    !value ? 'Name is required' : undefined,
                }}
              >
                {field => <TextField field={field} label="Name" />}
              </form.Field>
              <FormActions>
                <Button type="submit">Next</Button>
              </FormActions>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
