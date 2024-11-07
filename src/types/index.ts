export interface CallFormValues {
  descricao: string
  localizacao: string
  central: string
  outrosInteressados: string
  //   anexos: {
  //     arquivo: File |  undefined
  //     descricao: string
  //   }[]
}

export type PestNotificationType = {
  name: string
  tags: string
  description: string
  host: string
  damages: string
  prevention: string
  reference: string
}
