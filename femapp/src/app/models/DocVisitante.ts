import { Usuario } from "./Usuario";

export interface DocVisitante {
  idDocumento?: number;
  tipo: string | null;
  numero: string | null;
  usuario: Usuario;
}