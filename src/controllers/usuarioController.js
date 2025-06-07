const usuarioService = require('../services/usuarioService');

const registraUsuario = async (req, res) => {
    try {
        const usuario = await usuarioService.crearUsuario(req.body);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const obtenerUsuarios = async(req, res) => {
    try {
        const usuarios = await usuarioService.obtenerUsuarios();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const respuesta = await usuarioService.eliminarUsuario(id);
        res.json(respuesta);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const actualizado = await usuarioService.actualizarUsuario(id, req.body);
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const obetenerUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params; // Obtener el id de los parámetros
        const usuario = await usuarioService.obetenerUsuarioPorId(id); // Pasar el id al servicio
        res.json(usuario);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

// Ruta para el login de usuario
const loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validar que los campos no estén vacíos
        if (!email || !password) {
            return res.status(400).json({ error: 'Email y contraseña son requeridos' });
        }

        // Llamar al servicio de login
        const usuario = await usuarioService.loginUsuario({ email, password });

        // Responder con el usuario (sin contraseña)
        res.json(usuario);
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

module.exports = {
    registraUsuario,
    obtenerUsuarios,
    eliminarUsuario,
    actualizarUsuario,
    obetenerUsuarioPorId,
    loginUsuario,
};