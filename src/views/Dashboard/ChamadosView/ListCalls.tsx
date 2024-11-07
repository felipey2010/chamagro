import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Pencil, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'

type ServiceRequest = {
  id: string
  service: string
  status: 'pending' | 'in-progress' | 'completed'
  description: string
  dateRequested: string
}

const initialServiceRequests: ServiceRequest[] = [
  {
    id: 'SR001',
    service: 'Network Setup',
    status: 'pending',
    description: 'Install new office network',
    dateRequested: '2023-11-01',
  },
  {
    id: 'SR002',
    service: 'Software Installation',
    status: 'in-progress',
    description: 'Install Adobe Creative Suite',
    dateRequested: '2023-11-03',
  },
  {
    id: 'SR003',
    service: 'Hardware Repair',
    status: 'completed',
    description: 'Fix laptop screen',
    dateRequested: '2023-10-28',
  },
  {
    id: 'SR004',
    service: 'Data Recovery',
    status: 'pending',
    description: 'Recover files from damaged hard drive',
    dateRequested: '2023-11-05',
  },
  {
    id: 'SR005',
    service: 'Security Audit',
    status: 'in-progress',
    description: 'Perform company-wide security assessment',
    dateRequested: '2023-11-02',
  },
]

const statusColors = {
  pending: 'bg-yellow-500',
  'in-progress': 'bg-blue-500',
  completed: 'bg-green-500',
}

function ListCalls() {
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>(
    initialServiceRequests
  )

  const [filter, setFilter] = useState('')
  const filteredRequests = serviceRequests.filter(
    (request) =>
      request.service.toLowerCase().includes(filter.toLowerCase()) ||
      request.description.toLowerCase().includes(filter.toLowerCase())
  )

  const stats = useMemo(() => {
    const total = serviceRequests.length
    const completed = serviceRequests.filter(
      (r) => r.status === 'completed'
    ).length
    const pending = serviceRequests.filter((r) => r.status === 'pending').length
    const inProgress = serviceRequests.filter(
      (r) => r.status === 'in-progress'
    ).length
    const completionRate =
      total > 0 ? ((completed / total) * 100).toFixed(1) : '0'
    return { total, completed, pending, inProgress, completionRate }
  }, [serviceRequests])

  const handleEdit = (id: string) => {
    // Placeholder for edit functionality
    console.log(`Editing request ${id}`)
  }

  const handleDelete = (id: string) => {
    setServiceRequests((prevRequests) =>
      prevRequests.filter((request) => request.id !== id)
    )
  }
  return (
    <div className="grid grid-cols-3 gap-4">
      <Card className="col-span-3 lg:col-span-2">
        <CardHeader>
          <div className="w-full flex flex-col gap-4">
            <Input
              placeholder="Filter services..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of your recent service requests</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead className="text-right">Data criado</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.id}</TableCell>
                  <TableCell>{request.service}</TableCell>
                  <TableCell>
                    <Badge
                      className={`${statusColors[request.status]} text-white`}
                    >
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{request.description}</TableCell>
                  <TableCell className="text-right">
                    {request.dateRequested}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEdit(request.id)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(request.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="col-span-3 lg:col-span-1">
        <CardHeader>
          <CardTitle>Stats</CardTitle>
          <CardDescription>Visão geral de suas solicitações</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium">Total de solicitações</h4>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Atendidos</h4>
              <p className="text-2xl font-bold">{stats.completed}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Pendente</h4>
              <p className="text-2xl font-bold">{stats.pending}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium">Em Andamento</h4>
              <p className="text-2xl font-bold">{stats.inProgress}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ListCalls
