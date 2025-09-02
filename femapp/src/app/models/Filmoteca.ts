import { Usuario } from "./Usuario";

export interface Filmoteca {
  idFilmoteca?: number;
  sugestao: string;
  usuario: Usuario;
}