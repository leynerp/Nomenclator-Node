export type denTipo='Simple' | 'Complejo'

export interface NomenclatorList {
    id:number
    name:string
    descripcion:string
    idtype:number
    type:denTipo
}
export interface Menssage {
    cod:number
    mensaje:string
}
export interface TotalRecord {
    count:number
}

//export type ListNomencladorSinDescrip=Pick<ListNomenclador, 'id'| 'denominacion' | 'idtipo' | 'tipo'>

export type NewListNomenclator=Omit<NomenclatorList, 'id'| 'type'>
export type UpdListNomenclator=Omit<NomenclatorList, 'type'>


export interface Nomenclator extends NomenclatorList{
    initdate:string,
    enddate:string,
    status:boolean
}

/*Con type
*export type NomnecladorX=ListNomenclador & {
    fechaini:string,
    fechafin:string,
    activo:boolean
}
*
* */

export interface NomencladorComplejo extends ListNomenclador{
    idpadre:number
}
