import mongoose from "mongoose"
import AutoIncrementFactory from 'mongoose-sequence'

const { Schema } = mongoose
const AutoIncrement = AutoIncrementFactory(mongoose.connection)

const RolSchema = new Schema({
  rol: {
    type: String,
    enum: ["admin", "empleado", "supervisor", "RRHH"],
    default: "empleado",
    required: true
  }
})

// Campo autoincremental: id (tipo número)
RolSchema.plugin(AutoIncrement, { inc_field: 'idRol' })

// Configuración para ocultar _id y __v
RolSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id
  }
})

export const Rol = mongoose.model("rol", RolSchema)
