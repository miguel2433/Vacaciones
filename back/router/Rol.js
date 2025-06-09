import RolController from "../controller/RolController.js"
import { Router } from 'express'

export const CreateRolRouter = () =>{
    const router = Router()
    const rolController = new RolController()

    router.post("/", rolController.Post)
    router.get("/", rolController.getAll)
    router.get("/:id", rolController.getById)
    router.put("/:id", rolController.Update)
    router.delete("/:id", rolController.Delete)
    return router
}