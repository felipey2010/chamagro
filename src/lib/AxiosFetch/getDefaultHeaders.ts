export const getDefaultHeaders = async (): Promise<any> => {
  //   let authToken: string | null | undefined = null

  return {
    'Content-Type': 'application/json',
    // Authorization: authToken ? `Bearer ${authToken}` : '',
  }
}
