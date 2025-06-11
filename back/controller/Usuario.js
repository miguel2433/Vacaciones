import {Usuario} from "../model/Usuario.js"
import{Departamento} from "../model/Departamento.js"
import { Rol } from "../model/Rol.js";

import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY

export default class UsuarioController{
    getAll = async(req,res) =>{
        try {
            const usuarios = await Usuario.find().populate("departamento rol")
            if(usuarios.length === 0){
                return res.status(404).send("No hay usuarios")
            }
            return res.status(200).json(usuarios)
        } catch (error) {
            return res.status(400).send(error.message || error)
        }
    }
    getById = async(req,res) =>{
        const id = req.params.id
        try {
            const usuario = await Usuario.findById(id).populate("departamento rol")

            if(!usuario){
                return res.status(404).send("Usuario no encontrado")
            }
            return res.status(200).json(usuario)
        } catch (error) {
            return res.status(400).send(error.message || error)
        }
    }
  register = async (req, res) => {
    const datos = req.body;

    try {
      // Verificar existencia del departamento
      const departamentoExiste = await Departamento.findOne({idDepartamento: datos.departamento});
      if (!departamentoExiste) {
        return res.status(404).send("Departamento no encontrado");
      }

      // Verificar existencia del rol
      const rolExiste = await Rol.findOne({idRol: datos.rol});
      if (!rolExiste) {
        return res.status(404).send("Rol no encontrado");
      }
      // Verificar si ya existe un usuario con ese correo
      const usuarioExistente = await Usuario.findOne({ correo: datos.correo });
      if (usuarioExistente) {
        return res.status(409).send("El correo ya está registrado");
      }

      // Encriptar la contraseña antes de guardar
      const hashedPassword = await bcrypt.hash(datos.contrasena, 10);

     const nuevoUsuario = new Usuario({
        nombre: datos.nombre,
        apellido: datos.apellido,
        correo: datos.correo,
        contrasena: hashedPassword,
        celular: datos.celular,
        departamento: departamentoExiste._id,
        rol: rolExiste._id
      });

      const usuarioGuardado = await nuevoUsuario.save();

       // Opcional: devolver el usuario con populate (si querés mostrarlo completo)
      const usuarioCompleto = await Usuario.findById(usuarioGuardado._id)
        .populate("departamento")
        .populate("rol");

      return res.status(201).json(usuarioCompleto);
    } catch (error) {
      return res.status(400).send(error.message || error);
    }
  };


    login = async (req, res) => {
        try {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Request body is required" });
        }

        const { correo, contrasena } = req.body;

        if (!correo || !contrasena) {
            return res.status(400).json({ error: "Correo y contraseña son requeridos" });
        }

        // Buscar usuario por correo
        const user = await Usuario.findOne({ correo }).populate("departamento rol");

        if (!user) {
            return res.status(401).json({ error: "Correo o contraseña incorrectos" });
        }

        // Comparar contrasena con bcrypt
        const isMatch = await bcrypt.compare(contrasena, user.contrasena);
        if (!isMatch) {
            return res.status(401).json({ error: "Correo o contraseña incorrectos" });
        }

        // Crear token JWT
        const token = jwt.sign(
            { id: user.id, correo: user.correo, nombre: user.nombre, rol: user.rol,departamento: user.departamento },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        // Responder con cookie y datos
        return res
            .cookie("access_token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60, 
            })
            .status(200)
            .header("Authorization", `Bearer ${token}`)
            .json({
                message: "Login exitoso",
                usuario: user,
                token: token
            });
        } catch (error) {
        console.error("Error en login:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
        }
    };
    delete = async(req,res) =>{
        const id = req.params.id
        try {
            const usuario = await Usuario.findByIdAndDelete(id)
            if(!usuario){
                return res.status(404).send("Usuario no encontrado")
            }
            return res.status(200).send("Usuario eliminado")
        } catch (error) {
            return res.status(400).send(error.message || error)
        }
    }
    logout = async(req,res) =>{
        return res.clearCookie("access_token").json({message:"Logout exitoso"});
    }
}
