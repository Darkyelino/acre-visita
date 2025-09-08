import { Setor } from "./Setor";
import { Usuario } from "./Usuario";

export interface Filmoteca {
  idFilmoteca?: number;
  sugestao: string;
  setor: Setor;
  usuario: Usuario;
}