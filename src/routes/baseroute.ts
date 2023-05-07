import express from "express";
let routers=express.Router()
import {NomencladoresController} from "../controllers/nomencladoresController";
import {ErrorHandler} from "../../utils/ErrorHandler";

routers.route('/nomencladores')
    .get((req,resp,_next)=>{
        let objectController=new NomencladoresController()
        objectController.getAll(req,resp)
    })
    .post((req,_resp,_next)=>{
        try {
            let objectController=new NomencladoresController()
            objectController.insertAccion(req,_resp)
        } catch (error) {
            throw new ErrorHandler('Error insertando datos', 500, 'Revise la configuracion de los parametros');
        }
    })
    .put((req,_resp,_next)=>{
        try {
            let objectController=new NomencladoresController()
            objectController.updateAccion(req,_resp)
        } catch (error) {
            throw new ErrorHandler('Error actualizando los datos', 500, 'Revise la configuracion de los parametros');
        }
    })
    .delete((req,_resp,_next)=>{
        try {
            let objectController=new NomencladoresController()
            objectController.deleteAccion(req,_resp)
        } catch (error) {
            throw new ErrorHandler('Error eliminano los datos', 500, 'Revise la configuracion de los parametros');
        }
    })
routers.route('/pepe').get((_req,_resp,_next)=>{
    _resp.json({mesaje:"este es pepe"});
})
export default routers

