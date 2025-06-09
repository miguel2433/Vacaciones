import mongoose from "mongoose";

const {Schema} = mongoose

const SolicitudSchema = new Schema({
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "usuario", // debe coincidir con el nombre del modelo de Usuario
    required: true
  },
  diasSolicitados: Number,
  fecha: { type: Date, default: Date.now },
  estado: {
    type: String,
    enum: ['pendiente', 'aprobado', 'rechazado'], // valores válidos
    default: 'pendiente' // opcional
  }
  
})
SolicitudSchema.set('toJSON', {
virtuals: true,
versionKey: false, // oculta __v
transform: function (doc, ret) {
  ret.id = ret._id
  delete ret._id
}
})

export const Solicitud = mongoose.model("solicitud", SolicitudSchema)
