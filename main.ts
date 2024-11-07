import {MongoClient, ObjectId} from "mongodb";
import { fromModeltoMonument } from "./utils.ts";
import { monumentosModel } from "./types.ts";

//Obtener las claves de Mongo
const MONGO_URL = Deno.env.get("MONGO_URL");
if(!MONGO_URL){
  console.error("MONGO_URL not set");
  Deno.exit(1);
}

//Conectar el cliente con Mongo
const client = new MongoClient(MONGO_URL);
await client.connect();
console.info("Conectado a MongoDB")

const db = client.db("prueba");
const monumentosCollection = db.collection("monumentos");

const handler = async(req:Request): Promise<Response> => {
  //Todos los endpoints tienen: metodo, url y pathname
  const method = req.method;
  const url = new URL (req.url);
  const path = url.pathname;

  if(method === "GET"){
    if(path === "/monumentos"){
      //api/monumentos
      const monumentsDB = await monumentosCollection.find().toArray();
      const monuments = monumentsDB.map((m) => fromModeltoMonument(m));

      const monumentsFilter = monuments.map((m)=> {
        id: m.id;
        nombre: m.nombre;
      });
    
      return new Response (JSON.stringify(monumentsFilter)); 
      
    }
    else if(path === "/monumento"){
      //api/monumentos/id
      const id = url.searchParams.get("id");

      //Si no hay id
      if(!id){
        return new Response("Bad request", {status: 404});
      }

      //Buscamos el monumento por id en Mongo
      const monumentDB = await monumentosCollection.findOne({_id: new ObjectId(id)});

      //Si no se encuentra dicho id, mostramos por pantalla el error
      if(!monumentDB){
        return new Response ("Monument not found", {status: 404});
      }

      //En caso de encontrar el monumento en Mongo, lo transformamos para verlo en VS
      const monument = fromModeltoMonument(monumentDB);

      //Imprimimos los datos del monumento 
      return new Response(JSON.stringify(monument));

    }
  }
  else if(method === "POST"){

  }
  else if(method === "PUT"){

  }
  else if(method === "DELETE"){

  }

  return new Response("Endpoint no definido", {status: 404});


}

Deno.serve({port:3000}, handler);