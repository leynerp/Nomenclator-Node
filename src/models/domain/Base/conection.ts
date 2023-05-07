import * as mysql from "mysql";
import conf from "../../../../config/settings.json"
interface conection {
    host: string;
    port: number;
    user:string;
    pasword:string;
    database:string;
    makeConnection(): void;
    executeSelect(sql:string):void;
    executeSelec2(sql:string):void;
}
export class mysqlConection implements  conection{
    host: string;
    port: number;
    user:string;
    pasword:string;
    database:string
    connection:any;
    constructor() {
        this.host = conf.mysql.host;
        this.port = Number(conf.mysql.port) ;
        this.user = conf.mysql.user;
        this.pasword=conf.mysql.psw;
        this.database=conf.mysql.dbname;
        this.makeConnection()
    }
    makeConnection(){
        this.connection = mysql.createConnection({
            host     : this.host,
            user     : this.user,
            port     : this.port,
            password  : this.pasword,
            database : this.database
        });
        this.connection.connect((err:Error)=> {
            if (err) {
                console.error('error connecting: ' + err.stack);
                return;
            }

        });

    };
      executeSelect(sql:string){
        const promise = new Promise((resolve, _reject) => {
            this.connection.query(sql,(_error:any,result:any,_fields:any)=>{
                  if(_error)
                      _reject(_error)
                  else
                   resolve(result)
            });
        });
        promise.then((res) => {
            return res;
        });
        promise.catch((error) => {
            return error;
        });

        return  promise;
    };
   async executeSelec2(sql:string){
       try {
           return await this.connection.query(sql);
       } catch (error) {
       }

    };
}
