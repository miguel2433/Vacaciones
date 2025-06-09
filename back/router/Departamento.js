import DepartamentoController from "../controller/DepartamentoController.js"
import { Router } from 'express'

export const CreateDepartamentoRouter = () =>{
    const router = Router()
    const departamentoController = new DepartamentoController()

    router.post("/", departamentoController.Post)
    router.get("/", departamentoController.getAll)
    router.get("/:id", departamentoController.getById)
    router.put("/:id", departamentoController.update)
    router.delete("/:id", departamentoController.delete)
    return router
}