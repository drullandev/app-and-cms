export interface FieldNew {
  label: string
  onChange?: any
}

export interface FormNewProps {
  fields: FieldNew[],
  onSubmit:any
  //action: string,
  //onSubmit: SubmitHandler<FieldValues>
}