import { Solicitud } from "../model/Solicitud.js"
import { Usuario } from "../model/Usuario.js"

export default class SolicitudController {
    PostSolicitud = async (req, res) => {
        const datos = req.body

        try {
            const usuarioExiste = await Usuario.findById(datos.usuario)
            if (!usuarioExiste) {
                return res.status(404).send("Usuario no encontrado")
            }

            const newSolicitud = new Solicitud(datos)
            const savedSolicitud = await newSolicitud.save()
            return res.status(201).json(savedSolicitud)
        } catch (error) {
            return res.status(400).send(error.message || error)
        }
    }

    getAll = async (req, res) => {
        try {
            const solicitudes = await Solicitud.find().populate("usuario")

            if (!solicitudes || solicitudes.length === 0) {
                return res.status(404).send("No hay solicitudes")
            }

            return res.status(200).json(solicitudes)
        } catch (error) {
            return res.status(400).send(error)
        }
    }

    getById = async (req, res) => {
        const id = req.params.id
        try {
            const solicitud = await Solicitud.findById(id).populate("usuario")
            if (!solicitud) {
                return res.status(404).send("Solicitud no encontrada")
            }
            return res.status(200).json(solicitud)
        } catch (error) {
            return res.status(400).send(error)
        }
    }

    update = async (req, res) => {
        const id = req.params.id
        const nuevosDatos = req.body

        try {
            const solicitudExistente = await Solicitud.findById(id).populate("usuario")
            if (!solicitudExistente) {
                return res.status(404).send("Solicitud no encontrada")
            }

            for (let campo in nuevosDatos) {
                if (nuevosDatos[campo] !== undefined && nuevosDatos[campo] !== null) {
                    solicitudExistente[campo] = nuevosDatos[campo]
                }
            }

            const updatedSolicitud = await solicitudExistente.save()
            return res.status(200).json(updatedSolicitud)
        } catch (error) {
            return res.status(400).send(error)
        }
    }

    delete = async (req, res) => {
        const id = req.params.id
        try {
            const solicitudDeleted = await Solicitud.findByIdAndDelete(id).populate("usuario")
            if (!solicitudDeleted) {
                return res.status(404).send("Solicitud no encontrada")
            }
            return res.status(200).json({ solicitud: solicitudDeleted, message: "Solicitud eliminada" })
        } catch (error) {
            return res.status(400).send(error)
        }
    }
}
