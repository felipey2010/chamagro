# CHAMAGRO

ChamAgro foi desenvolvido no hackathon da EXPOFERR

## Índice

1. [Características](#caracteristicas)
2. [Tecnologia](#tecnologia)
3. [Instalação](#instalação)
4. [Configuração](#configuração)
5. [Contribuição](#contribuição)

## Características

1. **Autenticação**

   - Sistema de autenticação

## Tecnologia

- Next.js - Usado para o frontend, fornecendo uma interface de usuário rápida e amigável ao SEO.
- Next Auth - Gerencia autenticação por meio de vários provedores, como e-mail/senha.
- React Query - Gerencia a busca de dados e o gerenciamento de estado, proporcionando uma experiência de usuário tranquila.
- React Hook Form, Zod, and Yup - Para validação de formulários contínua e confiável.
- Shadcn UI Components - Garante uma interface de usuário consistente e acessível.
- Tailwind CSS - Para estilo e design responsivo.
- Framer Motion - Adiciona animações e transições suaves para melhorar a experiência do usuário.
- Lucide React Icons - Fornece uma biblioteca de ícones para melhorar a estética e a usabilidade do aplicativo.
- Date-fns - Lida com manipulação de data, essencial para recursos de calendário e agendamento.

### Instalação

- Clonar o repositório
- Instalar dependências: `npm install`
- Configurar variáveis ​​de ambiente criando um arquivo `.env` no diretório raiz com as chaves necessárias, como credenciais de banco de dados e chaves de autenticação.
- Incluir .env em seu .gitignore
- Construir o projeto: `npm run build`
- Iniciar o servidor: `npm start` ou `npm run dev`

É executado em localhost:3000 por padrão, mas pode ser configurado usando a variável de ambiente `PORT`.

## Configuração

Crie um arquivo `.env` no diretório raiz com as seguintes variáveis ​​de ambiente:

## Contribuição

Se você quiser contribuir para o desenvolvimento deste projeto, siga estas etapas:

1. Bifurque este repositório.
2. Crie uma ramificação para seu recurso ou correção de bug (git checkout -b feature/feature-name).
3. Confirme suas alterações (git commit -am 'Add a new feature').
4. Envie para a ramificação (git push origin feature/feature-name).
5. Crie uma nova solicitação de pull.
