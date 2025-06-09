import { Departamento } from "../model/Departamento.js"

export default class DepartamentoController {
  getAll = async (req, res) => {
    try {
      const departamentos = await Departamento.find()
      if (!departamentos || departamentos.length === 0) {
        return res.status(404).send("No hay departamentos")
      }
      // Mapear para devolver solo idDepartamento, departamento y seccion
      const respuesta = departamentos.map(dep => ({
        idDepartamento: dep.idDepartamento,
        departamento: dep.departamento,
        seccion: dep.seccion
      }))
      return res.status(200).json(respuesta)
    } catch (error) {
      return res.status(400).send(error.message || error)
    }
  }

  Post = async (req, res) => {
    const datos = req.body
    try {
      const newDepartamento = new Departamento(datos)
      const savedDepartamento = await newDepartamento.save()
      // Retornar solo los campos deseados
      return res.status(201).json({
        idDepartamento: savedDepartamento.idDepartamento,
        departamento: savedDepartamento.departamento,
        seccion: savedDepartamento.seccion
      })
    } catch (error) {
      return res.status(400).send(error.message || error)
    }
  }

  getById = async (req, res) => {
    const id = Number(req.params.id)
    try {
      const departamento = await Departamento.findOne({ idDepartamento: id })
      if (!departamento) {
        return res.status(404).send("Departamento no encontrado")
      }
      return res.status(200).json({
        idDepartamento: departamento.idDepartamento,
        departamento: departamento.departamento,
        seccion: departamento.seccion
      })
    } catch (error) {
      return res.status(400).send(error.message || error)
    }
  }

  update = async (req, res) => {
    const id = Number(req.params.id)
    const nuevosDatos = req.body
    try {
      const departamento = await Departamento.findOne({ idDepartamento: id })
      if (!departamento) {
        return res.status(404).send("Departamento no encontrado")
      }
      for (let campo in nuevosDatos) {
        if (nuevosDatos[campo] !== undefined && nuevosDatos[campo] !== null) {
          departamento[campo] = nuevosDatos[campo]
        }
      }
      const actualizado = await departamento.save()
      return res.status(200).json({
        idDepartamento: actualizado.idDepartamento,
        departamento: actualizado.departamento,
        seccion: actualizado.seccion
      })
    } catch (error) {
      return res.status(400).send(error.message || error)
    }
  }

  delete = async (req, res) => {
    const id = Number(req.params.id)
    try {
      const eliminado = await Departamento.findOneAndDelete( {idDepartamento: id} )
      if (!eliminado) {
        return res.status(404).send("Departamento no encontrado")
      }
      return res.status(200).send("Departamento eliminado")
    } catch (error) {
      return res.status(400).send(error.message || error)
    }
  }
}
