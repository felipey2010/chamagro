'use client'

import SEO from '@/components/SEO'
import ListCalls from './ListCalls'
import NewCall from './NewCall'

function ChamadosView() {
  return (
    <>
      <SEO title="Chamadas" />
      <div className="w-full flex flex-col pt-1 px-2">
        <div className="w-full flex items-center justify-between gap-4">
          <h1 className="text-2xl font-bold">Chamados</h1>
          <NewCall />
        </div>
        <p className="text-muted-foreground mb-4">
          Acompanhe os chamados registrados
        </p>
        <div>
          <ListCalls />
        </div>
      </div>
    </>
  )
}

export default ChamadosView
