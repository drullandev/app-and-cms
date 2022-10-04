import React from 'react'
import { FormProps } from './interfaces/FormProps'
import Form from '../forms/Form'

const FormSet: React.FC<FormProps> = ({ slug }) =>
  <Form slug={slug} />

export default React.memo(FormSet)