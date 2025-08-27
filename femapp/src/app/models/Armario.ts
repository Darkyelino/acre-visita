import { Visitante } from "./Visitante";

export interface Armario {
  idArmario?: number;
  numeracao: number;
  visitante: Visitante | null;
}