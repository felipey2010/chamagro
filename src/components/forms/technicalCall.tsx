'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Anexo {
  arquivo: File | null;
  descricao: string;
}


export default function TechnicalCall(){
  const [descricao, setDescricao] = React.useState('')
  const [localizacao, setLocalizacao] = React.useState('')
  const [central, setCentral] = React.useState('')
  const [outrosInteressados, setOutrosInteressados] = React.useState('')

  const [anexos, setAnexos] = React.useState<Anexo[]>([
    { arquivo: null, descricao: '' },
    { arquivo: null, descricao: '' },
    { arquivo: null, descricao: '' }
  ]);

  const handleFileChange = (index: number, file: File | null) => {
    const novosAnexos = [...anexos];
    novosAnexos[index].arquivo = file;
    setAnexos(novosAnexos);
  };

  const handleDescricaoChange = (index: number, descricao: string) => {
    const novosAnexos = [...anexos];
    novosAnexos[index].descricao = descricao;
    setAnexos(novosAnexos);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Aqui você pode adicionar a lógica para enviar os dados do formulário
    console.log({ descricao, localizacao, central, outrosInteressados, anexos })
  }
  return(
    <section>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Formulário de Chamado</h2>
      
      <div className="space-y-2">
        <Label htmlFor="descricao">Descrição do chamado</Label>
        <Textarea 
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descreva o chamado em até 500 caracteres"
          maxLength={500}
          className="min-h-[100px]"
        />
        <p className="text-sm text-muted-foreground">
          {descricao.length}/500 caracteres
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="localizacao">Localização</Label>
        <Input 
          id="localizacao"
          value={localizacao}
          onChange={(e) => setLocalizacao(e.target.value)}
          placeholder="Informe o endereço"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="central">Central de atendimento</Label>
        <Select value={central} onValueChange={setCentral}>
          <SelectTrigger id="central">
            <SelectValue placeholder="Selecione a central" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="iate">Iate</SelectItem>
            <SelectItem value="aderr">ADERR</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="outrosInteressados">Outros interessados</Label>
        <Input 
          id="outrosInteressados"
          value={outrosInteressados}
          onChange={(e) => setOutrosInteressados(e.target.value)}
          placeholder="Informe outros interessados"
        />
      </div>

      <div>
      <h2 className="text-2xl font-bold mb-6">Anexar Arquivos</h2>
      
      {anexos.map((anexo, index) => (
        <div key={index} className="space-y-4 p-4 border border-gray-200 rounded-md">
          <div className="space-y-2">
            <Label htmlFor={`arquivo-${index}`}>Arquivo {index + 1}</Label>
            <Input 
              id={`arquivo-${index}`}
              type="file"
              onChange={(e) => handleFileChange(index, e.target.files ? e.target.files[0] : null)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`descricao-${index}`}>Descrição do arquivo {index + 1}</Label>
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

      <Button type="submit" className="w-full">Enviar Chamado</Button>
    </form>
    </section>
    

  )
}