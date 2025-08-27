import { Visitante } from "./Visitante";

export interface Filmoteca {
  idFilmoteca?: number;
  sugestao: string;
  visitante: Visitante;
}