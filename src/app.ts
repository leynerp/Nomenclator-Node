import express,{Application} from "express"
import morgan from "morgan"
import routers from "./routes/baseroute";
import cors from "cors"
import bodyparser from "body-parser"
import dispachError from "../utils/middlewar-error";
export  class App{
    private app:Application
    constructor(private port?:number |string) {
        this.app=express()
        this.setting()
        this.middlewares()
        this.route()
        this.errorMiddleware()
    }
    setting(){
        this.app.set('port',this.port || process.env.PORT || 3000)
    }
    middlewares(){
       this.app.use(morgan('dev'))
               .use(cors())
               .use(bodyparser.json())
               .use(bodyparser.urlencoded({extended:true}))

    }
    route(){
        this.app.use(routers)
    }
    errorMiddleware(){
        this.app.use(dispachError)
    }
    async listen(){
        await this.app.listen(this.app.get('port'))
        console.log("Server in port>"+this.app.get('port'))
    }

}