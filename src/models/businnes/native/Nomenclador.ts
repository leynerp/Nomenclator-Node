import {mysqlConection} from "../../domain/Base/conection";
import {UpdListNomenclator,NomenclatorList, NewListNomenclator} from "../../../../utils/type";
import {Response} from "express";
import {OkPacket} from "mysql";
import menssage from "../../../../config/message.json";
import conf from "../../../../config/settings.json"
export class Nomenclador {
    con:mysqlConection
    labels:any={};
    constructor() {
        this.con=new mysqlConection()
        let lengConfig=conf.lenguage;
        let arrayMessage:any=Object.entries(menssage)
            .filter((value)=>{return value.includes(lengConfig)})[0][1]
        for (let key in arrayMessage){
            Object.assign(this.labels , {[key]: arrayMessage[key]})
        }
    }
     getall(start:number,limit:number,_resp:Response) {
        let data= this.con.executeSelect("" +
             "Select `id_nomenclators` as id, `name` as name,`descripcion`,`idtype` as  idtype,(case `idtype`"+
             "when 1 then 'Simple' else 'Complex' END) as 'type'  from dat_nomenclators limit" +
             ` ${start},${limit}`)
        let count=this.con.executeSelect("Select count(*) as count from dat_nomenclators");
        (async () => {
            let promise = await Promise.all([
                data,
                count,
            ]);
            const respo={
                data:(promise[0])? (promise[0] as NomenclatorList[]) : null,
                total_count:(promise[1])?  (promise[1] as any[]).map(function(obj){
                    return obj.count
                })[0] : 0
            }
            _resp.status(200).json(respo);
        })();
    }

     save(NewListNomenclador:NewListNomenclator,_resp:Response){
         const  sql:string=`Insert into dat_nomenclators (name,descripcion,idtype) 
         value('${NewListNomenclador.name}','${NewListNomenclador.descripcion}',${NewListNomenclador.idtype})`;
         this.con.executeSelect(sql).then(datos=>{
             let data=datos as OkPacket;
             (data.insertId) ?  _resp.status(200).json({message:this.labels.addNomenclator}): _resp.status(500).json({message:this.labels.error});

         }).catch(_err => {
             _resp.status(500).json({message:this.labels.error});
         });

     }
     update(updListNomenclador:UpdListNomenclator,_resp:Response){
         const  sql:string=`Update dat_nomenclators set name='${updListNomenclador.name}',
         descripcion='${updListNomenclador.descripcion}', idtype=${updListNomenclador.idtype}
          where id_nomenclators=${updListNomenclador.id}`;
         this.con.executeSelect(sql).then(datos=>{
             let data=datos as OkPacket;
             (data.affectedRows) ?  _resp.status(200).json({message:this.labels.updateNomenclator}): _resp.status(500).json({message:this.labels.error});

         }).catch(_err => {
             _resp.status(500).json({message:this.labels.error});
         });
     }
     delete(id:String,_resp:Response) {
         this.con.executeSelect(`Delete from dat_nomenclators where id_nomenclators in (${id})`).then(datos=>{
             let data=datos as OkPacket;
             (data.affectedRows) ?  _resp.status(200).json({message:this.labels.deleteNomenclator}): _resp.status(500).json({message:this.labels.error});

         }).catch(_err => {
             _resp.status(500).json({message:this.labels.error});
         });
     }
}
