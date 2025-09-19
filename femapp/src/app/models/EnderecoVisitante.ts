import { Usuario } from "./Usuario";

export interface EnderecoVisitante {
  idEnderecoVisitante: number;
  cepVisitante: string;
  estadoVisitante: string;
  cidadeVisitante: string;
  bairroVisitante: string;
  ruaVisitante: string;
  numeroVisitante: string;
  usuario: Usuario
}