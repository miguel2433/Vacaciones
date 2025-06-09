import { Rol } from "../model/Rol.js"

export default class RolController {
  getAll = async (req, res) => {
    try {
      const roles = await Rol.find()
      const respuesta = roles.map(rol => ({
        idRol: rol.idRol,   // id autoincremental del plugin
        rol: rol.rol
      }))
      return res.status(200).json(respuesta)
    } catch (error) {
      return res.status(400).send(error.message || error)
    }
  }

  getById = async (req, res) => {
    const id = req.params.id
    try {
      const rol = await Rol.findOne({ idRol: id }) // buscar por idRol (numérico)
      if (!rol) {
        return res.status(404).send("Rol no encontrado")
      }
      return res.status(200).json({
        idRol: rol.idRol,
        rol: rol.rol
      })
    } catch (error) {
      return res.status(400).send(error.message || error)
    }
  }

  Post = async (req, res) => {
    const datos = req.body
    try {
      const newRol = new Rol(datos)
      const savedRol = await newRol.save()
      return res.status(201).json({
        idRol: savedRol.idRol,
        rol: savedRol.rol
      })
    } catch (error) {
      return res.status(400).send(error.message || error)
    }
  }

  Update = async (req, res) => {
    const id = req.params.id
    const datos = req.body
    try {
      const rol = await Rol.findOne({ idRol: id })
      if (!rol) {
        return res.status(404).send("Rol no encontrado")
      }
      for (let campo in datos) {
        if (datos[campo] !== undefined && datos[campo] !== null) {
          rol[campo] = datos[campo]
        }
      }
      const updatedRol = await rol.save()
      return res.status(200).json({
        idRol: updatedRol.idRol,
        rol: updatedRol.rol
      })
    } catch (error) {
      return res.status(400).send(error.message || error)
    }
  }

  Delete = async (req, res) => {
    const id = req.params.id
    try {
      const rol = await Rol.findOneAndDelete({ idRol:id })
      if (!rol) {
        return res.status(404).send("Rol no encontrado")
      }
      return res.status(200).json({
        idRol: rol.idRol,
        rol: rol.rol,
        message: "Rol eliminado correctamente"
      })
    } catch (error) {
      return res.status(400).send(error.message || error)
    }
  }
}
