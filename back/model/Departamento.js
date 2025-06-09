import mongoose from "mongoose";
import AutoIncrementFactory from 'mongoose-sequence';

const { Schema } = mongoose;
const AutoIncrement = AutoIncrementFactory(mongoose.connection);

const DepartamentoSchema = new Schema({
  departamento: { type: String, required: true },
  seccion: {
    type: String,
    required: true,
    enum: ["A", "B", "C"],
    default: "A"
  }
});

// Plugin para el campo numérico autoincremental
DepartamentoSchema.plugin(AutoIncrement, { inc_field: 'idDepartamento' });

DepartamentoSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;  // oculta _id de MongoDB
  }
});

export const Departamento = mongoose.model("departamento", DepartamentoSchema);
