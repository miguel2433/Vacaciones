import SolicitudController from "../controller/SolicitudController.js"
import { Router } from 'express'

export const CreateSolicitudRouter = () =>{
    const router = Router()
    const solicitudController = new SolicitudController()

    router.post("/", solicitudController.PostSolicitud)
    router.get("/", solicitudController.getAll)
    router.get("/:id", solicitudController.getById)
    router.put("/:id", solicitudController.update)
    router.delete("/:id", solicitudController.delete)
    return router
}