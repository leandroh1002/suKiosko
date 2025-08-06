const { Empleado } = require("../../db.js");

const postLoginService = async (username, password) => {
    const user = await Empleado.findOne({ where: { usuario: username } });

    if (!user) {
        throw new Error("Usuario no encontrado");
    }

    if (user.contraseña !== password) {
        throw new Error("Contraseña incorrecta");
    }

    return { id: user.id, username: user.usuario };
};

module.exports = postLoginService;
