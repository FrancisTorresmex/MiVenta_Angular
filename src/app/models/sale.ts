import { Concept } from "./concept";


export interface Sale {
    idUsuario: number;
    idCliente: number; //esta se quitara luego (pero la puse porque es requerida en el web service de api)
    conceptos: Concept[]; //lista de tipo concepto
}