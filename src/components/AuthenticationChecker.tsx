import GenericLoader from './GenericLoader'

function AuthenticationChecker() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <GenericLoader text="Solicitando autorização ao departamento de segurança... por favor, seja paciente." />
    </div>
  )
}

export default AuthenticationChecker
