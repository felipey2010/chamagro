'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  PestNotificationSchema,
  pestNotificationSchema,
} from '@/schemas/pestNotification.schema'
import { PestNotificationType } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export default function PestNotification() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<PestNotificationType>({
    resolver: zodResolver(pestNotificationSchema),
    defaultValues: {
      name: '',
      tags: '',
      description: '',
      host: '',
      damages: '',
      prevention: '',
      reference: '',
    },
  })

  const [, /*foto*/ setFoto] = useState<File>()
  const [fotoPreview, setFotoPreview] = useState('')

  const onSubmit = (values: PestNotificationSchema) => {
    console.log(values)
  }

  const clearForm = () => {
    reset()
  }

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFoto(file)
      setFotoPreview(URL.createObjectURL(file))
    }
  }

  const TextareaWithCounter = ({
    id,
    name,
    label,
    placeholder,
  }: {
    id: string
    name: 'description' | 'host' | 'damages' | 'prevention' | 'reference'
    label: string
    placeholder: string
  }) => (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        id={id}
        {...register(name)}
        placeholder={placeholder}
        maxLength={500}
        className="min-h-[100px]"
        required
      />
      <p className="text-sm text-muted-foreground">
        {watch(name).length}/500 caracteres
      </p>
    </div>
  )

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6">Publicação de praga</h2>

      <div className="space-y-2">
        <Label htmlFor="nome">Nome popular e científico</Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="Digite o nome popular e científico da praga"
          required
        />
        <p className="text-sm text-muted-foreground">
          {errors.name ? (
            <span className="text-red-500">{errors.name.message}</span>
          ) : null}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Palavras-chave</Label>
        <Input
          id="tags"
          {...register('tags')}
          placeholder="Digite as palavras-chave separadas por vírgula"
          required
        />
      </div>

      <TextareaWithCounter
        id="description"
        name="description"
        label="Descrição"
        placeholder="Descreva o que é a praga em até 500 caracteres"
      />

      <TextareaWithCounter
        id="host"
        name="host"
        label="Hospedeiros"
        placeholder="Descreva os hospedeiros da praga em até 500 caracteres"
      />

      <TextareaWithCounter
        id="damages"
        name="damages"
        label="Danos"
        placeholder="Descreva os danos causados pela praga em até 500 caracteres"
      />

      <TextareaWithCounter
        id="prevention"
        name="prevention"
        label="Medidas de controle"
        placeholder="Descreva as medidas de controle para a praga em até 500 caracteres"
      />

      <TextareaWithCounter
        id="reference"
        name="reference"
        label="Referência"
        placeholder="Forneça as referências em até 500 caracteres"
      />

      <div className="space-y-2">
        <Label htmlFor="foto">Foto da praga</Label>
        <Input
          id="foto"
          type="file"
          onChange={handleFotoChange}
          accept="image/*"
          required
        />
        {fotoPreview && (
          <div className="mt-2">
            <Image
              src={fotoPreview}
              alt="Prévia da foto da praga"
              width={200}
              height={200}
              objectFit="cover"
            />
          </div>
        )}
      </div>

      <div className="w-full flex items-center justify-end gap-4">
        <Button type="button" onClick={clearForm}>
          Cancelar
        </Button>
        <Button type="submit">Publicar</Button>
      </div>
    </form>
  )
}
