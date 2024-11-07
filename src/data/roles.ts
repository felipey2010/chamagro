export const UserRoles = [
  {
    title: 'Produtor',
    value: 'FARMER',
  },
  {
    title: 'Técnico',
    value: 'TECHNICIAN',
  },
  {
    title: 'Comerciante',
    value: 'MERCHANT',
  },
  {
    title: 'Produtor',
    value: 'FARMER',
  },
]

export const roleDescriptions = [
  {
    name: 'Produtor',
    description: ['solicitar visita técnica através de chamadas'],
  },
  {
    name: 'Técnico',
    description: ['atender demandas de produtores'],
  },
  {
    name: 'Comerciante',
    description: ['divulgar seus produtos fitosanitários'],
  },
  {
    name: 'Normal',
    description: ['acompanhar publicações de medidas preventivas'],
  },
]

export const AdminRoles = [
  ...UserRoles,
  {
    title: 'IATERR',
    value: 'IATERR',
  },
  {
    title: 'ADERR',
    value: 'ADERR',
  },
]
