import {Request,Response} from "express";
import {Nomenclador} from "../models/businnes/native/Nomenclador";
import {FactoryModel} from "../../utils/ModelFactory";
import {DatNomencladorModels} from "../models/businnes/orm/DatNomencladorModels";
export class NomencladoresController {
    private modelObjetc:Nomenclador|DatNomencladorModels
    constructor() {
        this.modelObjetc=new FactoryModel().getObjectModel();
    }
     getAll(_req:Request,_resp:Response){
       /*this.modelObjetc.getall(0,1).then(datos => {
          const listnomencladores:Array<ListNomenclador>=datos as Array<ListNomenclador>
          _resp.send(listnomencladores)
      })*/
         /*(async () => {
             let permlvl = await this.modelObjetc.getall()
             console.log(permlvl)
         })();*/
         /*let data=this.modelObjetc.getall(0,1);
         //let count=this.modelObjetc.getCount();
         let promise = Promise.all([
             data
         ]);
         promise.then(datos => {
             console.log(datos)
         })*/

      this.modelObjetc.getall(parseInt(_req.query.start as any) ,parseInt(_req.query.limit as any),_resp);

    }
   insertAccion(req:Request,_resp:Response){
      const {name,descripcion,idtype}=req.body;
           this.modelObjetc.save({name,descripcion,idtype},_resp)

   }
    updateAccion(_req:Request,_resp:Response){
       const {id,name,descripcion,idtype}=_req.body;
       this.modelObjetc.update({id,name,descripcion,idtype},_resp);
   }
   deleteAccion(_req:Request,_resp:Response){
       const {id}= _req.body;
       this.modelObjetc.delete(id,_resp);
   }

}