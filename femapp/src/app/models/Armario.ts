import { Setor } from "./Setor";
import { Visitante } from "./Visitante";

export interface Armario {
  idArmario?: number;
  numeracao: number;
  visitante: Visitante | null;
  setor: Setor;
}