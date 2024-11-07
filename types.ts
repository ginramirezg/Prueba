import type { ObjectId,} from "mongodb";

//Definir el tipo en Visual
export type monumentos = {
    id: string,
    nombre: string, 
    descripcion: string, 
    cp: number,
    ciudad: string,
    pais: string

};

//Definir el tipo en Mongo
export type monumentosModel = {
    _id: ObjectId,
    nombre: string,
    descripcion: string,
    cp: number,
    ciudad: string,
    pais: string

};

