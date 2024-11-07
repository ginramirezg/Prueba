import{Collection} from "mongodb"; 
import {monumentos, monumentosModel} from "./types.ts";

export const fromModeltoMonument = (model: monumentosModel) =>({
    id: model._id!.toString(),
    nombre: model.nombre,
    descripcion: model.descripcion,
    cp: model.cp,
    ciudad: model.ciudad,
    pais: model.pais
});

