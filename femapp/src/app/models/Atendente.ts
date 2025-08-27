import { Setor } from "./Setor";

export interface Atendente {
  idAtendente?: number;
  nomeAtendente: string;
  emailAtendente: string;
  senhaAtendente: string;
  atendenteSetorResponsavel: Setor;
}