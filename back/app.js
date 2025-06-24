import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from "cookie-parser";
import {CreateSolicitudRouter} from "./router/Solicitud.js"
import {CreateDepartamentoRouter} from "./router/Departamento.js"
import {CreateRolRouter} from "./router/Rol.js"
import { CreateUsuarioRouter } from './router/Usuario.js';

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(express.json())

app.use(cookieParser())

app.use(express.urlencoded({}))

const SECRET_KEY = process.env.SECRET_KEY
app.use((req,res,next) => {
    const token = req.cookies.access_token
    let data = null

    req.session = {user : null}
    try{
        data = jwt.verify(token, SECRET_KEY)
        req.session.user = data
    }
    catch(error){
        req.session.user = null
    }

    next()
})
let PORT = process.env.PORT || 5050

await mongoose.connect(process.env.DB)
.then(() => console.log("🟢 Conectado a MongoDB"))
.catch((error) => console.error("🔴 Error de conexión:", error));

app.get('/', (req, res) => res.send("🟢 Servidor corriendo en http://localhost:" + PORT))

app.use('/api/solicitud', CreateSolicitudRouter())
app.use('/api/departamento', CreateDepartamentoRouter())
app.use('/api/rol', CreateRolRouter())
app.use('/api/usuario', CreateUsuarioRouter())

app.listen(PORT, () =>{
    console.log("🟢 Servidor corriendo en http://localhost:" + PORT)
})