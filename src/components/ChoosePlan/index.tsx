import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'
import { plano_de_assinaturas } from './data/SubscriptionPlan'

function ChoosePlan() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
          Escolha Seu Plano
        </h2>
        <p className="text-muted-foreground text-center">
          Experimente um serviço ininterrupto com nossos planos de assinatura
        </p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {plano_de_assinaturas.map((plan, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle>{plan.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-4xl font-bold mb-4">{plan.price}</p>
                <ul className="space-y-2 mb-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className="p-6 pt-0">
                <Button className="w-full">Adquirir</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ChoosePlan
