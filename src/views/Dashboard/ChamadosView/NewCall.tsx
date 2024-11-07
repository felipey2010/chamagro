import TechnicalCallForm from '@/components/forms/TechnicalCallForm'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Plus } from 'lucide-react'

function NewCall() {
  return (
    <div className="flex justify-between items-center">
      <Sheet>
        <SheetTrigger asChild>
          <Button type="button">
            <Plus className="mr-2 h-4 w-4" /> Novo Chamado
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full sm:w-[540px] flex flex-col">
          <SheetHeader>
            <SheetTitle>Formulário de Chamado</SheetTitle>
            <SheetDescription className="italic text-muted-foreground">
              Preencha os detalhes da sua nova solicitação aqui.
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="flex-grow -mx-6 px-2">
            <div className="px-4">
              <TechnicalCallForm />
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default NewCall
