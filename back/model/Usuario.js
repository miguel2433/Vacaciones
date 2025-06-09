import mongoose from "mongoose";

const { Schema } = mongoose;

const UsuarioSchema = new Schema({
  id: String,
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  correo: { type: String, required: true },
  contrasena: { type: String, required: true },
  celular: { type: String, required: true },
  departamento: {
    type: Schema.Types.ObjectId, 
    ref: "departamento",
    required: true
  },
  rol: {
    type: Schema.Types.ObjectId, 
    ref: "rol",
    required: true
  }
});

UsuarioSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.contrasena; // eliminar la contraseña del JSON
  }
});

export const Usuario = mongoose.model("usuario", UsuarioSchema);
