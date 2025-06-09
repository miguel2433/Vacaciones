import UsuarioController from "../controller/Usuario.js"
import { Router } from 'express'

export const CreateUsuarioRouter = () =>{
    const router = Router()
    const usuarioController = new UsuarioController()

    router.post("/login", usuarioController.login)
    router.post("/register", usuarioController.register)
    router.get("/", usuarioController.getAll)
    router.get("/:id", usuarioController.getById)
    router.delete("/:id", usuarioController.delete)
    router.post("/logout", usuarioController.logout)
    return router
}