export interface LoginFormProps  {
  data: {
    identifier: string
    password: string
  }
  onSuccess: Function
  onError: Function
}
  