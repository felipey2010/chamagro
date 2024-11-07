import { AiOutlineLoading } from 'react-icons/ai'

const DEFAULT_TEXT = 'Carregando página...'

function GenericLoader({ text }: { text?: string }) {
  return (
    <div className="w-full mt-6 flex flex-col items-center gap-5 text-foreground/60">
      <div>
        <AiOutlineLoading className="h-12 w-12 animate-spin" />
      </div>
      <p className="text-sm">{text || DEFAULT_TEXT}</p>
    </div>
  )
}

export default GenericLoader
