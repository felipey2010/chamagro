import Navbar from '@/components/Navbar'
import { Info, Pill, RefreshCcw, Rocket } from 'lucide-react'
import Image from 'next/image'

function HomePageView() {
  return (
    <div>
      <Navbar />
      <main>
        <div className="max-w-6xl m-auto flex justify-between border-inherit ">
          <section>
            <Image
              className="px-3"
              src="/assets/logo.svg"
              alt="logo ChamAgro"
              width={700}
              height={167}
            />
            <p className="w-700 mt-1 mb-2 text-lg text-center">
              {' '}
              <strong>Empresa</strong> resposável por fazer a{' '}
              <strong>ponte</strong> entre o <strong>Agricultor</strong> e as{' '}
              <strong>instituições</strong>{' '}
            </p>

            <a
              className="m-auto w-40 h-8  rounded-xl flex items-center justify-center text-white tracking-wide font-semibold bg-green-900"
              href="#"
            >
              SAIBA MAIS
            </a>
          </section>
          <section className="bg-slate-400 w-546 h-462 p-8 rounded-xl mb-28">
            <h2 className="text-lg text-center font-semibold mb-4">
              Torne sua fazenda mais segura
            </h2>

            <div className="flex gap-2 mb-8">
              <Rocket color={'#2E6732'} />
              <p className="text-sm">Obtenha infomações de forma mais rápida</p>
            </div>

            <div className="flex gap-2 mb-8">
              <RefreshCcw color={'#2E6732'} />
              <p className="text-sm">Obtenha atendimento técnico mais rápido</p>
            </div>

            <div className="flex gap-2 mb-8">
              <Info color={'#2E6732'} />
              <p className="text-sm">Informações sobre as pragas</p>
            </div>

            <div className="flex gap-2 mb-8">
              <Pill color={'#2E6732'} />
              <p className="text-sm">
                Facilidades de encontrar produtos contra pragas
              </p>
            </div>
          </section>
        </div>
      </main>

      <section className="bg-green-500">
        <div className="flex justify-between py-20 gap-6 max-w-6xl m-auto">
          <div>
            <Image
              src="/assets/atendimentoRapido.jpg"
              alt="Imagem retrata duas pessoas, onde uma é o produto que está em sua fazenda, recebendo a visita técnica"
              width={500}
              height={560}
            />
          </div>
          <div className="pt-16 ">
            <h2 className="mb-7 font-semibold text-3xl text-center">
              Obtenha atendimento mais rápido
            </h2>
            <div className="w-96 m-auto">
              <p className="w-96 text-lg ">
                Através do nosso sistema, o agricultor é notificado no momento
                em que o chamado é atualizado, sendo essa a forma mais rápida de
                saber o processo pelo qual está.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex justify-between py-20 gap-6 max-w-6xl m-auto">
          <div className="pt-16 ">
            <h2 className="mb-7 font-semibold text-3xl text-center">
              Obtenha atendimento mais rápido
            </h2>
            <div className="w-96 m-auto">
              <p className="w-96 text-lg ">
                Através do nosso sistema, o agricultor é notificado no momento
                em que o chamado é atualizado, sendo essa a forma mais rápida de
                saber o processo pelo qual está..
              </p>
            </div>
          </div>
          <div>
            <Image
              src="/assets/tempoReal.jpg"
              alt="Imagem retrata duas pessoas, onde uma é o produto que está em sua fazenda, recebendo a visita técnica"
              width={500}
              height={560}
            />
          </div>
        </div>
      </section>

      <section className="bg-green-500">
        <div className="flex justify-between py-20 gap-6 max-w-6xl m-auto">
          <div>
            <Image
              src="/assets/informacoesPragas.jpg"
              alt="Imagem retrata apenas as mãos do agriculto segurando o tablet"
              width={500}
              height={560}
            />
          </div>
          <div className="pt-16 ">
            <h2 className="mb-7 font-semibold text-3xl text-center">
              Informações sobre as pragas
            </h2>
            <div className="w-96 m-auto">
              <p className="w-96 text-lg ">
                No ChamaAgro, tem o histórico sobre as principais pragas
                quarentenárias e quais as formas de prevení-las.
              </p>
              <p className="w-96 text-lg ">
                Como também possuí os dados sobre os possíveis condições para a
                proliferação da praga no ambiente.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="flex justify-between py-20 gap-6 max-w-6xl m-auto">
          <div className="pt-16 ">
            <h2 className="mb-7 font-semibold text-3xl text-center">
              Facilidades de encontrar produtos
            </h2>
            <div className="w-96 m-auto">
              <p className="w-96 text-lg ">
                Dentro do ChamAgro também é possível encontrar os produtos
                disponíveis no mercado dentre as lojas mais próximas cadastradas
                no sistema..
              </p>
            </div>
          </div>
          <div>
            <Image
              src="/assets/encontrarProduto.jpg"
              alt="Imagem retrata apenas as mãos do agriculto segurando o tablet, e como imagem de fundo a plantação com máquinas acriculas trabalhando ao fundo"
              width={500}
              height={560}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePageView
