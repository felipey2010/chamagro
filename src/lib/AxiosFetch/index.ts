import axios, { AxiosHeaders, AxiosRequestConfig } from 'axios'
import { getDefaultHeaders } from './getDefaultHeaders'

const defaultErrorMessage = 'Houve um erro de comunicação com o servidor'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 50000,
})

export default async function axiosFetch(axiosConfig: AxiosRequestConfig) {
  const defaultHeaders = await getDefaultHeaders()

  // if (typeof window !== 'undefined') {
  //   const clientToken = await getClientSessionToken()
  //   if (clientToken) {
  //     defaultHeaders['Authorization'] = `Bearer ${decrypt(clientToken)}`
  //   }
  // }

  axiosConfig.headers = new AxiosHeaders({
    ...defaultHeaders,
    ...axiosConfig.headers,
  })

  axiosConfig.url = axiosConfig.url?.startsWith('/')
    ? axiosConfig.url
    : `/${axiosConfig.url}`

  return api({ ...axiosConfig })
    .then((response) => {
      return response.data
    })
    .catch((error) => {
      return formatServerErrorResponse(error)
    })
}

const handleAxiosErrors = (error: any) => {
  const { response } = error

  if (response) {
    const { status, data } = response

    switch (status) {
      case 404:
        return { message: 'Rota não encontrada', success: false, error }
      case 500:
        return { message: 'Erro interno do servidor', success: false, error }
      default:
        return {
          message: data.message || defaultErrorMessage,
          success: false,
          error,
        }
    }
  } else {
    return {
      message: 'Tempo de resposta do servidor expirou',
      success: false,
      error,
    }
  }
}

async function formatServerErrorResponse(error: any) {
  if (error.name === 'AxiosError') {
    return handleAxiosErrors(error)
  }

  if (error.message.includes('timeout')) {
    return {
      message: 'Tempo de resposta do servidor expirou',
      success: false,
      error,
    }
  }

  return {
    message: defaultErrorMessage,
    success: false,
    error,
  }
}
