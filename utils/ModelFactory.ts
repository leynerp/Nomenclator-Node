import conf from "../config/settings.json"
import {Nomenclador} from "../src/models/businnes/native/Nomenclador";
import {DatNomencladorModels} from "../src/models/businnes/orm/DatNomencladorModels";

export class FactoryModel {
    constructor() {
    }
    public  getObjectModel():Nomenclador  | DatNomencladorModels{
        return (conf.useOrm) ? new DatNomencladorModels(): new Nomenclador() ;
        return  new Nomenclador() ;
    }
}