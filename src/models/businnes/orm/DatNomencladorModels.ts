import {BaseDatNomenclator} from "../../domain/Base/BaseDatNomenclator";
import {Response} from "express";
import {UpdListNomenclator,NewListNomenclator} from "../../../../utils/type";
import menssage from "../../../../config/message.json";
import conf from "../../../../config/settings.json"
export class DatNomencladorModels {
    labels:any={}
    constructor() {
        let lengConfig=conf.lenguage;
        let arrayMessage:any=Object.entries(menssage)
            .filter((value)=>{return value.includes(lengConfig)})[0][1]
        for (let key in arrayMessage){
            Object.assign(this.labels , {[key]: arrayMessage[key]})
        }
    }
    getall(_start:number,_limit:number,_resp:Response) {
        (async () => {
            const nomenclator= await BaseDatNomenclator.findAll( {
                offset: _start, limit: _limit,
                attributes: [ ['id_nomenclators', 'id'],'name','idtype',["(case idtype when 1 then 'Simple' else 'Complex' END)",'type']]
            });
            const count= await BaseDatNomenclator.count();
            const respo={
                data:nomenclator,
                total_count:count
            }
            _resp.status(200).json(respo);
        })();
    }

    save(NewListNomenclador:NewListNomenclator,_resp:Response){
        (async () => {
            const {name,descripcion,idtype}=NewListNomenclador;
            await BaseDatNomenclator.create({name,descripcion,idtype}).then(()=>{
                _resp.status(200).json({message:this.labels.addNomenclator});
            }).catch( ()=> {
                _resp.status(500).json({message:this.labels.error});
            });
        })();

    }
    update(updListNomenclator:UpdListNomenclator,_resp:Response){
        (async () => {
            const {name,descripcion,idtype}=updListNomenclator;
            await BaseDatNomenclator.update({ name,descripcion,idtype}, {
                where: {
                    id_nomenclators:updListNomenclator.id
                }
            }).then(()=>{
                _resp.status(200).json({message:this.labels.updateNomenclator});
            }).catch( ()=> {
                _resp.status(500).json({message:this.labels.error});
            });
        })();


    }
    delete(idnomenclator:string,_resp:Response) {
        (async () => {
            await BaseDatNomenclator.destroy( {
                where: {
                    id_nomenclators:idnomenclator.split(',')
                }
            }).then(()=>{
                _resp.status(200).json({message:this.labels.deleteNomenclator});
            }).catch( ()=> {
                _resp.status(500).json({message:this.labels.error});
            });
        })();
    }
}
