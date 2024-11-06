'use server'

import { auth } from '@/auth'
import { ProfileSetupSchema } from '@/schemas/onbarding.schema'
import axiosFetch from '../AxiosFetch'

async function getSessionUser() {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error('Sessão inválida ou usuário não autenticado.')
  }

  return session.user
}

export async function createUserProfile(
  userData: ProfileSetupSchema
): Promise<{ success: boolean; data: any; message: string }> {
  const session = await getSessionUser()

  const userToSave = {
    ...userData,
    id: session.id,
    email: session.email,
    image: session.image || '',
    available_for_mentoring: userData.available_for_mentoring === 'true',
    auth_provider: session.provider.toUpperCase() || 'EMAIL',
  }

  try {
    const response = await axiosFetch({
      url: '/users',
      method: 'POST',
      data: userToSave,
    })

    if (!response.success) {
      throw new Error(response.message || 'Erro ao criar perfil de usuário.')
    }

    return response
  } catch (error: unknown) {
    throw new Error(
      error instanceof Error ? error.message : 'Erro ao criar perfil de usuário'
    )
  }
}

export async function getDatabaseUser(userEmail?: string) {
  const session = await getSessionUser()
  const email = userEmail || session.email

  try {
    return await axiosFetch({
      url: `/users/email/${email}`,
      method: 'GET',
    })
  } catch (error: unknown) {
    throw new Error(
      error instanceof Error ? error.message : 'Erro ao recuperar o usuário'
    )
  }
}

export async function getUserByEmail(email: string) {
  try {
    const response = await axiosFetch({
      url: `/auth/user/${email}`,
      method: 'GET',
    })

    if (!response.success) {
      throw new Error(response.message || 'Erro ao buscar o usuário.')
    }

    return response
  } catch (error: unknown) {
    throw new Error(
      error instanceof Error ? error.message : 'Erro ao buscar o usuário'
    )
  }
}

export async function updateUserPhoto(file: FormData) {
  const session = await getSessionUser()
  const userId = session.id

  try {
    const response = await axiosFetch({
      url: `/users/user/${userId}`,
      method: 'POST',
      data: file,
    })

    if (!response.success) {
      throw new Error(response.message || 'Erro ao atualizar foto do usuário.')
    }

    return response
  } catch (error: unknown) {
    throw new Error(
      error instanceof Error
        ? error.message
        : 'Erro ao atualizar foto do usuário'
    )
  }
}

export async function getUserById(userId?: string) {
  const session = await getSessionUser()
  const user_id = userId || session.id

  try {
    const response = await axiosFetch({
      url: `/users/${user_id}`,
      method: 'GET',
    })

    if (!response.success) {
      throw new Error((response.message as string) || 'Erro ao buscar usuário.')
    }

    return response
  } catch (error: unknown) {
    throw new Error(
      error instanceof Error ? error.message : 'Erro ao buscar usuário'
    )
  }
}

export async function searchUser(query: string, userId?: string) {
  const session = await auth()
  const user_id = userId || session?.user.id

  try {
    const response = await axiosFetch({
      url: `/users/search/${user_id}`,
      method: 'POST',
      data: { query },
    })

    if (!response.success) {
      throw new Error(response.message || 'Erro ao buscar usuário.')
    }

    return response
  } catch (error: unknown) {
    throw new Error(
      error instanceof Error ? error.message : 'Erro ao buscar usuário'
    )
  }
}
