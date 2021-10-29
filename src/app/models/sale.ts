import { Concept } from "./concept";
import { Address } from './address';


export interface Sale {
    idUsuario: number;
    idCliente: number; //esta se quitara luego (pero la puse porque es requerida en el web service de api)
    direccion: Address;
    conceptos: Concept[]; //lista de tipo concepto
}