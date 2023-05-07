import { Sequelize } from 'sequelize'
import conf from "../../../../config/settings.json"
export  class sequelizeConnection{
    objctsequelizeConnection:Sequelize;
    constructor() {
        const {user,psw,port,host,dbname} = conf.mysql;
        this.objctsequelizeConnection=new Sequelize(dbname, user, psw, {
            host: host,
            port:Number(port),
            dialect: 'mariadb'
        })

        const aut= this.objctsequelizeConnection.authenticate().catch( e => { console.error(e) });
        aut.then(() => {
            console.log('Connection has been established successfully.');
        });

    }
    getSequelize(){
        return this.objctsequelizeConnection;
    }
}

