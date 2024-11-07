'use client'
import {useState} from 'react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from '@/hooks/use-toast'


function DisclosureItems() {
    const [nomeLoja, setNomeLoja] = useState('')
    const [nomePesticida, setNomePesticida] = useState('')
    const [descricao, setDescricao] = useState('')
    const [valor, setValor] = useState('')
    const [telefone, setTelefone] = useState('')
    const { toast} = useToast()
  
    const formatarMoeda = (valor: string) => {
      const numero = valor.replace(/\D/g, '')
      const valorFormatado = (Number(numero) / 100).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      })
      return valorFormatado
    }
  
    const formatarTelefone = (telefone: string) => {
      const numero = telefone.replace(/\D/g, '')
      if (numero.length <= 11) {
        return numero
          .replace(/(\d{2})(\d)/, '($1) $2')
          .replace(/(\d{4,5})(\d{4})$/, '$1-$2')
      }
      return telefone.slice(0, 15)
    }
  
    const handleValorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const valorFormatado = formatarMoeda(e.target.value)
      setValor(valorFormatado)
    }
  
    const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const telefoneFormatado = formatarTelefone(e.target.value)
      setTelefone(telefoneFormatado)
    }
  
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault()
      
      if (!nomeLoja || !nomePesticida || !descricao || !valor || !telefone) {
        toast({
          title: "Erro",
          description: "Por favor, preencha todos os campos.",
          variant: "destructive",
        })
        return
      }
  
      // Aqui você pode adicionar a lógica para enviar os dados do formulário
      console.log({ nomeLoja, nomePesticida, descricao, valor, telefone })
      
      toast({
        title: "Sucesso",
        description: "Dados do pesticida enviados com sucesso!",
      })
  
      // Limpar o formulário após o envio
      setNomeLoja('')
      setNomePesticida('')
      setDescricao('')
      setValor('')
      setTelefone('')
    }
  
    return (
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Cadastro de Pesticida Agropecuário</h2>
        
        <div className="space-y-2">
          <Label htmlFor="nomeLoja">Nome da Loja</Label>
          <Input 
            id="nomeLoja"
            value={nomeLoja}
            onChange={(e) => setNomeLoja(e.target.value)}
            placeholder="Digite o nome da loja"
            required
          />
        </div>
  
        <div className="space-y-2">
          <Label htmlFor="nomePesticida">Nome do Pesticida</Label>
          <Input 
            id="nomePesticida"
            value={nomePesticida}
            onChange={(e) => setNomePesticida(e.target.value)}
            placeholder="Digite o nome do pesticida"
            required
          />
        </div>
  
        <div className="space-y-2">
          <Label htmlFor="descricao">Descrição</Label>
          <Textarea 
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value.slice(0, 500))}
            placeholder="Descreva o pesticida em até 500 caracteres"
            maxLength={500}
            className="min-h-[100px]"
            required
          />
          <p className="text-sm text-muted-foreground">
            {descricao.length}/500 caracteres
          </p>
        </div>
  
        <div className="space-y-2">
          <Label htmlFor="valor">Valor</Label>
          <Input 
            id="valor"
            value={valor}
            onChange={handleValorChange}
            placeholder="R$ 0,00"
            required
          />
        </div>
  
        <div className="space-y-2">
          <Label htmlFor="telefone">Telefone/WhatsApp</Label>
          <Input 
            id="telefone"
            value={telefone}
            onChange={handleTelefoneChange}
            placeholder="(00) 00000-0000"
            required
          />
        </div>
  
        <Button type="submit" className="w-full">Cadastrar Pesticida</Button>
      </form>
    
  )
}

export default DisclosureItems