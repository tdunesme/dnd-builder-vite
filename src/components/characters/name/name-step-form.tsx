import { FormActions } from '@/components/form/FormActions'
import { TextField } from '@/components/form/TextField'
import { Button } from '@/components/ui/button'
import { FieldGroup } from '@/components/ui/field'
import { router } from '@/router'
import type {
  Character,
  UpdateCharacterDto,
} from '@/services/character/character.service'
import type { UseMutationResult } from '@tanstack/react-query'
import { useForm } from '@tanstack/react-form'
import { toast } from 'sonner'

export function NameStepForm({
  character,
  updateCharacterMutation,
}: {
  character: Character
  updateCharacterMutation: UseMutationResult<
    Character,
    Error,
    UpdateCharacterDto
  >
}) {
  const form = useForm({
    defaultValues: {
      name: character.name,
    },
    onSubmit: async ({ value }) => {
      updateCharacterMutation.mutate(
        {
          ...character,
          name: value.name,
        },
        {
          onSuccess: character => {
            toast.success('Character updated successfully')
            router.navigate({
              to: '/builder/$characterId/class',
              params: { characterId: character.id },
            })
          },
          onError: () => {
            toast.error('Failed to update character')
          },
        }
      )
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
        <form.Field
          name="name"
          validators={{
            onChange: ({ value }) => (!value ? 'Name is required' : undefined),
          }}
        >
          {field => <TextField field={field} label="Name" />}
        </form.Field>
        <FormActions>
          <Button className="w-full" type="submit">
            Next
          </Button>
        </FormActions>
      </FieldGroup>
    </form>
  )
}
