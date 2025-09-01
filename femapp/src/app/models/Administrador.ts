import { Setor } from "./Setor";

export interface Administrador {
  idAdministrador: number;
  nomeAdministrador: string;
  emailAdministrador: string;
  senhaAdministrador: string;
  admSetorResponsavel: Setor;
}