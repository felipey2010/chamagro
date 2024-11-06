'use server'

import {
  PasswordResetSchema,
  SignInSchema,
  SignUpSchema,
  VerificationCodeSchema,
} from '@/schemas/auth.schema'
import axiosFetch from '../AxiosFetch'

export async function verifyEmailExistence(userEmail: string) {
  try {
    const response = await axiosFetch({
      url: `/auth/check-credential/${userEmail}`,
      method: 'GET',
    })

    if (!response.success) {
      throw new Error(response.message || 'Erro ao verificar o email.')
    }

    return response
  } catch (error: unknown) {
    throw new Error(
      error instanceof Error ? error.message : 'Erro de verificação de email'
    )
  }
}

export async function checkVerificationCode(values: VerificationCodeSchema) {
  try {
    const response = await axiosFetch({
      url: '/auth/verify-token',
      method: 'POST',
      data: values,
    })

    if (!response.success) {
      throw new Error(response.message || 'Erro ao verificar o código.')
    }

    return response
  } catch (error: unknown) {
    throw new Error(
      error instanceof Error ? error.message : 'Erro de verificação de código'
    )
  }
}

export async function requestPasswordReset(email: string) {
  try {
    const response = await axiosFetch({
      url: `/auth/token/request-password-reset/${email}`,
      method: 'GET',
    })

    if (!response.success) {
      throw new Error(
        response.message || 'Erro ao solicitar redefinição de senha.'
      )
    }

    return response
  } catch (error: unknown) {
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Erro ao solicitar redefinição de senha'
    )
  }
}

export async function verifiyPasswordResetCode(values: VerificationCodeSchema) {
  try {
    const response = await axiosFetch({
      url: '/auth/verify-password-token',
      method: 'POST',
      data: values,
    })

    if (!response.success) {
      throw new Error(
        response.message ||
          'Erro ao verificar o código de redefinição de senha.'
      )
    }

    return response
  } catch (error: unknown) {
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Erro ao verificar o código de redefinição de senha'
    )
  }
}

export async function resetPassword(values: PasswordResetSchema) {
  try {
    const { confirmPassword, ...rest } = values
    if (confirmPassword !== values.password) {
      throw new Error('As senhas não correspondem')
    }

    const response = await axiosFetch({
      url: '/auth/account/reset-password',
      method: 'POST',
      data: { ...rest },
    })

    if (!response.success) {
      throw new Error(response.message || 'Erro ao redefinir a senha.')
    }

    return response
  } catch (error: unknown) {
    throw new Error(
      error instanceof Error ? error.message : 'Erro ao redefinir a senha'
    )
  }
}

export async function saveCredentials(userCredentials: SignUpSchema) {
  try {
    const { confirmPassword, ...userToSave } = userCredentials
    if (confirmPassword !== userCredentials.password) {
      throw new Error('As senhas não correspondem')
    }

    const response = await axiosFetch({
      url: '/auth',
      method: 'POST',
      data: userToSave,
    })

    if (!response.success) {
      throw new Error(response.message || 'Erro ao salvar dados do usuário..')
    }

    return response
  } catch (error: unknown) {
    throw new Error(
      error instanceof Error ? error.message : 'Erro ao salvar dados do usuário'
    )
  }
}

export async function loginUser(credentials: SignInSchema) {
  try {
    const response = await axiosFetch({
      url: '/auth/login',
      method: 'POST',
      data: credentials,
    })

    if (!response.success) {
      throw new Error(response.message || 'Erro ao salvar dados do usuário..')
    }

    return response
  } catch (error: unknown) {
    throw new Error(
      error instanceof Error ? error.message : 'Erro ao fazer login'
    )
  }
}
