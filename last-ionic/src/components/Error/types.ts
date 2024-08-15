import { FieldError } from "react-hook-form";
import { DeepMap } from "react-hook-form"; // Asegúrate de tener esta importación

export interface ErrorProps {
  name: string;
  label: string;
  errors?: DeepMap<Record<string, any>, FieldError>; // Cambiado de NestDataObject a DeepMap
}