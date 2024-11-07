'use server'

import { auth } from '@/auth'
import axiosFetch from '../AxiosFetch'

async function getSessionUser() {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error('Sessão inválida ou usuário não autenticado.')
  }

  return session.user
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
