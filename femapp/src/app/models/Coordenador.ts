import { Setor } from "./Setor";

export interface Coordenador {
  idCoordenador?: number;
  nomeCoordenador: string;
  emailCoordenador: string;
  senhaCoordenador: string;
  coordSetorResponsavel: Setor;
}