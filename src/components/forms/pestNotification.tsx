'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from '@/hooks/use-toast'
import Image from 'next/image'

export default function PestNotification() {
  const [nome, setNome] = useState('')
  const [palavrasChave, setPalavrasChave] = useState('')
  const [oQueE, setOQueE] = useState('')
  const [hospedeiros, setHospedeiros] = useState('')
  const [danos, setDanos] = useState('')
  const [medidasControle, setMedidasControle] = useState('')
  const [referencia, setReferencia] = useState('')
  const [foto, setFoto] = useState<File | null>(null)
  const [fotoPreview, setFotoPreview] = useState<string | null>(null)
  
  const { toast} = useToast()

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setFoto(file)
      setFotoPreview(URL.createObjectURL(file))
    }
  }
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    
    if (!nome || !palavrasChave || !oQueE || !hospedeiros || !danos || !medidasControle || !referencia) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      })
      return
    }

   

    // Aqui você pode adicionar a lógica para enviar os dados do formulário
    console.log({ nome, palavrasChave, oQueE, hospedeiros, danos, medidasControle, referencia })
    
    toast({
      title: "Sucesso",
      description: "Publicação de praga enviada com sucesso!",
    })

    // Limpar o formulário após o envio
    setNome('')
    setPalavrasChave('')
    setOQueE('')
    setHospedeiros('')
    setDanos('')
    setMedidasControle('')
    setReferencia('')
    setFoto(null)
    setFotoPreview(null)
  }

  const TextareaWithCounter = ({ id, value, onChange, label, placeholder }: { id: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, label: string, placeholder: string }) => (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Textarea 
        id={id}
        value={value}
        onChange={(e) => onChange(e)}
        placeholder={placeholder}
        maxLength={500}
        className="min-h-[100px]"
        required
      />
      <p className="text-sm text-muted-foreground">
        {value.length}/500 caracteres
      </p>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Publicação de praga</h2>
      
      <div className="space-y-2">
        <Label htmlFor="nome">Nome popular e científico</Label>
        <Input 
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite o nome popular e científico da praga"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="palavrasChave">Palavras-chave</Label>
        <Input 
          id="palavrasChave"
          value={palavrasChave}
          onChange={(e) => setPalavrasChave(e.target.value)}
          placeholder="Digite as palavras-chave separadas por vírgula"
          required
        />
      </div>

      <TextareaWithCounter
        id="oQueE"
        value={oQueE}
        onChange={(e) => setOQueE(e.target.value.slice(0, 500))}
        label="O que é"
        placeholder="Descreva o que é a praga em até 500 caracteres"
      />

      <TextareaWithCounter
        id="hospedeiros"
        value={hospedeiros}
        onChange={(e) => setHospedeiros(e.target.value.slice(0, 500))}
        label="Hospedeiros"
        placeholder="Descreva os hospedeiros da praga em até 500 caracteres"
      />

      <TextareaWithCounter
        id="danos"
        value={danos}
        onChange={(e) => setDanos(e.target.value.slice(0, 500))}
        label="Danos"
        placeholder="Descreva os danos causados pela praga em até 500 caracteres"
      />

      <TextareaWithCounter
        id="medidasControle"
        value={medidasControle}
        onChange={(e) => setMedidasControle(e.target.value.slice(0, 500))}
        label="Medidas de controle"
        placeholder="Descreva as medidas de controle para a praga em até 500 caracteres"
      />

      <TextareaWithCounter
        id="referencia"
        value={referencia}
        onChange={(e) => setReferencia(e.target.value.slice(0, 500))}
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

      <Button type="submit" className="w-full">Publicar praga</Button>
    </form>
  )
}