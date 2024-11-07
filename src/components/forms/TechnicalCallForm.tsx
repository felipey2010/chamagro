'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { CallSchema, callSchema } from '@/schemas/call.schema'
import { CallFormValues } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { SheetFooter } from '../ui/sheet'

interface Anexo {
  arquivo: File | null
  descricao: string
}

export default function TechnicalCallForm() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<CallFormValues>({
    resolver: zodResolver(callSchema),
    defaultValues: {
      descricao: '',
      localizacao: '',
      central: '',
      outrosInteressados: '',
    },
  })

  // const { fields, append } = useFieldArray({
  //   control,
  //   name: 'anexos',
  // })

  const [anexos, setAnexos] = useState<Anexo[]>([
    { arquivo: null, descricao: '' },
    { arquivo: null, descricao: '' },
    { arquivo: null, descricao: '' },
  ])

  const handleFileChange = (index: number, file: File | null) => {
    const novosAnexos = [...anexos]
    novosAnexos[index].arquivo = file
    setAnexos(novosAnexos)
  }

  const handleDescricaoChange = (index: number, descricao: string) => {
    const novosAnexos = [...anexos]
    novosAnexos[index].descricao = descricao
    setAnexos(novosAnexos)
  }

  const onSubmit = (data: CallSchema) => {
    console.log(data)
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full space-y-4 mx-auto"
      >
        <div className="space-y-2">
          <div className="w-full flex items-center justify-between">
            <Label htmlFor="descricao">Descrição do chamado</Label>
            <p className="text-sm text-muted-foreground">
              {watch('descricao').length}/500 caracteres
            </p>
          </div>
          <Textarea
            id="descricao"
            {...register('descricao')}
            placeholder="Descreva o chamado em até 500 caracteres"
            maxLength={500}
            className="min-h-[100px]"
          />

          <p className="text-sm text-muted-foreground">
            {errors.descricao ? (
              <span className="text-red-500">{errors.descricao.message}</span>
            ) : null}
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="localizacao">Localização</Label>
          <Input
            id="localizacao"
            {...register('localizacao')}
            placeholder="Informe o endereço"
          />
          <p className="text-sm text-red-500">{errors.localizacao?.message}</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="central">Central de atendimento</Label>
          <Controller
            name="central"
            control={control}
            render={({ field }) => (
              <Select {...field} onValueChange={field.onChange}>
                <SelectTrigger id="central">
                  <SelectValue placeholder="Selecione a central" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="iate">IATERR</SelectItem>
                  <SelectItem value="aderr">ADERR</SelectItem>
                  <SelectItem value="aderr">Outros técnicos</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <p className="text-sm text-red-500">{errors.central?.message}</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="outrosInteressados">Outros interessados</Label>
          <Input
            id="outrosInteressados"
            {...register('outrosInteressados')}
            placeholder="Informe outros interessados"
          />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Anexar Arquivos</h2>

          {anexos.map((anexo, index) => (
            <div
              key={index}
              className="space-y-4 p-4 border border-gray-200 rounded-md"
            >
              <div className="space-y-2">
                <Label htmlFor={`arquivo-${index}`}>Arquivo {index + 1}</Label>
                <Input
                  id={`arquivo-${index}`}
                  type="file"
                  onChange={(e) =>
                    handleFileChange(
                      index,
                      e.target.files ? e.target.files[0] : null
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`descricao-${index}`}>
                  Descrição do arquivo {index + 1}
                </Label>
                <Input
                  id={`descricao-${index}`}
                  value={anexo.descricao}
                  onChange={(e) => handleDescricaoChange(index, e.target.value)}
                  placeholder="Descreva o arquivo anexado"
                />
              </div>
            </div>
          ))}
        </div>

        <SheetFooter>
          <Button type="submit" className="w-full">
            Enviar Chamado
          </Button>
        </SheetFooter>
      </form>
    </div>
  )
}
